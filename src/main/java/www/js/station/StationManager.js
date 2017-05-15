function StationManager(){
    this.mapStationsInstances = new Array;
this.loaded = false;
    this.timeline = new Array;
}

StationManager.prototype.init = function(){
    var self = this;
    webService.getStations(function(jsonResults){
        if(jsonResults.status == "SUCCESS"){
            //console.log("success");
            var listSources = jsonResults.list;
            for(var i = 0; i < listSources.length; i++){
                var source = listSources[i];
                //console.log("list row "+i, source);
                if(null == self.mapStationsInstances[source[0]]){
                    //Add new instance of source
                    //console.log("uid is null ", source);
                    var instance = new StationInstance();
                    self.mapStationsInstances[source[0]] = instance;
                    instance.init(source);
                }
                else{
                    //Update instance of source
                    //console.log("update");
                    self.mapStationsInstances[source[0]].update(source);
                }
            }

            stationRender.loadList();
            self.loaded = true;
            //loadArcmap();
        }
    })
};

StationManager.prototype.getInstance = function(UID){
    var instance = this.mapStationsInstances[UID];
    if(null != instance && instance != undefined){
        return instance;
    }
};