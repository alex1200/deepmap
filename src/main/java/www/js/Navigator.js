function Navigator(){
    this.selectedStation;
}

Navigator.prototype.setStation = function(station){
    this.selectedStation = station.replace("Station ","");
    // console.log(this.selectedStation);

    var instance = stationManager.getInstance(this.selectedStation);
    instance.loadPanoDetails();
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

Navigator.prototype.loadStation = function(station){
    $('#fullText').hide();
    var instance = stationManager.getInstance(station);
    mapCommon.loadPanorama(instance.source[3], instance.source[4], station)
};

Navigator.prototype.overMarker = function(station){
    mapCommon.hoverOverMarker('Station '+station);
};

Navigator.prototype.outMarker = function(station){
    mapCommon.hoverOutMarker('Station '+station);
};


Navigator.prototype.loadAdvancedText = function(textID){
if(textID != 1){
    this.loadText(textID);
    return;
}
    var instance = textManager.getInstance(textID);
    $('#fullText').show();
    $('#fullText').empty();
    var close = $('<button id="fullTextClose" onclick="$(\'#fullText\').hide();">close</button>');
    var text= '<h1>'+instance.source[3]+'</h1>';
    text+= '<h3>'+instance.source[5]+'</h3>';

    var rawText = instance.text;
    for(var i = 0; i < instance.arrayStations.length; i++){
        var station = instance.arrayStations[i];
        var start = station[3];
        var end = station[4];
        // console.log(start,end);
        //<s id="s'+start+'">
        // console.log(rawText.indexOf('<s id="s'+start+'">'));

        rawText = rawText.replace('<s id="s'+start+'">','<a id="a'+start+'" style="color:#f58400" title="Station '+station[1]+'" onclick="mainNavigator.loadStation('+station[1]+')"><s id="s'+start+'">');

        var startIndex = rawText.indexOf('<s id="s'+end+'">');
        var endIndex = rawText.indexOf('</s>',startIndex)+4;

        // console.log(startIndex,endIndex);
        rawText = rawText.slice(0, endIndex) + '</a>' + rawText.slice(endIndex);

        // console.log(rawText);
        // rawText.replace('<s id="'+start+'">','<s id="'+start+'">');


    }

    rawText = this.replaceEnamex(rawText);
    this.pages = this.splitToPages(rawText);
    var body = $('<div id="fullTextBody"></div>');
body.append(close);
    this.pageNumber = 1;
    var page = this.pages[this.pageNumber];
    // for(var pageNumber in pages){
        var pageDiv = $('<div id="page_'+this.pageNumber+'" class="page"></div>');
        var pageText = $('<div id="page_'+this.pageNumber+'_text" class="pageText"></div>');
        var pageImage = $('<div id="page_'+this.pageNumber+'_image" class="pageImage"></div>');
        var pageAnnotation = $('<div id="page_'+this.pageNumber+'_annotation" class="pageAnnotation"></div>');

        var text = this.pages[this.pageNumber];
        var enamexList = this.getEnamex(text);
        pageAnnotation.append(this.buildLocationList(enamexList));

        pageText.append(this.pages[this.pageNumber]);
        pageImage.append($('<img src="media/pages/west/guidetolakesdedi00westiala-page-'+this.padInt((parseInt(this.pageNumber)+8),3)+'.jpg" width="531" height="1019">'));
        pageDiv.append(pageImage);
        pageDiv.append(pageText);
        pageDiv.append(pageAnnotation);
    pageDiv.append('<div class="pageNav"><a onclick="mainNavigator.nextPage(-1,'+textID+')">Prev</a>|<input type="number" value="'+this.pageNumber+'" onkeydown="if (event.keyCode == 13) { mainNavigator.changePage(this,'+textID+'); return false; }">|<a onclick="mainNavigator.nextPage(1,'+textID+')">Next</a></div>')
        pageDiv.append('<hr>');
        body.append(pageDiv);
    // }

    // text += body;
    // $('#fullText').html(text);
    $('#fullText').append(body);

    // $("img.lazy").lazyload({
    //         threshold : 200,
    //     effect : "fadeIn",
    //     container: $("#fullTextBody")
    //     });
    for(var i = 0; i < instance.arrayStations.length; i++){
        var station = instance.arrayStations[i];
        var start = station[3];
        var end = station[4];
        for( var j = start; j <= end; j++){
            if(page.indexOf('<s id="s'+j+'">') != -1){
                $('#fullText').append($('<div class="fullTextStationImage" style="position:absolute;top:100px;left:10px" onclick="mainNavigator.loadStation('+station[1]+')">Station '+station[1]+'' +
                    '<br><img src="'+mapCommon.getImageAtStation(station[1])+'"></div>'));
                console.log(station[0]);
                if(parseInt(station[0]) == 1){
                    console.log(station[0]);
                    $('#page_'+this.pageNumber+'_annotation').append($('<img src="media/img/station1.jpg">'))
                }
            }
        }
        // var anchor_offset = $('a[id="a'+start+'"]').offset().top;

        // $(window).on('scroll', function() {
        //     if ( $(window).scrollTop() > anchor_offset )
        //         $('#test').show();
        // });
    }
};


Navigator.prototype.changePage = function(comp, textID){
    var page = $(comp).val();
    this.pageNumber = page;
    this.nextPage(0, textID);
}

Navigator.prototype.nextPage = function(direction, textID){
    $('#fullText').empty();
    var body = $('<div id="fullTextBody"></div>');
    if(this.pageNumber == 1 && direction == -1){
        return;
    }
    this.pageNumber = parseInt(this.pageNumber) + direction;

    var page = this.pages[this.pageNumber];
    if(page == undefined){
        if(direction == 0){
            direction = 1;
        }
        while(page == undefined) {
            this.pageNumber = parseInt(this.pageNumber) + direction;
console.log(this.pageNumber);
            page = this.pages[this.pageNumber];
        }
    }
    // for(var pageNumber in pages){
    var pageDiv = $('<div id="page_'+this.pageNumber+'" class="page"></div>');
    var pageText = $('<div id="page_'+this.pageNumber+'_text" class="pageText"></div>');
    var pageImage = $('<div id="page_'+this.pageNumber+'_image" class="pageImage"></div>');
    var pageAnnotation = $('<div id="page_'+this.pageNumber+'_annotation" class="pageAnnotation"></div>');

    var text = this.pages[this.pageNumber];
    var enamexList = this.getEnamex(text);
    pageAnnotation.append(this.buildLocationList(enamexList));

    pageText.append(this.pages[this.pageNumber]);
    pageImage.append($('<img src="media/pages/west/guidetolakesdedi00westiala-page-'+this.padInt((parseInt(this.pageNumber)+8),3)+'.jpg" width="531" height="1019">'));
    pageDiv.append(pageImage);
    pageDiv.append(pageText);
    pageDiv.append(pageAnnotation);
    pageDiv.append('<div class="pageNav"><a onclick="mainNavigator.nextPage(-1,'+textID+')">Prev</a>|<input type="number" value="'+this.pageNumber+'" onkeydown="if (event.keyCode == 13) { mainNavigator.changePage(this,'+textID+'); return false; }">|<a onclick="mainNavigator.nextPage(1,'+textID+')">Next</a></div>')
    pageDiv.append('<hr>');
    body.append(pageDiv);
    // }

    $('#fullText').append(body);
    var instance = textManager.getInstance(textID);
    for(var i = 0; i < instance.arrayStations.length; i++){
        var station = instance.arrayStations[i];
        var start = station[3];
        var end = station[4];
        for( var j = start; j <= end; j++){
            if(page.indexOf('<s id="s'+j+'">') != -1){
                body.append($('<div class="fullTextStationImage" style="position:absolute;top:100px;left:10px" onclick="mainNavigator.loadStation('+station[1]+')">Station '+station[1]+'' +
                    '<br><img src="'+mapCommon.getImageAtStation(station[1])+'"></div>'));
                console.log(station[0]);
                if(parseInt(station[0]) == 1){
                    console.log(station[0]);
                    $('#page_'+this.pageNumber+'_annotation').append($('<img src="media/img/station1.jpg" width="100%">'))
                }
                break;
            }
        }
        // var anchor_offset = $('a[id="a'+start+'"]').offset().top;

        // $(window).on('scroll', function() {
        //     if ( $(window).scrollTop() > anchor_offset )
        //         $('#test').show();
        // });
    }
    // text += body;
    // $('#fullText').html(text);
}

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