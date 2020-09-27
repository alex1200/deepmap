function TextMetaInstance(){
    this.source = new Array;
    this.text = undefined;
    // this.mapGeoparseInstances = new Array;
}

TextMetaInstance.prototype.init = function(inSource){
    this.source = inSource;

};

TextMetaInstance.prototype.update = function(source){
    this.source = source;
};

TextMetaInstance.prototype.getText = function(concordanceUID, callback){
    if(this.text == undefined){
        var self = this;
        webService.getText(self.source.UID, function(text){
            // console.log(text);
            // if(text.status == "SUCCESS"){
            self.text = text;

            callback(concordanceUID, self.text);
            // textManager.loadedTexts++;
            // $('#searchHelpProgress').val((textManager.loadedTexts/textManager.totalTexts)*100);
            // if(textManager.loadedTexts == textManager.totalTexts){
            //     mainNavigator.hasLoaded = true;
            //     $('#searchHelpLoading').hide();
            //     $('#searchHelpClose').show();
            // }
            // }
        });
    }
    else{
        callback(this.text);
    }
};



