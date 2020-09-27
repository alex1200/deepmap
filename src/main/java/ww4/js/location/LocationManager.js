function LocationManager(){
    this.mapConcordance = new Array();
    this.mapMedia = new Array();
    this.altMode = false;
    this.ranges = new Array();
}

LocationManager.prototype.search = function(search) {
    var self = this;
    mainNavigator.startSearchProgress();
    webService.postLocationSearch(search, function (jsonResults)
    {
        // console.log(jsonResults);
        // if (jsonResults.status == "SUCCESS") {
        var count = 0;
        var listConcordance = jsonResults.concordanceList;//.list;
        for (var i = 0; i < listConcordance.length; i++) {
            var concordance = listConcordance[i];
            self.mapConcordance.push(concordance);
            concordanceRender.addConcordance(concordance, false);
            var concString = "\"..."+concordance.concordanceStringLeading+ " <b>" + concordance.term + "</b> " +
                concordance.concordanceStringTrailing+"...\"";

            concString +='<a onclick="textRender.loadTextView(\''+concordance.UID+'\')">full text</a>';
            if (concordance.hasLocation == true || concordance.hasLocation == "true"){
                for(var j = 0; j < concordance.concordance.length; j++){
                    var token = concordance.concordance[j];
                    if(token.xmlTag == "enamex"){
                        concordanceManager.addEnamexToMap(token.fullToken,token.word,concString, !token.inRadius);
                    }
                }
            }
            concordanceManager.addToTimeline(concordance);
            count++;
        }

        var listMedia = jsonResults.mediaList;//.list;
        for (var i = 0; i < listMedia.length; i++) {
            var media = listMedia[i];
            self.mapMedia.push(media);
            locationRender.addConcordance(media, false);
            var concString = '<img src="'+media.url+'" height="75px"/><h3>' + media.title + "</h3>" + media.description;
            concString += '<div class="source">'+media.sourceProvider+'</div>';
            concString += '<div class="sourceLink" href="'+media.sourceURI+'" target="_blank">go to website</div>';
            var icon = webService.getIcon(media.source);
            mapCommon.addMarker(media.title,media.lat,media.lng,concString, false,icon);

            locationManager.addToTimeline(concordance);
            count++;
        }


        // }
        // var count = self.mapConcordance.length + self.mapAltConcordance.length;
        $('#locationSummaryCountShown').html(count);
        $('#locationSummaryCountTotal').html(count);

        timeline.resize();
        timeline.redraw();
        mainNavigator.endSearchProgress();
    });


};

LocationManager.prototype.clear = function(){
    this.mapConcordance = new Array();
    this.mapMedia = new Array();

};

LocationManager.prototype.addToTimeline = function(media){
    var range = new Array();
    range[0] = parseInt(media.startDate);
    range[1] = parseInt(media.endDate);
    this.ranges.push(range)
}