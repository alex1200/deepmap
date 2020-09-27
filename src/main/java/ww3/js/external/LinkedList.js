(function(){
    
    window.LinkedList = function() {
        
        this.length = 0;
        this.head = null;
        this.tail = null;
        
    };
    
    var LinkedList = window.LinkedList;
    var nodeId = 0;    
    
    LinkedList.prototype._createNode = function(data) {
        
        var node = {
            data: data,
            prev: null,
            next: null,
            id: nodeId++
        };
        return node;
    };
    
    LinkedList.prototype.add = function(data) {
        
        var node = this._createNode(data);
        
        if (this.length === 0) {
            this.head = node;
            this.tail = node;
        }
        else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        
        this.length++;
        
        return node;
    };
    
    // inserts after the given node and returns node.data
    LinkedList.prototype.insertAfter = function(data, afterNode) {
        
        if (this.tail === afterNode) {
            return this.add(data);
        }
        else {
            var node = this._createNode(data),
                prevNode = afterNode,
                nextNode = afterNode.next;
            
            // forward links
            node.next = nextNode;
            prevNode.next = node;
    
            // backward links
            nextNode.prev = node;
            node.prev = prevNode;
            
            this.length++;
            
            return node;
        }
    };
    
    // removes the node
    LinkedList.prototype.remove = function(node) {
    
        if (node.next || node.prev) {
    
            if (this.length === 1 && this.head === node && this.tail === node) {
                this.head = null;
                this.tail = null;
            }
            else if (this.head === node) {
                this.head = this.head.next;
                this.head.prev = null;
            }
            else if (this.tail === node) {
                this.tail = node.prev;
                this.tail.next = null;
            }
            else {
                var prev = node.prev,
                    next = node.next;
                
                prev.next = next;
                next.prev = prev;
            }
            
            node.next = null;
            node.prev = null;
            
            this.length--;
            
        }
    };
    
    LinkedList.prototype.replace = function(node, data) {
        
        // add the new data after the node
        var newNode = this.insertAfter(data, node);
        
        // remove the old node
        this.remove(node);
        
        return newNode;
    };
    
    LinkedList.prototype.contains = function(node) {
        
        var next = this.head;
        while (next != null) {
            if (next === node) {
                return true;
            }
            next = next.next;
        }
        return false;
    };
    
    // convenience function for adding the contents of an array
    LinkedList.prototype.addArray = function(array) {
        for (var i = 0; i < array.length; i++) {
            this.add(array[i]);
        }
    };    
    
    LinkedList.prototype.each = function(callback) {
        
        // usage: mylist.each(function(node, data) { });
        
        this.eachDeep(callback, null);
        
    };
    
    LinkedList.prototype.eachDeep = function(callback, getChildrenCallback, startdepth) {
    
        // usage: mylist.eachDeep(function(node, data, depth) { }, function(node, data) { return data.children; } );
        
        if (getChildrenCallback === undefined) {
            getChildrenCallback = function(node, data) {
                return data.children;
            };
        }
        
        var next = this.head, 
            depth = startdepth || 0;
            
        while (next != null) {
            
            if (callback) {
                callback(next, next.data, depth);
            }
    
            if (getChildrenCallback) {
    
                var childList = getChildrenCallback(next, next.data);
                
                if (childList) {
                    childList.eachDeep(callback, getChildrenCallback, depth+1);
                }
            }
        
            next = next.next;
        }        
    };
    
    LinkedList.prototype.print = function() {
        this.each(function(node, data, i) {
            console.log(i + ': ' + node.id);
        });
    };

})();