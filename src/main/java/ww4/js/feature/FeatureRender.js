function FeatureRender(){

}

FeatureRender.prototype.showFeatures = function(){
    var featureList = featureManager.mapFeatures;
    for(var key in featureList){
        var feature = featureList[key];
            featureRender.addConcordance(feature, false);
            var concString = "<h3>" + feature.altName + "</h3>";
            concString += '<div class="source">'+feature.heritageCategory+ ' - ' + feature.riskMethod+'</div>';
            concString += '<div class="sourceLink" href="'+feature.URI+'" target="_blank">go to website</div>';

            concString += "<br><a onclick=\"featureRender.loadPlaceView('"+feature.altName+"',"+feature.latitude+","+feature.longitude+");\">See Location</a>";
        // var icon = webService.getIcon(feature.source);



            mapCommon.addMarker(feature.altName,feature.latitude,feature.longitude,concString, false);

            // locationManager.addToTimeline(concordance);
            // count++;


    }
}

FeatureRender.prototype.addConcordance = function(feature, bool){
    var container = $("#leftScroll");
    
    // fetch tbody and row template
    var row = $('<div class="renderContainer"></div>');
    var con = $('<div class="concordance"></div>');
    var concString = '<div class="concordanceInnerDiv"><h3>' + feature.altName + "</h3>";
    if(feature.heritageCategory != undefined) {
        concString += '<p>' + feature.heritageCategory + ' - ' + feature.riskMethod + '</p>';
    }
    // concString += '<div class="source"><img src="'+webService.getIcon(feature.source)+'"/>'+feature.sourceProvider+'</div>';
    concString += '<a class="sourceLink" href="'+feature.URI+'" target="_blank">go to website</a>';
    // con.append($('<img src="'+feature.URI+'" width="75px"/>'));

    var hl = '<div class="hasLocation">';
    if(feature.latitude == 0 && feature.longitude == 0) {
        hl+="No Location";
    }
    else{
        hl += featureRender.buildLocation(feature);
        hl += "<br><a onclick=\"featureRender.loadPlaceView('"+feature.altName+"',"+feature.latitude+","+feature.longitude+");\">See Location</a>"
    }
    hl += '</div>';

    concString += hl;
    concString += "</div>";
    con.append(concString);
    row.append(con);
// clone row and insert into table
    container.append(row);
};

FeatureRender.prototype.buildLocation = function(feature){
        var long = feature.longitude;
        var lat = feature.latitude;

        return '<p class="location" onclick="mapCommon.goto('+parseFloat(lat).toFixed(2)+','+parseFloat(long).toFixed(2)+')">'+ parseFloat(lat).toFixed(2) + ", " + parseFloat(long).toFixed(2)+'</p>';
};


FeatureRender.prototype.loadPlaceView = function(word, lat, long){
    mainNavigator.clear();
    concordanceManager.mapEnamexConcordance = new Array();
    concordanceRender.ranges = new Array();
    mainNavigator.startSearchProgress();
    $('#panoTop').show();

    webService.postFeatureSearch(word, lat, long, mainNavigator.getTextSelection(), function (jsonResults)
    {
        var listConcordance = jsonResults;//.list;
        for (var i = 0; i < listConcordance.length; i++) {
            var concordance = listConcordance[i];
            concordanceManager.mapEnamexConcordance.push(concordance);

            concordanceRender.addConcordance(concordance);
            concordanceManager.addToTimeline(concordance);
        }


        // }
        var count = concordanceManager.mapEnamexConcordance.length;
        $('#summaryCountShown').html(count);
        $('#summaryCountTotal').html(count);

        timeline.resize();
        timeline.redraw();
        mainNavigator.endSearchProgress();
    });
    mainNavigator.featurePano = true;
    mapCommon.loadPanorama(lat,long,word)};

FeatureRender.prototype.closePano = function(){
    $('#panoTop').hide();
    mainNavigator.featurePano = false;
    mainNavigator.clear();
    concordanceManager.mapEnamexConcordance = new Array();
    concordanceRender.ranges = new Array();
    if(mapCommon.panorama.getVisible() == true){
        mapCommon.panorama.setVisible(false);
        mapCommon.panoMarker.setMap(null);
    };

    featureRender.showFeatures();
    // concordanceManager.reload();
};