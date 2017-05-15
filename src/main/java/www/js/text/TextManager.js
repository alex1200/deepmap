function TextManager(){
    this.mapTextInstances = new Array;
    this.mapTextMetaInstances = new Array;

    this.timeline = new Array;
}

TextManager.prototype.init = function() {
    this.loadTextMeta();
    // this.loadText();
};
TextManager.prototype.loadTextMeta = function(){
    var self = this;
    webService.getTextMeta(function(jsonResults){
        if(jsonResults.status == "SUCCESS"){
            //console.log("success");
            var listSources = jsonResults.list;
            for(var i = 0; i < listSources.length; i++){
                var source = listSources[i];
                //console.log("list row "+i, source);
                if(null == self.mapTextMetaInstances[source[0]]){
                    //Add new instance of source
                    //console.log("uid is null ", source);
                    var instance = new TextMetaInstance();
                    self.mapTextMetaInstances[source[0]] = instance;
                    instance.init(source);
                }
                else{
                    //Update instance of source
                    //console.log("update");
                    self.mapTextMetaInstances[source[0]].update(source);
                }
            }

            textRender.loadList();

            // mainNavigator.loadAdvancedText(1);
        }
    })
};

// TextManager.prototype.loadText = function(){
//     var self = this;
//     webService.getText(function(jsonResults){
//         if(jsonResults.status == "SUCCESS"){
//             //console.log("success");
//             var listSources = jsonResults.list;
//             for(var i = 0; i < listSources.length; i++){
//                 var source = listSources[i];
//                 //console.log("list row "+i, source);
//                 if(null == self.mapTextInstances[source[0]]){
//                     //Add new instance of source
//                     //console.log("uid is null ", source);
//                     var instance = new TextInstance();
//                     self.mapTextInstances[source[0]] = instance;
//                     instance.init(source);
//                 }
//                 else{
//                     //Update instance of source
//                     //console.log("update");
//                     self.mapTextInstances[source[0]].update(source);
//                 }
//             }
//
//             // literaryRender.loadList();
//         }
//     })
// };

TextManager.prototype.getInstance = function(UID){
    var instance = this.mapTextMetaInstances[UID];
    if(null != instance && instance != undefined){
        return instance;
    }
};