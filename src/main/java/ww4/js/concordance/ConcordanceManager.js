function ConcordanceManager(){
    this.mapConcordance = new Array();
    this.mapAltConcordance = new Array();
    this.altMode = false;
    this.ranges = new Array();
}

ConcordanceManager.prototype.search = function(search, altMarker) {
    var self = this;
    this.altMode = altMarker;
    mainNavigator.startSearchProgress();
    webService.postSearch(search, function (jsonResults)
    {
        // console.log(jsonResults);
        // if (jsonResults.status == "SUCCESS") {
            var listConcordance = jsonResults;//.list;
            for (var i = 0; i < listConcordance.length; i++) {
                var concordance = listConcordance[i];
                if(altMarker == false) {
                    self.mapConcordance.push(concordance);
                }
                else{
                    self.mapAltConcordance.push(concordance);
                }
                concordanceRender.addConcordance(concordance,altMarker);
                var concString = "\"..."+concordance.concordanceStringLeading+ " <b>" + concordance.term + "</b> " +
                    concordance.concordanceStringTrailing+"...\"";

                concString +='<a onclick="textRender.loadTextView(\''+concordance.UID+'\')">full text</a>';
                if (concordance.hasLocation == true || concordance.hasLocation == "true"){
                    for(var j = 0; j < concordance.concordance.length; j++){
                        var token = concordance.concordance[j];
                        if(token.xmlTag == "enamex"){
                            self.addEnamexToMap(token.fullToken,token.word,concString, altMarker);
                        }
                    }
                }
                self.addToTimeline(concordance);
            }


        // }
        var count = self.mapConcordance.length + self.mapAltConcordance.length;
        $('#summaryCountShown').html(count);
        $('#summaryCountTotal').html(count);

        timeline.resize();
        timeline.redraw();
        mainNavigator.endSearchProgress();
    });


};

ConcordanceManager.prototype.addEnamexToMap = function(text, word, content, altMarker) {
    //<enamex sw="w52093" long="-3.081393270948825" lat="54.19093311473023" type="ppl" gazref="unlock:10880" name="Ulverston" conf="2.6">U
    var enamex = text.indexOf('<enamex', 0);
    var longStart = text.indexOf('long="', enamex) + 6;
    var longEnd = text.indexOf('"', longStart);
    var long = text.slice(longStart, longEnd);
    var latStart = text.indexOf('lat="', enamex) + 5;
    var latEnd = text.indexOf('"', latStart);
    var lat = text.slice(latStart, latEnd);

    //console.log(lat, long);
    mapCommon.addMarker(word, lat, long, content, altMarker);
};

ConcordanceManager.prototype.clear = function(){
    this.mapConcordance = new Array();
    this.mapAltConcordance = new Array();

};

ConcordanceManager.prototype.getInstance = function(uid){
    for(var i = 0; i < concordanceManager.mapConcordance.length; i++){
        var concordance = concordanceManager.mapConcordance[i];
        if(concordance.UID == uid){
            return concordance;
        }
    }
    for(var i = 0; i < concordanceManager.mapAltConcordance.length; i++){
        var concordance = concordanceManager.mapAltConcordance[i];
        if(concordance.UID == uid){
            return concordance;
        }
    }
};

ConcordanceManager.prototype.addToTimeline = function(concordance){
    var textInstance = textManager.getInstance(concordance.parentUID);
    var meta = textInstance.source;
    var year = meta.Decade_comp;//meta.Year_Pub;
    var range = new Array();
    range[0] = parseInt(year);
    range[1] = parseInt(year);
    this.ranges.push(range)
}