function TextMetaInstance(){
    this.source = new Array;
    this.arrayStations = new Array;
    // this.mapGeoparseInstances = new Array;
}

TextMetaInstance.prototype.init = function(inSource){
    this.source = inSource;
    // this.loadLocations();
    // this.loadPlacenames();
    var self = this;
    webService.getStationTextDetail(inSource[0],0,0, function(text){
        // console.log(text);
        if(text.status == "SUCCESS"){
            self.text = text.text;
        }
    });
};

TextMetaInstance.prototype.update = function(source){
    this.source = source;
};

TextMetaInstance.prototype.addStation = function(record){
    this.arrayStations.push(record)
}
