function TextInstance(){
    this.source = new Array;
    this.text = "";
    // this.arrayLocations = new Array;
    // this.mapGeoparseInstances = new Array;
}

TextInstance.prototype.init = function(inSource){
    this.source = inSource;


    // this.loadLocations();
    // this.loadPlacenames();
};

TextInstance.prototype.update = function(source){
    this.source = source;
};