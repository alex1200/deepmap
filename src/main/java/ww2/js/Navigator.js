function Navigator(){
    this.helpShowing = true;
    this.Timeline = false;
    this.hasLoaded = false;
}


Navigator.prototype.init = function(){
    mainNavigator.searchChange();
};

Navigator.prototype.clear = function(){
    mapCommon.clearMarkers();
    $("#leftScroll").empty();
    concordanceManager.clear();
};

Navigator.prototype.pickEnabled = function(){
    mapCommon.pickEnabled=true;
    $('#pickButton').css('background-color','#1abc9c');
    $('body').css('cursor','crosshair');
    mapCommon.map.setOptions({ draggableCursor: 'crosshair' });
};

Navigator.prototype.pickDisabled = function(){
    mapCommon.pickEnabled=false;
    $('#pickButton').css('background-color','#000');
    $('body').css('cursor','');
    mapCommon.map.setOptions({ draggableCursor: 'url(http://maps.google.com/mapfiles/openhand.cur), move' });

};

Navigator.prototype.searchChange = function(comp){
    var type = $("#searchSelect").val();
    this.pickDisabled();
    if(type == "simple"){
        this.showConcordanceSummary();
        var	t = document.querySelector("#searchContainer");
        var row = document.getElementById("templateSimpleSearch");
        t.innerHTML = "";
        t.appendChild(row.content.cloneNode(true));
    }
    else if(type == "advanced"){
        this.showConcordanceSummary();
        var	t = document.querySelector("#searchContainer");
        var row = document.getElementById("templateAdvancedSearch");
        t.innerHTML = "";
        t.appendChild(row.content.cloneNode(true));
    }
    else if(type == "comparison"){
        this.showConcordanceSummary();
        var	t = document.querySelector("#searchContainer");
        var row = document.getElementById("templateComparisonSearch");
        t.innerHTML = "";
        t.appendChild(row.content.cloneNode(true));
    }
    else if(type == "advancedComparison"){
        this.showConcordanceSummary();
        var	t = document.querySelector("#searchContainer");
        var row = document.getElementById("templateAdvancedComparisonSearch");
        t.innerHTML = "";
        t.appendChild(row.content.cloneNode(true));
    }

    else if(type == "mediaSearch"){
        this.showMediaSummary();
        var	t = document.querySelector("#searchContainer");
        var row = document.getElementById("templateMediaSearch");
        t.innerHTML = "";
        t.appendChild(row.content.cloneNode(true));
    }
};

Navigator.prototype.showConcordanceSummary = function(){
    this.pickDisabled();
    var	t = document.querySelector("#leftSummary");
    var row = document.getElementById("templateConcordanceSummary");
    t.innerHTML = "";
    t.appendChild(row.content.cloneNode(true));
};

Navigator.prototype.showMediaSummary = function(){
    this.pickDisabled();
    var	t = document.querySelector("#leftSummary");
    var row = document.getElementById("templateMediaSummary");
    t.innerHTML = "";
    t.appendChild(row.content.cloneNode(true));
};

Navigator.prototype.search = function() {
    mainNavigator.clear();
    var search = new SearchObject();
    search.term = $('#termInput').val();
    search.concordanceLimit = $('#limitInput').val();
    search.fuzzy = $('#fuzzyInput').is(':checked');
    ga('send', 'event', 'search', search.term, 'search', search.concordanceLimit);
    concordanceManager.search(search,false);
};

Navigator.prototype.advancedSearch = function() {
    mainNavigator.clear();
    var search = new SearchObject();
    search.term = $('#adv_termInput').val();
    search.secondaryTerm = $('#adv_secondaryTermInput').val();
    search.concordanceLimit = $('#adv_limitInput').val();
    search.fuzzy = $('#adv_fuzzyInput').is(':checked');
    ga('send', 'event', 'advancedSearch', search.term, search.secondaryTerm, search.concordanceLimit);
    concordanceManager.search(search,false);
};

Navigator.prototype.compareSearch = function() {
    var time = new Date().getTime();
    mainNavigator.clear();
    var search = new SearchObject();
    search.term = $('#comp1_termInput').val();
    search.concordanceLimit = $('#comp1_limitInput').val();
    search.fuzzy = $('#comp1_fuzzyInput').is(':checked');
    ga('send', 'event', 'compareSearch1_'+ time, search.term, 'search', search.concordanceLimit);
    concordanceManager.search(search,false);

    var search = new SearchObject();
    search.term = $('#comp2_termInput').val();
    search.concordanceLimit = $('#comp2_limitInput').val();
    search.fuzzy = $('#comp2_fuzzyInput').is(':checked');
    ga('send', 'event', 'compareSearch2_'+ time, search.term, 'search', search.concordanceLimit);
    concordanceManager.search(search,true);
};

Navigator.prototype.advancedCompareSearch = function() {
    var time = new Date().getTime();
    mainNavigator.clear();
    var search = new SearchObject();
    search.term = $('#adv_comp1_termInput').val();
    search.secondaryTerm = $('#adv_comp1_secondaryTermInput').val();
    search.concordanceLimit = $('#adv_comp1_limitInput').val();
    search.fuzzy = $('#adv_comp1_fuzzyInput').is(':checked');
    ga('send', 'event', 'advancedCompareSearch1_'+ time, search.term, search.secondaryTerm, search.concordanceLimit);

    concordanceManager.search(search,false);

    var search = new SearchObject();
    search.term = $('#adv_comp2_termInput').val();
    search.secondaryTerm = $('#adv_comp2_secondaryTermInput').val();
    search.concordanceLimit = $('#adv_comp2_limitInput').val();
    search.fuzzy = $('#adv_comp2_fuzzyInput').is(':checked');
    ga('send', 'event', 'advancedCompareSearch2_'+ time, search.term, search.secondaryTerm, search.concordanceLimit);

    concordanceManager.search(search,true);
};

Navigator.prototype.mediaSearch = function() {
    mainNavigator.clear();
    var search = new SearchLocationObject();
    search.lat = $('#chooseLat').val();
    search.lng = $('#chooseLong').val();
    search.radius = $('#chooseRadius').val();
    search.concordanceLimit = $('#mediaLimitInput').val();

    locationManager.search(search);
};

Navigator.prototype.startSearchProgress = function(){
    $('#searchProgressTitle').show();
    $('#searchProgress').show();
}

Navigator.prototype.endSearchProgress = function(){
    $('#searchProgressTitle').hide();
    $('#searchProgress').hide();
}

Navigator.prototype.renderSelectChange = function(timeRange){

    mapCommon.clearMarkers();
    var min = timeline.currentMin;
    var max = timeline.currentMax;
    if(timeRange != undefined){
        min = timeRange.min;
        max = timeRange.max;
    }
    var renderType = $('#renderTypeSelect').val();

    if (renderType == "all") {
        $("#leftScroll").empty();
        var count = 0;
        for (var i = 0; i < concordanceManager.mapConcordance.length; i++) {
            var concordance = concordanceManager.mapConcordance[i];

            var textInstance = textManager.getInstance(concordance.parentUID);
            var meta = textInstance.source;
            var year = meta.Year_Pub;

            if(min < year && year < max) {

                concordanceRender.addConcordance(concordance, false);
                count++;
                var concString = "..." + concordance.concordanceStringLeading + " <b>" + concordance.term + "</b> " +
                    concordance.concordanceStringTrailing + "...";
                if (concordance.hasLocation == true || concordance.hasLocation == "true") {
                    for(var j = 0; j < concordance.concordance.length; j++){
                        var token = concordance.concordance[j];
                        if(token.xmlTag == "enamex"){
                            concordanceManager.addEnamexToMap(token.fullToken,token.word,concString, false);
                        }
                    }
                }
            }
        }
        for (var i = 0; i < concordanceManager.mapAltConcordance.length; i++) {
            var concordance = concordanceManager.mapAltConcordance[i];
            var textInstance = textManager.getInstance(concordance.parentUID);
            var meta = textInstance.source;
            var year = meta.Year_Pub;

            if(min < year && year < max) {
                concordanceRender.addConcordance(concordance, true);
                count++;
                var concString = "..." + concordance.concordanceStringLeading + " <b>" + concordance.term + "</b> " +
                    concordance.concordanceStringTrailing + "...";
                for(var j = 0; j < concordance.concordance.length; j++){
                    var token = concordance.concordance[j];
                    if(token.xmlTag == "enamex"){
                        concordanceManager.addEnamexToMap(token.fullToken,token.word,concString, true);
                    }
                }
            }
        }
        // var count = concordanceManager.mapAltConcordance.length + concordanceManager.mapConcordance.length;
        $('#summaryCountShown').html(count);
    }
    else {
        $("#leftScroll").empty();
        var count = 0;
        for (var i = 0; i < concordanceManager.mapConcordance.length; i++) {
            var concordance = concordanceManager.mapConcordance[i];
            var textInstance = textManager.getInstance(concordance.parentUID);
            var meta = textInstance.source;
            var year = meta.Year_Pub;

            if(min < year && year < max) {
                if (concordance.hasLocation == true || concordance.hasLocation == "true") {
                    concordanceRender.addConcordance(concordance, false);
                    count++;
                    var concString = "..." + concordance.concordanceStringLeading + " <b>" + concordance.term + "</b> " +
                        concordance.concordanceStringTrailing + "...";
                    for(var j = 0; j < concordance.concordance.length; j++){
                        var token = concordance.concordance[j];
                        if(token.xmlTag == "enamex"){
                            concordanceManager.addEnamexToMap(token.fullToken,token.word,concString, false);
                        }
                    }
                }
            }
        }
        for (var i = 0; i < concordanceManager.mapAltConcordance.length; i++) {
            var concordance = concordanceManager.mapAltConcordance[i];
            var textInstance = textManager.getInstance(concordance.parentUID);
            var meta = textInstance.source;
            var year = meta.Year_Pub;

            if(min < year && year < max) {

                if (concordance.hasLocation == true || concordance.hasLocation == "true") {
                    concordanceRender.addConcordance(concordance, true);
                    count++;
                    var concString = "..." + concordance.concordanceStringLeading + " <b>" + concordance.term + "</b> " +
                        concordance.concordanceStringTrailing + "...";
                    for(var j = 0; j < concordance.concordance.length; j++){
                        var token = concordance.concordance[j];
                        if(token.xmlTag == "enamex"){
                            concordanceManager.addEnamexToMap(token.fullToken,token.word,concString, true);
                        }
                    }
                }
            }
        }
        $('#summaryCountShown').html(count);
    }
};

Navigator.prototype.locationRenderSelectChange = function(timeRange){

    mapCommon.clearMarkers();
    var min = timeline.currentMin;
    var max = timeline.currentMax;
    if(timeRange != undefined){
        min = timeRange.min;
        max = timeRange.max;
    }
    var renderType = $('#locationRenderTypeSelect').val();

    if (renderType == "all") {
        $("#leftScroll").empty();
        var count = 0;
        for (var i = 0; i < locationManager.mapConcordance.length; i++) {
            var concordance = locationManager.mapConcordance[i];

            var textInstance = textManager.getInstance(concordance.parentUID);
            var meta = textInstance.source;
            var year = meta.Year_Pub;

            if(min < year && year < max) {

                concordanceRender.addConcordance(concordance, false);
                count++;
                var concString = "..." + concordance.concordanceStringLeading + " <b>" + concordance.term + "</b> " +
                    concordance.concordanceStringTrailing + "...";
                if (concordance.hasLocation == true || concordance.hasLocation == "true") {
                    for(var j = 0; j < concordance.concordance.length; j++){
                        var token = concordance.concordance[j];
                        if(token.xmlTag == "enamex"){
                            concordanceManager.addEnamexToMap(token.fullToken,token.word,concString, !token.inRadius);
                        }
                    }
                }
            }
        }
        for (var i = 0; i < locationManager.mapMedia.length; i++) {
            var media = locationManager.mapMedia[i];

            // if(min < media.endDate && media.startDate < max) {
                locationRender.addConcordance(media,false);
                count++;
                var concString = '<img src="' + media.url + '" height="75px"/><h3>' + media.title + "</h3>" + media.description;
                concString += '<div class="source">' + media.sourceProvider + '</div>';
                concString += '<div class="sourceLink" href="' + media.sourceURI + '" target="_blank">go to website</div>';
                var icon = webService.getIcon(media.source);
                if (media.lat != 0 && media.lng != 0) {
                    mapCommon.addMarker(media.title, media.lat, media.lng, concString,false, icon);
                }
                // locationManager.addToTimeline(concordance);
            // }
        }
        // var count = concordanceManager.mapAltConcordance.length + concordanceManager.mapConcordance.length;
        $('#locationSummaryCountShown').html(count);
    }
    else if(renderType == "location"){
        $("#leftScroll").empty();
        var count = 0;
        for (var i = 0; i < locationManager.mapConcordance.length; i++) {
            var concordance = locationManager.mapConcordance[i];
            var textInstance = textManager.getInstance(concordance.parentUID);
            var meta = textInstance.source;
            var year = meta.Year_Pub;

            if(min < year && year < max) {
                if (concordance.hasLocation == true || concordance.hasLocation == "true") {
                    concordanceRender.addConcordance(concordance, false);
                    count++;
                    var concString = "..." + concordance.concordanceStringLeading + " <b>" + concordance.term + "</b> " +
                        concordance.concordanceStringTrailing + "...";
                    for(var j = 0; j < concordance.concordance.length; j++){
                        var token = concordance.concordance[j];
                        if(token.xmlTag == "enamex"){
                            concordanceManager.addEnamexToMap(token.fullToken,token.word,concString, !token.inRadius);
                        }
                    }
                }
            }
        }
        for (var i = 0; i < locationManager.mapMedia.length; i++) {
            var media = locationManager.mapMedia[i];
            if(media.lat != 0 && media.lng != 0) {
                // if(min < media.endDate && media.startDate < max) {
                    locationRender.addConcordance(media,false);
                    count++;
                    var concString = '<img src="' + media.url + '" height="75px"/><h3>' + media.title + "</h3>" + media.description;
                    concString += '<div class="source">' + media.sourceProvider + '</div>';
                    concString += '<div class="sourceLink" href="' + media.sourceURI + '" target="_blank">go to website</div>';
                    var icon = webService.getIcon(media.source);
                    mapCommon.addMarker(media.title, media.lat, media.lng, concString, false, icon);

                    // locationManager.addToTimeline(concordance);
                // }
            }
        }
        $('#locationSummaryCountShown').html(count);
    }
    else if (renderType == "media") {
        $("#leftScroll").empty();
        var count = 0;
        for (var i = 0; i < locationManager.mapMedia.length; i++) {
            var media = locationManager.mapMedia[i];

            // if(min < media.endDate && media.startDate < max) {
                locationRender.addConcordance(media,false);
                count++;
                var concString = '<img src="' + media.url + '" height="75px"/><h3>' + media.title + "</h3>" + media.description;
                concString += '<div class="source">' + media.sourceProvider + '</div>';
                concString += '<div class="sourceLink" href="' + media.sourceURI + '" target="_blank">go to website</div>';
                var icon = webService.getIcon(media.source);
                if (media.lat != 0 && media.lng != 0) {
                    mapCommon.addMarker(media.title, media.lat, media.lng, concString, false, icon);
                }
                // locationManager.addToTimeline(concordance);
            // }
        }
        // var count = concordanceManager.mapAltConcordance.length + concordanceManager.mapConcordance.length;
        $('#locationSummaryCountShown').html(count);
    }
    else if (renderType == "concordance") {
        $("#leftScroll").empty();
        var count = 0;
        for (var i = 0; i < locationManager.mapConcordance.length; i++) {
            var concordance = locationManager.mapConcordance[i];

            var textInstance = textManager.getInstance(concordance.parentUID);
            var meta = textInstance.source;
            var year = meta.Year_Pub;

            if(min < year && year < max) {

                concordanceRender.addConcordance(concordance, false);
                count++;
                var concString = "..." + concordance.concordanceStringLeading + " <b>" + concordance.term + "</b> " +
                    concordance.concordanceStringTrailing + "...";
                if (concordance.hasLocation == true || concordance.hasLocation == "true") {
                    for(var j = 0; j < concordance.concordance.length; j++){
                        var token = concordance.concordance[j];
                        if(token.xmlTag == "enamex"){
                            concordanceManager.addEnamexToMap(token.fullToken,token.word,concString, !token.inRadius);
                        }
                    }
                }
            }
        }
        // var count = concordanceManager.mapAltConcordance.length + concordanceManager.mapConcordance.length;
        $('#locationSummaryCountShown').html(count);
    }
};

Navigator.prototype.openConcordanceDetailPanel = function(){
    $('#concordanceDetailPanel').show();
    concordanceRender.loadDetailPanel(true);
};

Navigator.prototype.loadText = function(textID){
    var instance = textManager.getInstance(textID);
    $('#fullText').show();
    $('#fullText').empty();
    var text = '<button id="fullTextClose" onclick="$(\'#fullText\').hide();">close</button>';
    text+= '<h1>'+instance.source[3]+'</h1>';
    text+= '<h3>'+instance.source[5]+'</h3>';

    var rawText = instance.text;
    for(var i = 0; i < instance.arrayStations.length; i++){
        var station = instance.arrayStations[i];
        var start = station[3];
        var end = station[4];
        console.log(start,end);
        //<s id="s'+start+'">
        console.log(rawText.indexOf('<s id="s'+start+'">'));

        rawText = rawText.replace('<s id="s'+start+'">','<a id="a'+start+'" style="color:#f58400" title="Station '+station[1]+'" onclick="mainNavigator.loadStation('+station[1]+')"><s id="s'+start+'">');

        var startIndex = rawText.indexOf('<s id="s'+end+'">');
        var endIndex = rawText.indexOf('</s>',startIndex)+4;

        console.log(startIndex,endIndex);
        rawText = rawText.slice(0, endIndex) + '</a>' + rawText.slice(endIndex);

        // console.log(rawText);
        // rawText.replace('<s id="'+start+'">','<s id="'+start+'">');


    }

    rawText = this.replaceEnamex(rawText);
    text += '<div id="fullTextBody">'+rawText+'</div>';
    $('#fullText').html(text);

    for(var i = 0; i < instance.arrayStations.length; i++){
        var station = instance.arrayStations[i];
        var start = station[3];
        var end = station[4];
        var anchor_offset = $('a[id="a'+start+'"]').offset().top;
        $('#fullText').append($('<div class="fullTextStationImage" style="position:absolute;top:'+anchor_offset+'px;left:10px" onclick="mainNavigator.loadStation('+station[1]+')">Station '+station[1]+'' +
            '<br><img src="'+mapCommon.getImageAtStation(station[1])+'"></div>'));
        // $(window).on('scroll', function() {
        //     if ( $(window).scrollTop() > anchor_offset )
        //         $('#test').show();
        // });
    }
};

Navigator.prototype.replaceEnamex = function(text){
    var index = 0;
    while(text.indexOf('<enamex', index) != -1){
        //<enamex sw="w52093" long="-3.081393270948825" lat="54.19093311473023" type="ppl" gazref="unlock:10880" name="Ulverston" conf="2.6">U
        var enamex = text.indexOf('<enamex', index);
        var longStart = text.indexOf('long="',enamex)+6;
        var longEnd = text.indexOf('"',longStart);
        var long = text.slice(longStart,longEnd);
        var latStart = text.indexOf('lat="',enamex)+5;
        var latEnd = text.indexOf('"',latStart);
        var lat = text.slice(latStart,latEnd);
        text = text.slice(0, enamex+7) + ' onclick="mainNavigator.gotoLocation('+lat+','+long+')"' + text.slice(enamex+7);
        index = text.indexOf('</enamex>',enamex);
    }
    return text;
};

Navigator.prototype.gotoLocation = function(lat,long){
    $('#fullText').hide();
    if(mapCommon.panorama != undefined) {
        mapCommon.panorama.setVisible(false);
    }
    mapCommon.goto(lat,long);
    $('#fullTextBack').show();
};

Navigator.prototype.padInt = function (num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
};

Navigator.prototype.splitToPages = function(text){
    var pages = new Array;
    var pageSplit = text.split("<pb");
    // console.log(pageSplit);
    for(var i = 0; i < pageSplit.length; i++){//pageSplit.length
        var page = pageSplit[i];
        // var pagebreak = text.indexOf('<pb', index);
        var numberStartIndex = page.indexOf('n="',0)+3;
        var numberEndIndex = page.indexOf('"',numberStartIndex);
        var pageNumber = page.slice(numberStartIndex,numberEndIndex);

        pages[parseInt(pageNumber)] = "<pb"+page;
    }
    console.log(pages);
    return pages;
};

Navigator.prototype.getEnamex = function(text){
    var index = 0;
    var listEnamex = new Array;
    while(text.indexOf('<enamex', index) != -1){
        //<enamex sw="w52093" long="-3.081393270948825" lat="54.19093311473023" type="ppl" gazref="unlock:10880" name="Ulverston" conf="2.6">U
        var enamexStart = text.indexOf('<enamex', index);
        var enamexEnd = text.indexOf('</enamex>',enamexStart);
        var enamex = text.slice(enamexStart, enamexEnd+9);
        index = enamexEnd;

        listEnamex.push(enamex);

    }
    return listEnamex;
};

Navigator.prototype.buildLocationList = function(list){
    var table = $('<table></table>');
    for(var i = 0 ; i < list.length; i++){
        var enamex = list[i];
        var row = $('<tr></tr>');
        row.append($('<td>'+enamex+'</td>'))
        table.append(row);
    }
    return table;
};

Navigator.prototype.toggleSearchHelp = function(){
    if(this.helpShowing == true) {
        $('#searchHelpContainer').hide();
        this.helpShowing = false;
    }
    else{
        $('#searchHelpContainer').show();
        this.helpShowing = true;
    }
};

Navigator.prototype.changeTimeRange = function(timeRange) {
    var select = $('#searchSelect').val();
    if(select != 'mediaSearch') {
        mainNavigator.renderSelectChange(timeRange)
    }
    else{
        mainNavigator.locationRenderSelectChange(timeRange)
    }
}

// Navigator.prototype.concordanceChangeTime = function(timeRange) {
//     // console.log(timeRange);
//     mapCommon.clearMarkers();
//     var min = timeRange.min;
//     var max = timeRange.max;
//     var renderType = $('#renderTypeSelect').val();
//
//     if (renderType == "all") {
//         $("#leftScroll").empty();
//         var count = 0;
//         for (var i = 0; i < concordanceManager.mapConcordance.length; i++) {
//             var concordance = concordanceManager.mapConcordance[i];
//
//             var textInstance = textManager.getInstance(concordance.parentUID);
//             var meta = textInstance.source;
//             var year = meta.Year_Pub;
//
//             if(min < year && year < max) {
//
//                 concordanceRender.addConcordance(concordance, false);
//                 count++;
//                 var concString = "..." + concordance.concordanceStringLeading + " <b>" + concordance.term + "</b> " +
//                     concordance.concordanceStringTrailing + "...";
//                 if (concordance.hasLocation == true || concordance.hasLocation == "true") {
//                     for(var j = 0; j < concordance.concordance.length; j++){
//                         var token = concordance.concordance[j];
//                         if(token.xmlTag == "enamex"){
//                             concordanceManager.addEnamexToMap(token.fullToken,token.word,concString, false);
//                         }
//                     }
//                 }
//             }
//         }
//         for (var i = 0; i < concordanceManager.mapAltConcordance.length; i++) {
//             var concordance = concordanceManager.mapAltConcordance[i];
//             var textInstance = textManager.getInstance(concordance.parentUID);
//             var meta = textInstance.source;
//             var year = meta.Year_Pub;
//
//             if(min < year && year < max) {
//                 concordanceRender.addConcordance(concordance, true);
//                 count++;
//                 var concString = "..." + concordance.concordanceStringLeading + " <b>" + concordance.term + "</b> " +
//                     concordance.concordanceStringTrailing + "...";
//                 for(var j = 0; j < concordance.concordance.length; j++){
//                     var token = concordance.concordance[j];
//                     if(token.xmlTag == "enamex"){
//                         concordanceManager.addEnamexToMap(token.fullToken,token.word,concString, true);
//                     }
//                 }
//             }
//         }
//         // var count = concordanceManager.mapAltConcordance.length + concordanceManager.mapConcordance.length;
//         $('#summaryCountShown').html(count);
//     }
//     else {
//         $("#leftScroll").empty();
//         var count = 0;
//         for (var i = 0; i < concordanceManager.mapConcordance.length; i++) {
//             var concordance = concordanceManager.mapConcordance[i];
//             var textInstance = textManager.getInstance(concordance.parentUID);
//             var meta = textInstance.source;
//             var year = meta.Year_Pub;
//
//             if(min < year && year < max) {
//                 if (concordance.hasLocation == true || concordance.hasLocation == "true") {
//                     concordanceRender.addConcordance(concordance, false);
//                     count++;
//                     var concString = "..." + concordance.concordanceStringLeading + " <b>" + concordance.term + "</b> " +
//                         concordance.concordanceStringTrailing + "...";
//                     for(var j = 0; j < concordance.concordance.length; j++){
//                         var token = concordance.concordance[j];
//                         if(token.xmlTag == "enamex"){
//                             concordanceManager.addEnamexToMap(token.fullToken,token.word,concString, false);
//                         }
//                     }
//                 }
//             }
//         }
//         for (var i = 0; i < concordanceManager.mapAltConcordance.length; i++) {
//             var concordance = concordanceManager.mapAltConcordance[i];
//             var textInstance = textManager.getInstance(concordance.parentUID);
//             var meta = textInstance.source;
//             var year = meta.Year_Pub;
//
//             if(min < year && year < max) {
//
//                 if (concordance.hasLocation == true || concordance.hasLocation == "true") {
//                     concordanceRender.addConcordance(concordance, true);
//                     count++;
//                     var concString = "..." + concordance.concordanceStringLeading + " <b>" + concordance.term + "</b> " +
//                         concordance.concordanceStringTrailing + "...";
//                     for(var j = 0; j < concordance.concordance.length; j++){
//                         var token = concordance.concordance[j];
//                         if(token.xmlTag == "enamex"){
//                             concordanceManager.addEnamexToMap(token.fullToken,token.word,concString, true);
//                         }
//                     }
//                 }
//             }
//         }
//         $('#summaryCountShown').html(count);
//     }
// }