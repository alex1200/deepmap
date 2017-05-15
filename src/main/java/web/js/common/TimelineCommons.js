var TIMELINE_START = 1600,
    TIMELINE_END = 2020,
    TIMELINE_STEP = 5,
    TIMELINE_ACTIVE_COLOR = '#1abc9c',
    TIMELINE_INACTIVE_COLOR = '#474C53',
    TIMELINE_BUCKETWIDTH = 2,
    TIMELINE_PADDING = 1,
    TIMELINE_LABELWIDTH = 100;

// percentage from neighboring bins used when smoothing
// out histogram. total must equal 1
var SMOOTH_MASK = [ 0.05, 0.10, 0.20, 0.3, 0.20, 0.10, 0.5 ];

function TimelineCommons() {

    this.$el = $('#timelineCanvasHost');
    this.$labels = $('#timelineLabels');
    this.bgCanvas = document.getElementById('timelineCanvas');
    this.bgCtx = this.bgCanvas.getContext('2d');
    this.buckets = [];
    this.dirty = true;

    this.currentMinRange1 = TIMELINE_START;
    this.currentMaxRange1 = TIMELINE_END-10;
    this.currentMinRange2 = TIMELINE_END-5;
    this.currentMaxRange2 = TIMELINE_END;

    $('#timeRangeSlider').colResizable({
        liveDrag:true,
        draggingClass:"rangeDrag",
        gripInnerHtml:"<div class='rangeGrip'></div>",
        onResize:function(e){
            console.log('resize of timeline');
            var columns = $(e.currentTarget).find("td");
            var ranges = [], total = 0, i, s = "Ranges: ", w;
            for(i = 0; i<columns.length; i++){
                w = columns.eq(i).width()-10 - (i==0?1:0);
                ranges.push(w);
                total+=w;
            }
            var cumalitiveRange = 0;
            for(i=0; i<columns.length; i++){
                ranges[i] = 100*ranges[i]/total;
                carriage = ranges[i]-w
                s+=" "+ Math.round(ranges[i]) + "%,";
                switch(i){
                    case 0:
                        TIMELINE_END - TIMELINE_START
                        timelineCommons.currentMinRange1 = (TIMELINE_END - TIMELINE_START)*(ranges[i]/100)+TIMELINE_START;
                        cumalitiveRange += (ranges[i]/100);
                        break;
                    case 1:
                        timelineCommons.currentMaxRange1 = (TIMELINE_END - TIMELINE_START)*((ranges[i]/100)+cumalitiveRange)+TIMELINE_START;
                        cumalitiveRange += (ranges[i]/100);
                        break;
                    case 2:
                        timelineCommons.currentMinRange2 = (TIMELINE_END - TIMELINE_START)*((ranges[i]/100)+cumalitiveRange)+TIMELINE_START;
                        cumalitiveRange += (ranges[i]/100);
                        break;
                    case 3:
                        timelineCommons.currentMaxRange2 = (TIMELINE_END - TIMELINE_START)*((ranges[i]/100)+cumalitiveRange)+TIMELINE_START;
                        cumalitiveRange += (ranges[i]/100);
                        break;
                }

            }
            s=s.slice(0,-1);
            console.log(s);
            timelineCommons.dirty = true;
            timelineCommons.redraw();

            literaryManager.changeTimeRange(timelineCommons.currentMinRange1,timelineCommons.currentMaxRange1,
                timelineCommons.currentMinRange2,timelineCommons.currentMaxRange2);
        },
        minWidth:8
    });

    // $('#timeRangeSlider').slider({
    //     range: true,
    //     min: TIMELINE_START,
    //     max: TIMELINE_END,
    //     step: TIMELINE_STEP,
    //     values: [ this.currentMin, this.currentMax, this.currentMin-200, this.currentMin-100],
    //
    //     slide: $.proxy(function( event, ui ) {
    //         this.currentMin = ui.values[0];
    //         this.currentMax = ui.values[1];
    //         this.dirty = true;
    //     }, this),
    //
    //     change: $.proxy(function( event, ui ) {
    //         literaryManager.changeTimeRange(this.currentMin,this.currentMax, 0);
    //         // app.view.query.select('timeRange', {
    //         //     min: this.currentMin,
    //         //     max: this.currentMax,
    //         //     includeNulls: true
    //         // });
    //
    //         //console.log('Time range min:' + this.currentMin + ' max:' + this.currentMax);
    //
    //     }, this)
    // });

    this.resize();
    var animate = $.proxy(function() {
        this.redraw();
        window.requestAnimationFrame(animate);
    }, this);
    animate();
}

TimelineCommons.prototype.resize = function() {
    if (!Modernizr.canvas) {
        return;
    }

    var width = this.$el.width(),
        numBuckets = Math.floor(width / (TIMELINE_BUCKETWIDTH + TIMELINE_PADDING));

    this.bucketize(numBuckets);
    this.smoothBuckets();
    this.maxHeight = this.$el.height();

    this.bgCanvas.width = this.buckets.length * (TIMELINE_BUCKETWIDTH + TIMELINE_PADDING);
    this.bgCanvas.height = this.maxHeight;

    this.drawLabels();
    this.dirty = true;
};

TimelineCommons.prototype.smoothBuckets = function() {

    var smoothBuckets = [],
        maskLength = SMOOTH_MASK.length,
        maskStartOffset = Math.floor(maskLength / 2),
        numBuckets = this.buckets.length,
        i, j, rawIndex, smoothValue;

    for (i = 0; i < numBuckets; i++) {

        // weight neighbors using mask to get smoothed value
        smoothValue = 0;
        for (j = 0; j < maskLength; j++) {

            rawIndex = Math.max(0, Math.min(numBuckets - 1, i - maskStartOffset + j));
            smoothValue += this.buckets[rawIndex] * SMOOTH_MASK[j];
        }
        smoothBuckets[i] = smoothValue;
    }

    this.buckets = smoothBuckets;
};


TimelineCommons.prototype.bucketize = function(numBuckets) {

    var trColumn = new Object({values:[["1790","2000"],["1980","1795"],["1870","1986"],["1750",
            "2005"],["1976","1798"],["1954","1924"],["1767","1873"],["1862","1812"],["1984","1988"],["1755",
            "2000"],["1980","1790"],["2000","1980"]]}),//app.table.getColumn('timeRange'),
        ranges = trColumn.values,
        buckets = [],
        bucketSize = (TIMELINE_END - TIMELINE_START) / numBuckets,
        i, len, range, start, end,
        bucketIndex, bucketEnd,
        rangeStart, rangeEnd;

    PxFacetSearch.initArray(buckets, numBuckets, 0);

    for (i = 0, len = ranges.length; i < len; i++) {

        // make sure we have a valid range
        range = ranges[i];
        if (!range || range.length !== 2) {
            continue;
        }

        // ignore empty ranges
        rangeStart = range[0];
        rangeEnd = range[1];
        if (rangeStart === 0 && rangeEnd === 0) {
            continue;
        }

        //console.log(range);

        // increment all the buckets that the range spans
        bucketIndex = Math.floor((rangeStart - TIMELINE_START) / bucketSize);
        for (; bucketIndex < numBuckets; bucketIndex++) {

            // see if we've passed the last bucket for this range
            if (rangeEnd < TIMELINE_START + ((bucketIndex + 1) * bucketSize)) {
                break;
            }

            buckets[bucketIndex]++;
        }
    }

    //console.log(buckets);

    this.buckets = buckets;
};

TimelineCommons.prototype.redraw = function() {
    console.log(this.dirty, Modernizr.canvas);
    if (!this.dirty || !Modernizr.canvas) {
        return;
    }

    var canvas = this.bgCanvas,
        ctx = this.bgCtx,
        maxBucket = 0,
        bucketSize = (TIMELINE_END - TIMELINE_START) / this.buckets.length,
        bucketStart, bucketEnd, color,
        i, len, x, y;

    // get max bucket size
    for (i = 0, len = this.buckets.length; i < len; i++) {
        maxBucket = Math.max(maxBucket, this.buckets[i]);
    }

    // clear context and initialize
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.lineWidth = TIMELINE_BUCKETWIDTH;
    ctx.strokeStyle = TIMELINE_ACTIVE_COLOR;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw buckets as lines
    ctx.beginPath();
    for (i = 0, len = this.buckets.length; i < len; i++) {

        // see whether bucket is in currently selected range
        bucketStart = TIMELINE_START + (i * bucketSize);
        console.log(this.currentMinRange1,this.currentMaxRange1, this.currentMinRange2, this.currentMaxRange2);
        if (bucketStart < this.currentMinRange1 || bucketStart > this.currentMaxRange1 && bucketStart < this.currentMinRange2 || bucketStart > this.currentMaxRange2) {
            color = TIMELINE_INACTIVE_COLOR;
        }
        else if (bucketStart > this.currentMinRange2 && bucketStart < this.currentMaxRange2) {
            color = DUAL_TIMELINE_ACTIVE_COLOR;
        }
        else {
            color = TIMELINE_ACTIVE_COLOR;
        }

        // see if we need to change colors
        if (ctx.strokeStyle !== color) {
            ctx.stroke();
            ctx.strokeStyle = color;
            ctx.beginPath();
        }

        x = i * (TIMELINE_BUCKETWIDTH + TIMELINE_PADDING);
        y = Math.round(this.maxHeight * (1 - this.buckets[i] / maxBucket));
        ctx.moveTo(x, this.maxHeight);
        ctx.lineTo(x, y);
    }
    ctx.stroke();

    this.dirty = false;
};

TimelineCommons.prototype.drawLabels = function() {

    // empty the labels container
    this.$labels.empty();

    var maxLabelCount = Math.floor(this.bgCanvas.width / TIMELINE_LABELWIDTH),
        labelRange = TIMELINE_END - TIMELINE_START,
        labelInterval = labelRange;

    // try various year increments until we find one that fits
    if (Math.floor(labelRange / 5) < maxLabelCount) {
        labelInterval = 5;
    }
    else if (Math.floor(labelRange / 10) < maxLabelCount) {
        labelInterval = 10;
    }
    else if (Math.floor(labelRange / 25) < maxLabelCount) {
        labelInterval = 25;
    }
    else if (Math.floor(labelRange / 50) < maxLabelCount) {
        labelInterval = 50;
    }
    else if (Math.floor(labelRange / 100) < maxLabelCount) {
        labelInterval = 100;
    }
    else if (Math.floor(labelRange / 200) < maxLabelCount) {
        labelInterval = 200;
    }
    else if (Math.floor(labelRange / 250) < maxLabelCount) {
        labelInterval = 250;
    }
    else if (Math.floor(labelRange / 500) < maxLabelCount) {
        labelInterval = 500;
    }
    else if (Math.floor(labelRange / 1000) < maxLabelCount) {
        labelInterval = 1000;
    }
    else if (Math.floor(labelRange / 2000) < maxLabelCount) {
        labelInterval = 2000;
    }
    else if (Math.floor(labelRange / 3000) < maxLabelCount) {
        labelInterval = 3000;
    }

    // generate and add labels to the timeline

    var nextLabel = TIMELINE_START - (TIMELINE_START % labelInterval),
        year = '',
        percent = 0;

    while (nextLabel < (TIMELINE_END - labelInterval)) {

        year = nextLabel < 0 ? 'BCE' : 'CE';
        percent = 100 * (1 + ((nextLabel - TIMELINE_END) / labelRange));

        $('<div class="timelineLabel" style="left: ' + percent + '%;"/>')
            .append($('<div class="timelineText"/>').text(Math.abs(nextLabel) + ' ' + year))
            .appendTo(this.$labels);

        nextLabel += labelInterval;
    }
};
