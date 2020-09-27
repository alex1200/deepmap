function LiteraryInstance(){
    this.source = new Array;
    this.arrayLocations = new Array;
    this.mapGeoparseInstances = new Array;
}

LiteraryInstance.prototype.init = function(inSource){
    this.source = inSource;
    this.loadLocations();
    // this.loadPlacenames();
};

LiteraryInstance.prototype.update = function(source){
    this.source = source;
};

LiteraryInstance.prototype.loadLocations = function(){
    var self = this;
    webService.getLiteraryLocations(self.source[0], function(results){
        if(results.status == "SUCCESS"){
            self.arrayLocations = results.list;
            self.processLocations();
        }
    });

};

LiteraryInstance.prototype.loadPlacenames = function(){
    var self  = this;
    webService.getPlacenames(function(jsonResults){
        if(jsonResults.status == "SUCCESS"){
            //console.log("success");
            var listSources = jsonResults.list;
            for(var i = 0; i < listSources.length; i++){
                var source = listSources[i];
                //console.log("list row "+i, source);
                if(null == self.mapGeoparseInstances[source[0]]){
                    //Add new instance of source
                    //console.log("uid is null ", source);
                    var instance = new GeoparseInstance();
                    self.mapGeoparseInstances[source[0]] = instance;
                    instance.init(source);
                }
                else{
                    //Update instance of source
                    //console.log("update");
                    self.mapGeoparseInstances[source[0]].update(source);
                }
            }

            geoparseRender.loadList();
        }
    })
};

LiteraryInstance.prototype.processLocations = function(){
    console.log(this);
    for(var i = 0; i < this.arrayLocations.length; i++){
        var location = this.arrayLocations[i];
        if(null != location && location != undefined){
            if(null != location[4] && location[4] != 'null' && null != location[5] && location[5] != 'null'){
                var lat = location[4];
                var long = location[5];
                mapCommons.addMarkerToGroup(location[3],lat,long,location[0]);

                historicMapCommons.addMarkerToGroup(location[3],lat,long,location[0]);
            }
        }
    }
};

LiteraryInstance.prototype.changeTimeRange = function(ranges){
    var sourceMin = this.source[4];
    var sourceMax = this.source[5];

    var inRange = false;
    var rangeKey;
    for(var key in ranges){
        var range = ranges[key];
        if(range.min < parseInt(sourceMax) && range.max > parseInt(sourceMin)){
            inRange = true;
            rangeKey = key;
            break;
        }
    }
    if(inRange == true){
        console.log("showing marker group");
        mapCommons.showMarkerGroup(this.source[0],rangeKey);
        historicMapCommons.showMarkerGroup(this.source[0],rangeKey);
    }
    else{
        console.log("hiding marker group");
        mapCommons.hideMarkerGroup(this.source[0]);
        historicMapCommons.hideMarkerGroup(this.source[0]);

    }
};