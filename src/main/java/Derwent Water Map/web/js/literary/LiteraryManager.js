function LiteraryManager(){
    this.mapLiteraryInstances = new Array;

    this.timeline = new Array;
}

LiteraryManager.prototype.init = function(){
    var self = this;
    webService.getLiterarySources(function(jsonResults){
        if(jsonResults.status == "SUCCESS"){
            //console.log("success");
            var listSources = jsonResults.list;
            for(var i = 0; i < listSources.length; i++){
                var source = listSources[i];
                //console.log("list row "+i, source);
                if(null == self.mapLiteraryInstances[source[0]]){
                    //Add new instance of source
                    //console.log("uid is null ", source);
                    var instance = new LiteraryInstance();
                    self.mapLiteraryInstances[source[0]] = instance;
                    instance.init(source);
                }
                else{
                    //Update instance of source
                    //console.log("update");
                    self.mapLiteraryInstances[source[0]].update(source);
                }
            }

            literaryRender.loadList();
        }
    })
};

LiteraryManager.prototype.getInstance = function(UID){
    var instance = this.mapLiteraryInstances[UID];
    if(null != instance && instance != undefined){
        return instance;
    }
};

LiteraryManager.prototype.changeTimeRange = function(min1, max1,min2, max2){
    // if(null == this.timeline[0]){
        this.timeline[0] = new Array;
        this.timeline[1] = new Array;
    // }
    this.timeline[0].min = min1;
    this.timeline[0].max = max1;

    this.timeline[1].min = min2;
    this.timeline[1].max = max2;

    for(var key in this.mapLiteraryInstances){
        this.mapLiteraryInstances[key].changeTimeRange(this.timeline);
    }
};