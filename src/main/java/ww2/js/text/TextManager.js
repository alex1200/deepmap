function TextManager(){
    this.mapTextInstances = new Array;
    this.mapTextMetaInstances = new Array;

    this.timeline = new Array;

    this.totalTexts = 0;
    this.loadedTexts = 0;
}

TextManager.prototype.init = function() {
    this.loadTextMeta();
    // this.loadText();
};
TextManager.prototype.loadTextMeta = function(){
    var self = this;
    webService.getTextMeta(function(jsonResults){
        // if(jsonResults.status == "SUCCESS"){
        //     console.log(jsonResults);
            var listSources = jsonResults;
            self.totalTexts = Object.keys(listSources).length;
            for(var key in listSources){
                var source = listSources[key];
                //console.log("list row "+i, source);
                if(null == self.mapTextMetaInstances[key]){
                    //Add new instance of source
                    //console.log("uid is null ", source);
                    var instance = new TextMetaInstance();
                    self.mapTextMetaInstances[key] = instance;
                    instance.init(source);
                }
                else{
                    //Update instance of source
                    //console.log("update");
                    self.mapTextMetaInstances[key].update(source);
                }
            }

            // textRender.loadList();

            // mainNavigator.loadAdvancedText(1);
        // }
    })
};

TextManager.prototype.getInstance = function(UID){
    var instance = this.mapTextMetaInstances[UID];
    if(null != instance && instance != undefined){
        return instance;
    }
};