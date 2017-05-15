function TextMetaInstance(){
    this.source = new Array;
    this.text = new Array();
    // this.mapGeoparseInstances = new Array;
}

TextMetaInstance.prototype.init = function(inSource){
    this.source = inSource;
    var self = this;
    webService.getText(this.source.UID, function(text){
        // console.log(text);
        // if(text.status == "SUCCESS"){
            self.text = text;
            textManager.loadedTexts++;
            $('#searchHelpProgress').val((textManager.loadedTexts/textManager.totalTexts)*100);
            if(textManager.loadedTexts == textManager.totalTexts){
                mainNavigator.hasLoaded = true;
                $('#searchHelpLoading').hide();
                $('#searchHelpClose').show();
            }
        // }
    });
};

TextMetaInstance.prototype.update = function(source){
    this.source = source;
};
