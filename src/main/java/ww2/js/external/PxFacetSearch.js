(function(){
(function() {
    
    // polyfills from MDN

    if(!Array.isArray) {
        Array.isArray = function (val) {
            return val instanceof Array;
        };
    }

    if (typeof Object.create !== 'function') {
        (function () {
            var F = function () {};
            Object.create = function (o) {
                if (arguments.length > 1) { 
                  throw new Error('Second argument not supported');
                }
                if (o === null) { 
                  throw new Error('Cannot set a null [[Prototype]]');
                }
                if (typeof o !== 'object') { 
                  throw new TypeError('Argument must be an object');
                }
                F.prototype = o;
                return new F();
            };
        })();
    }

    if (!Function.prototype.bind) {
      Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
          // closest thing possible to the ECMAScript 5
          // internal IsCallable function
          throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1), 
            fToBind = this, 
            NoOp = function () {},
            fBound = function () {
                return fToBind.apply(
                    this instanceof NoOp && oThis ? this : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments))
                );
            };

        NoOp.prototype = this.prototype;
        fBound.prototype = new NoOp();

        return fBound;
      };
    }

    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (searchElement, fromIndex) {
          if ( this === undefined || this === null ) {
            throw new TypeError( '"this" is null or not defined' );
          }

          var length = this.length >>> 0; // Hack to convert object.length to a UInt32

          fromIndex = +fromIndex || 0;

          if (Math.abs(fromIndex) === Infinity) {
            fromIndex = 0;
          }

          if (fromIndex < 0) {
            fromIndex += length;
            if (fromIndex < 0) {
              fromIndex = 0;
            }
          }

          for (;fromIndex < length; fromIndex++) {
            if (this[fromIndex] === searchElement) {
              return fromIndex;
            }
          }

          return -1;
        };
      }


})();
var PxFacetSearch = window.PxFacetSearch = {};

PxFacetSearch.initArray = function(array, length, value) {
    for (var i = 0; i < length; i++) {
        array[i] = value;
    }
};

// return the EXCEPT set of two arrays
PxFacetSearch.except = function(a1, a2) {
    a1 = a1 || [];
    a2 = a2 || [];

    var results = [],
        i, len, val;
    for (i = 0, len = a1.length; i < len; i++) {
        val = a1[i];
        if (a2.indexOf(val) === -1) {
            results.push(val);
        }
    }

    return results;
};

// de-dup an array of values
PxFacetSearch.unique = function(values) {
    var results = [],
        i, len, val;

    for (i = 0, len = values.length; i < len; i++) {
        val = values[i];
        if (results.indexOf(val) === -1) {
            results.push(val);
        }
    }

    return results;
};
(function() {
    
    PxFacetSearch.ColumnType = {
        none: 'none',
        category: 'category',
        range: 'range'
    };

    // Columns store data for a single property. No indexing in basic column.

    function Column(name, values, columnType) {
        this.type = columnType || PxFacetSearch.ColumnType.none;
        this.name = name;
        this.values = values;
    }

    PxFacetSearch.Column = Column;

})();
(function() {
    
    // Filter keeps track of a single union query (a OR b) of values
    // for a single property.

    function Filter(name) {
        
        this.name = name;

        // bool array keeping track of local matches
        this.matches = [];
    }

    Filter.prototype.updateSelections = function(potentialAddIds, removeIds) {

        var addedIds = [],
            i, len, ids, id, wasMatch;

        // toggle new additions
        for (i = 0, len = potentialAddIds.length; i < len; i++) {
            id = potentialAddIds[i];

            // need to make sure it wasn't already a match
            wasMatch = this.matches[id];
            if (!wasMatch) {
                this.matches[id] = true;
                addedIds.push(id);
            }
        }

        // toggle removed items
        for (i = 0, len = removeIds.length; i < len; i++) {
            this.matches[removeIds[i]] = false;
        }

        return { addIds: addedIds, removeIds: removeIds };
    };  

    PxFacetSearch.Filter = Filter;


    // Filter tied to a single column
    function ColumnFilter(column) {

        this.column = column;
        PxFacetSearch.Filter.call(this, column.name);
    }

    ColumnFilter.prototype = Object.create(PxFacetSearch.Filter.prototype);
    ColumnFilter.prototype.constructor = ColumnFilter;

    PxFacetSearch.ColumnFilter = ColumnFilter;

})();
(function() {
    
    function MultivalueColumn(name, values, columnType) {
        PxFacetSearch.Column.call(this, name, values, columnType);
        
        // keep track of items with no value
        this.nullIds = [];

        // keep track of whether some items have multiple values
        this.isMultiValue = false;

        createValueIndexes.call(this);
    }

    MultivalueColumn.prototype = Object.create(PxFacetSearch.Column.prototype);
    MultivalueColumn.prototype.constructor = MultivalueColumn;

    function createValueIndexes() {

        var i, len, val;
        for (i = 0, len = this.values.length; i < len; i++) {
            val = this.values[i];
            if (val || val === 0 || val === false) {
                this.indexMultiValue(val, i);
            } else {
                this.nullIds.push(i);
            }
        }
    }

    MultivalueColumn.prototype.indexMultiValue = function(val, id) {
        if (Array.isArray(val)) {

            this.isMultiValue = true;

            // need to index each sub-value
            for (var i = 0, len = val.length; i < len; i++) {
                this.indexSingleValue(val[i], id);
            }

        } else {

            // val contains just a single category
            this.indexSingleValue(val, id);
        }
    };

    PxFacetSearch.MultivalueColumn = MultivalueColumn;

})();
(function() {
    
    // Intersection query across columns

    function Query(table) {
        
        this.table = table;

        this.totalCount = table.itemCount;
        this.matchCount = this.totalCount;

        // keep track of how many filters block each item
        this.blockCounts = [];
        PxFacetSearch.initArray(this.blockCounts, this.totalCount, 0);

        // cache matching ids
        this.matchIds = [];
        updateMatchIds.call(this);

        // create filters for each category column
        this.filters = [];
        this.filtersByName = {};

        // auto-create filters for known column types
        var i, len, column;
        for (i = 0, len = this.table.columns.length; i < len; i++) {
            column = this.table.columns[i];
            
            switch (column.type) {
                case PxFacetSearch.ColumnType.category:
                    this.addFilter(new PxFacetSearch.CategoryFilter(column));
                    break;
                case PxFacetSearch.ColumnType.range:
                    this.addFilter(new PxFacetSearch.RangeFilter(column));
                    break;
            }
        }

        this.updateCallbacks = [];
    }

    // private method to update cached ids
    function updateMatchIds() {
        this.matchIds = [];

        var i, len;
        for (i = 0, len = this.blockCounts.length; i < len; i++) {
            if (this.blockCounts[i] === 0) {
                this.matchIds.push(i);
            }
        }
    }

    Query.prototype.addFilter = function(filter) {
        PxFacetSearch.initArray(filter.matches, this.table.itemCount, true);
        this.filters.push(filter);
        this.filtersByName[filter.name] = filter;
    };

    Query.prototype.getFilterMatches = function(name) {    
        return this.filtersByName[name].matches;
    };

    Query.prototype.onUpdate = function(callback) {
        this.updateCallbacks.push(callback);
    };

    Query.prototype.select = function(columnName, query) {

        var filter = this.filtersByName[columnName],
            changes = filter.select(query),
            isGlobalChange = false,
            id, i, len;
        
        // change block counts for added items
        for (i = changes.addIds.length; i--; ) {
            id = changes.addIds[i];
            if ((--this.blockCounts[id]) === 0) {
                this.matchCount++;
                isGlobalChange = true;
            }
        }

        // update block counts for removed items
        for (i = changes.removeIds.length; i--; ) {
            id = changes.removeIds[i];
            if ((++this.blockCounts[id]) === 1) {
                this.matchCount--;
                isGlobalChange = true;
            }
        }

        if (isGlobalChange) {
            updateMatchIds.call(this);

            for (i = 0, len = this.updateCallbacks.length; i < len; i++) {
                this.updateCallbacks[i](columnName);
            }
        }

    };  

    PxFacetSearch.Query = Query;

})();
(function() {

    // Sorter orders a list of matchids.
    function Sorter(table) {
        this.table = table;
    }

    Sorter.prototype.sortIds = function(ids) {

        // default sort uses natural order
        return ids;
    };

    PxFacetSearch.Sorter = Sorter;

})();
(function() {

    // stores columns for a collection of items
    function Table() {
        this.columns = [];
        this.columnsByName = {};

        this.itemCount = 0;
    }

    Table.prototype.addColumn = function(column) {
        this.columns.push(column);
        this.columnsByName[column.name] = column;
        this.itemCount = column.values.length;
    };

    Table.prototype.getColumn = function(columnName) {
        return this.columnsByName[columnName];
    };

    Table.prototype.getValue = function(columnName, id) {
        var column = this.columnsByName[columnName];
        return column ? column.values[id] : undefined;
    };
    
    PxFacetSearch.Table = Table;

})();
(function() {

    // manages selectors driving a query targeting a table    
    function View(table) {
        this.table = table;
        
        this.query = new PxFacetSearch.Query(table);
        this.sorter = new PxFacetSearch.Sorter(table);
        this.sortedMatchIds = this.sorter.sortIds(this.query.matchIds);

        // create selectors for all of the filters
        this.selectors = [];
        this.selectorsByName = {};

        var i, len, filter, selector;
        for (i = 0, len = this.query.filters.length; i < len; i++) {
            filter = this.query.filters[i];
            if (filter.column.type === PxFacetSearch.ColumnType.category) {
                selector = new PxFacetSearch.CategorySelector(filter.name, this.query);
                this.selectors.push(selector);
                this.selectorsByName[filter.name] = selector;
            }
        }

        // NOTE: we add our update callback after creating the selectors
        // (which also listen to query updates). That means we get called
        // after all the selctors have been updated
        this.query.onUpdate(onQueryUpdate.bind(this));
    }

    function onQueryUpdate(sourceName) {
        this.sortedMatchIds = this.sorter.sortIds(this.query.matchIds);
    }

    View.prototype.getSelector = function(columnName) {
        return this.selectorsByName[columnName];
    };

    PxFacetSearch.View = View;

})();
(function() {
    
    // Columns store data for a single property. CategoryColumn
    // stores categorical data.

    function CategoryColumn(name, values) {
 
        // index mapping category to ids
        this.categoryIds = {};

        var columnType = PxFacetSearch.ColumnType.category;
        PxFacetSearch.MultivalueColumn.call(this, name, values, columnType);
    }

    CategoryColumn.prototype = Object.create(PxFacetSearch.MultivalueColumn.prototype);
    CategoryColumn.prototype.constructor = CategoryColumn;

    CategoryColumn.prototype.indexSingleValue = function(val, id) {

        // ensure we have an array of ids for the value
        var category = this.categoryIds[val];
        if (!category) {
            category = this.categoryIds[val] = [];
        }

        category.push(id);
    };

    CategoryColumn.prototype.getPotentialValues = function() {
        var values = [], 
            key;
        for (key in this.categoryIds) {
            values.push(key);
        }
 
        if (this.nullIds.length > 0) {
            values.push(null);
        }
 
        return values;
    };

    CategoryColumn.prototype.getMatchIds = function(value) {

        if (value === null) {
            return this.nullIds;
        }
        
        var ids = this.categoryIds[value];
        return ids || [];
    };

    CategoryColumn.prototype.getMatchAnyIds = function(matchValues) {

        var matchIds = [],
            i, len, ids;

        for (i = 0, len = matchValues.length; i < len; i++) {
            ids = this.getMatchIds(matchValues[i]);
            matchIds = matchIds.concat(ids);
        }

        // for multivalue, we need to de-dup the results
        if (this.isMultiValue) {
            matchIds = PxFacetSearch.unique(matchIds);
        }

        return matchIds;
    };

    CategoryColumn.prototype.matchesAny = function(id, matchValues) {

        matchValues = matchValues || [];

        var val = this.values[id],
            i, len;

        // single values are simple contains checks
        if (!Array.isArray(val)) {
            return (matchValues.indexOf(val) >= 0);
        } 

        // for multivalue, we need to check each sub value
        for (i = 0, len = val.length; i < len; i++) {
            if (matchValues.indexOf(val[i]) >= 0) {
                return true;
            }
        }

        return false;
    };

    CategoryColumn.prototype.getRemoveIds = function(removeValues, matchValues) {

        var removeIds = [],
            i, len, ids;
        
        // get ids for items that no longer match
        for (i = 0, len = removeValues.length; i < len; i++) {
            ids = this.getMatchIds(removeValues[i]);
            removeIds = removeIds.concat(ids);
        }

        // for single-value columns no further checks needed
        if (!this.isMultiValue) {
            return removeIds;
        }

        // for mutli-value, first de-dup the ids
        removeIds = PxFacetSearch.unique(removeIds);

        // need to check that remove ids don't match ANY of the 
        // selected values (even if one of their values was removed)
        var noMatchIds = [],
            mvLength = matchValues.length,
            id, val, j;

        for (i = 0, len = removeIds.length; i < len; i++) {
            id = removeIds[i];
            if (!this.matchesAny(id, matchValues)) {
                noMatchIds.push(id);
            }
        }
        
        return noMatchIds;
    };

    PxFacetSearch.CategoryColumn = CategoryColumn;


})();
(function() {
    
    // CategoryFilter keeps track of a single union query (a OR b) of values
    // for a single property with categorical data.

    function CategoryFilter(column) {
        PxFacetSearch.ColumnFilter.call(this, column);

        // keep track of current selections
        this.selections = this.column.getPotentialValues();
    }

    CategoryFilter.prototype = Object.create(PxFacetSearch.ColumnFilter.prototype);
    CategoryFilter.prototype.constructor = CategoryFilter;

    CategoryFilter.prototype.select = function(values) {

        var removeValues = PxFacetSearch.except(this.selections, values),
            removeIds = this.column.getRemoveIds(removeValues, values),
            addValues = PxFacetSearch.except(values, this.selections),
            potentialAddIds = this.column.getMatchAnyIds(addValues);

        this.selections = values;
        return this.updateSelections(potentialAddIds, removeIds);
    };  

    PxFacetSearch.CategoryFilter = CategoryFilter;

})();
(function() {
    
    // Selectors provide data for Selection UI

    function CategorySelector(name, query) {
        this.name = name;
        this.dirty = true;

        this.query = query;
        this.query.onUpdate(onQueryUpdate.bind(this));

        // keep track of available choices
        this.choices = [];
        this.nullCount = 0;
        this.choiceSortCompare = this.compareChoicesByCount;

        // initialize choices
        var column = this.query.table.getColumn(this.name),
            potentialValues = column.getPotentialValues(),
            i, len, value;
        for (i = 0, len = potentialValues.length; i < len; i++) {
            value = potentialValues[i];
            if (value !== null) {
                this.choices.push({ 
                    value: value, 
                    count: 0, 
                    selected: true 
                });
            }
        }
    }

    function updateChoiceCounts() {
        
        var choicesByValue = {},
            column = this.query.table.getColumn(this.name),
            values = column.values,
            localMatches = this.query.getFilterMatches(this.name),
            blockCounts = this.query.blockCounts,
            i, j, globalBlocks, value, choice;

        var incrementChoiceCount = function(value) {
            if (choicesByValue[value]) {
                choicesByValue[value]++;
            } else {
                choicesByValue[value] = 1;
            }
        };

        this.nullCount = 0;

        // bucket all the choices for valid results
        for (i = values.length; i--; ) {

            globalBlocks = blockCounts[i];
            if (globalBlocks !== 0 &&
                ((globalBlocks === 1 && localMatches[i]) || globalBlocks > 1)) {
                // blocked by at least one other filter
                continue;
            }

            // count null values separately
            value = values[i];
            if (value === null) {
                this.nullCount++;
                continue;
            }

            // increment the bucket count
            if (Array.isArray(value)) {
                for (j = 0; j < value.length; j++) {
                    incrementChoiceCount(value[j]);
                }
            } else {
                incrementChoiceCount(value);
            }
        }

        // update choice counts
        for (i = this.choices.length; i--; ) {
            choice = this.choices[i];
            choice.count = choicesByValue[choice.value] || 0;
        }

        // sort choices (typically most common first)
        this.choices.sort(this.choiceSortCompare);

        this.dirty = false;
    }

    CategorySelector.prototype.compareChoicesByCount = function(a, b) {
        if (a.count > b.count) { return -1; }
        if (a.count < b.count) { return 1; }
        return 0;
    };

    CategorySelector.prototype.compareChoicesByValue = function(a, b) {
        if (a.value < b.value) { return -1; }
        if (a.value > b.value) { return 1; }
        return 0;
    };

    function onQueryUpdate(sourceName) {
        // UI selections don't change if user made a local selection
        if (this.name !== sourceName) {
            this.dirty = true;
        }
    }

    CategorySelector.prototype.getChoices = function() {

        if (this.dirty) {
            updateChoiceCounts.call(this);
        }

        return this.choices;
    };

    CategorySelector.prototype.getChoice = function(value) {

        var choices = this.getChoices(),
            i, len, choice;

        for (i = 0, len = choices.length; i < len; i++) {
            choice = choices[i];
            if (choice.value === value) {
                return choice;
            }
        }

        return null;
    };    

    CategorySelector.prototype.toggle = function(value, isSelected) {

        var i, len, choice;
        for (i = 0, len = this.choices.length; i < len; i++) {
            choice = this.choices[i];
            if (choice.value === value) {

                if (isSelected === true || isSelected === false) {
                    choice.selected = isSelected;
                } else {
                    choice.selected = !choice.selected;
                }

                break;
            }
        }

        setFilterSelections.call(this);
    };

    CategorySelector.prototype.select = function(values) {

        var i, len, choice;
        for (i = 0, len = this.choices.length; i < len; i++) {
            choice = this.choices[i];
            choice.selected = (values.indexOf(choice.value) !== -1);
        }

        setFilterSelections.call(this);
    };

    CategorySelector.prototype.reset = function(value) {

        var i, len;
        for (i = 0, len = this.choices.length; i < len; i++) {
            this.choices[i].selected = true;
        }

        setFilterSelections.call(this);
    };

    // private method to set filter selections based on current choices
    function setFilterSelections() {

        var selections = [],
            i, len, choice;
        for (i = 0, len = this.choices.length; i < len; i++) {
            choice = this.choices[i];
            if (choice.selected) {
                selections.push(choice.value);
            }
        }

        // add null if every other value is selected
        if (selections.length === this.choices.length) {
            selections.push(null);
        }

        this.query.select(this.name, selections);
    }


    PxFacetSearch.CategorySelector = CategorySelector;

})();
(function() {
    
    function CategorySelectorUI(selector) {
        this.selector = selector;
        this.choiceData = this.selector.getChoices();
        this.selectionCount = this.choiceData.length;
        this.renderChoices();
    }

    CategorySelectorUI.prototype.updateData = function() {
        this.choiceData = this.selector.getChoices();
        this.renderChoices();
    };

    CategorySelectorUI.prototype.toggleChoice = function(value) {

        if (this.selectionCount === this.choiceData.length) {
            // make a single selection
            this.selector.select([value]);
            this.selectionCount = 1;
        } else {

            var choice = this.selector.getChoice(value);
            if (choice) {
                if (this.selectionCount === 1 && choice.selected) {
                    // once everything has been de-selected, we revert
                    // back to selecting everything
                    this.selector.reset();
                    this.selectionCount = this.choiceData.length;
                } else {
                    // only toggle the single value
                    this.selector.toggle(value);
                    this.selectionCount += choice.selected ? -1 : 1;    
                }
            }
        }
    };
    
    CategorySelectorUI.prototype.clearSelections = function() {
        this.selector.reset();
        this.selectionCount = this.choiceData.length;
        this.renderChoices();
    };

    PxFacetSearch.CategorySelectorUI = CategorySelectorUI;

})();
(function() {

    function RangeColumn(name, values) {
        
        // values in sorted order (each item may have more that one value)
        this.sortedEntries = [];

        var columnType = PxFacetSearch.ColumnType.range;
        PxFacetSearch.MultivalueColumn.call(this, name, values, columnType);

        // after indices have been created, sort the values
        this.sortedEntries.sort(NumberEntry.sortByValue);
    }

    RangeColumn.prototype = Object.create(PxFacetSearch.MultivalueColumn.prototype);
    RangeColumn.prototype.constructor = RangeColumn;

    RangeColumn.prototype.indexSingleValue = function(val, id) {
        var entry = new NumberEntry(val, id);
        this.sortedEntries.push(entry);
    };

    RangeColumn.prototype.getValidRange = function() {

        var numEntries = this.sortedEntries.length;
        if (numEntries === 0) {
            return { min: Number.MIN_VALUE, max: Number.MAX_VALUE };
        }

        return {
            min: this.sortedEntries[0].value,
            max: this.sortedEntries[numEntries-1].value
        };
    };

    RangeColumn.prototype.idInRange = function(id, min, max) {

        var val = this.values[id],
            i, len;

        // single values are simple range checks
        if (!Array.isArray(val)) {
            return (val >= min && val <= max);
        } 

        // for multivalue, we need to check each sub value
        for (i = 0, len = val.length; i < len; i++) {
            if (val[i] >= min && val[i] <= max) {
                return true;
            }
        }

        return false;
    };

    RangeColumn.prototype.getRangeChanges = function(prevMin, prevMax, newMin, newMax) {
        var addIds = [],
            removeIds = [],
            i, len, entry, val;

        for (i = 0, len = this.sortedEntries.length; i < len; i++) {
            entry = this.sortedEntries[i];
            val = entry.value;

            if (val < newMin) {
                
                // remove if previously in range
                if (val >= prevMin && val <= prevMax) {
                    removeIds.push(entry.id);
                }

            } else if (val > newMax) {

                if (val > prevMax) {
                    // past all potential add and removes
                    break;  
                } else if (val >= prevMin) {
                    removeIds.push(entry.id);
                }

            } else {

                // add if wasn't previously in range
                if (val < prevMin || val > prevMax) {
                    addIds.push(entry.id);
                }

            }

        }

        
        if (this.isMultiValue) {

            // need to de-dup if there are multi-values
            addIds = PxFacetSearch.unique(addIds);
            removeIds = PxFacetSearch.unique(removeIds);

            // make sure remove values aren't in range for other value
            for (i = removeIds.length - 1; i >= 0; i--) {
                if (this.idInRange(removeIds[i], newMin, newMax)) {
                    removeIds.splice(i, 1);
                }
            }
        }
        
        return { addIds: addIds, removeIds: removeIds };

    };

    function NumberEntry(value, id) {
        this.value = value;
        this.id = id;
    }

    NumberEntry.sortByValue = function(a, b) {
        if (a.value < b.value) { return -1; }
        if (a.value === b.value) { return 0; }
        return 1;
    };

    PxFacetSearch.RangeColumn = RangeColumn;

})();
(function() {

    function RangeFilter(column) {

        PxFacetSearch.ColumnFilter.call(this, column);

        this.includeNulls = true;

        // NOTE: min and max are inclusive values
        var validRange = this.column.getValidRange();
        this.min = validRange.min;
        this.max = validRange.max;        
    }

    RangeFilter.prototype = Object.create(PxFacetSearch.ColumnFilter.prototype);
    RangeFilter.prototype.constructor = RangeFilter;

    RangeFilter.prototype.select = function(query) {

        var prevMin = this.min,
            prevMax = this.max,
            prevIncludeNulls = this.includeNulls;

        this.min = query.min;
        this.max = query.max;
        this.includeNulls = query.includeNulls;

        var changeInfo = this.column.getRangeChanges(
            prevMin, prevMax, this.min, this.max);

        // TODO: handle nulls
        
        return this.updateSelections(changeInfo.addIds, changeInfo.removeIds);
    };  

    PxFacetSearch.RangeFilter = RangeFilter;

})();
})();