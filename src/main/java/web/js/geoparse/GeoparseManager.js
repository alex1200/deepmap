function GeoparseManager(){
    this.mapGeoparseInstances = new Array;

}

GeoparseManager.prototype.init = function(){
    var self = this;
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

GeoparseManager.prototype.getInstance = function(UID){
    var instance = this.mapGeoparseInstances[UID];
    if(null != instance && instance != undefined){
        return instance;
    }
};