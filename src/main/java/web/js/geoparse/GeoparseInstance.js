function GeoparseInstance(){
    this.source = new Array;
    this.arrayPlaces = new Array;
    this.mapGeoparseInstances = new Array;
}

GeoparseInstance.prototype.init = function(inSource){
    this.source = inSource;
    this.loadPlaces();
};

GeoparseInstance.prototype.update = function(source){
    this.source = source;
};

GeoparseInstance.prototype.loadPlaces = function(){
    var self = this;
    webService.getLiteraryLocations(self.source[0], self.source[1], function(results){
        if(results.status == "SUCCESS"){
            self.arrayPlaces = results.list;
        }
    });

};