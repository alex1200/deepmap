function MapCommon(){
    this.width = 1000;//2480;
    this.height = 700;//1332;
    this.westLong = -3.18615287119;
    this.eastLong = -3.11426333743;
    this.northLat = 54.62092662510;
    this.southLat = 54.53912329273;

    this.map;
    this.markerGroups = new Array;
    this.layers = new Array;
    this.mapMarkers = new Array;
}

MapCommon.prototype.init = function(){
    // var myLatLng = {lat: 54.583333, lng: -3.15};
    var myLatLng = {lat: 54.57417972892827, lng: -3.1730026245116916};
    //54.57417972892827,-3.1730026245116916

    this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: myLatLng
    });

    // this.map.setMapTypeId('GoogleEarthAPI');
};

MapCommon.prototype.loadKMZ = function(layerName, path){
    // var ctaLayer = new google.maps.KmlLayer(path,{
    //     map: this.map
    // });
    // ctaLayer.setMap(this.map);
    var kmzLayer = new google.maps.KmlLayer(path);
    kmzLayer.setMap(this.map);
    // var kmlLayer = new google.maps.KmlLayer(path, {
    //     suppressInfoWindows: true,
    //     preserveViewport: false,
    //     map: mapCommon.map
    // });
    console.log("Added Layer");
    //
    // this.layers[layerName] = kmlLayer;
};

MapCommon.prototype.addMarker = function(title, lat, long,panoLat,panoLong){
    var station = title.replace("Station ","");
    var icon = 'media/sprites/sprite-hotspot-med.png';
    if(parseInt(station) >=2 && parseInt(station) <=9) {
        icon = 'media/sprites/sprite-hotspot-' + station + '.png';
    }
    var marker = new google.maps.Marker({
        position: {lat: parseFloat(lat), lng: parseFloat(long)},
        map: this.map,
        title: title,
        icon:icon
    });

    var self = this;
    marker.addListener('click', function() {
        // panorama = this.map.getStreetView();
        // panorama.setPosition({lat: parseFloat(panoLat), lng: parseFloat(panoLong)});
        // panorama.setVisible(true);
        // panorama.setImageDateControl(true);
        $('#leftList').hide();
        $("#map").css('width','100%');
        self.panorama = new google.maps.StreetViewPanorama(
            document.getElementById('map'), {
                position: {lat: parseFloat(panoLat), lng: parseFloat(panoLong)},
                imageDateControl: true,
                addressControl: true,
                linksControl: true,
                panControl: true,
                enableCloseButton: true
            });
        self.panorama.setVisible(true);
        self.panorama.addListener('visible_changed', function() {
            if(self.panorama.getVisible() == false){
                //$('#mediaViewer').remove();
                $("#text").hide();
                $('#leftList').show();
                // $("#map").hide();
                $("#map").css('width','70%');
            };
        });
        //

        self.setStation(title);
    });

    this.mapMarkers[title] = marker;

};

MapCommon.prototype.loadPanorama = function(panoLat,panoLong,station){
    $('#leftList').hide();
    $("#map").css('width','100%');
    var self = this;
    self.panorama = new google.maps.StreetViewPanorama(
        document.getElementById('map'), {
            position: {lat: parseFloat(panoLat), lng: parseFloat(panoLong)},
            imageDateControl: true,
            addressControl: true,
            linksControl: true,
            panControl: true,
            enableCloseButton: true
        });
    self.panorama.setVisible(true);
    self.panorama.addListener('visible_changed', function() {
        if(self.panorama.getVisible() == false){
            //$('#mediaViewer').remove();
            $("#text").hide();
            $('#leftList').show();
            // $("#map").hide();
            $("#map").css('width','70%');
        };
    });
    //

    self.setStationByID(station);
};

MapCommon.prototype.goto = function(lat,long){
    this.map.setCenter(new google.maps.LatLng(lat,long));
};

MapCommon.prototype.setStationByID = function(station){
    // navigator.setStation(title);
    this.selectedStation = station;
    console.log(this.selectedStation);
    viewMedia(this.selectedStation);
    var instance = stationManager.getInstance(this.selectedStation);
    instance.loadPanoDetails();
};

MapCommon.prototype.setStation = function(title){
    // navigator.setStation(title);
    this.selectedStation = title.replace("Station ","");
    console.log(this.selectedStation);
    viewMedia(this.selectedStation);
    var instance = stationManager.getInstance(this.selectedStation);
    instance.loadPanoDetails();
};

MapCommon.prototype.getImageAtStation = function(stationID){
    var instance = stationManager.getInstance(stationID);
    var imgsrc;
    imgsrc = 'https://maps.googleapis.com/maps/api/staticmap?center='+instance.source[1]+','+instance.source[2]+'&zoom=13&size=100x100&maptype=roadmap'+
    '&markers=color:blue%7Clabel:S%7C'+instance.source[1]+','+instance.source[2]+
    '&key=AIzaSyDFFW6ftcenI5Zs6FxjmwSKwJe0cA852_g'
    return imgsrc;
}

MapCommon.prototype.addMarkerToGroup = function(title, lat, long, group){
    var marker = new google.maps.Marker({
        position: {lat: parseFloat(lat), lng: parseFloat(long)},
        map: this.map,
        title: title
    });
    marker.addListener('click', function() {
        // panorama = map.getStreetView();
        // panorama.setPosition({lat: parseFloat(lat), lng: parseFloat(long)});
        // panorama.setVisible(true);
    });

    if(null == this.markerGroups[group]) {
        this.markerGroups[group] = new Array;
    }
    this.markerGroups[group].push(marker);
};

MapCommon.prototype.showMarkerGroup = function( group, key ){
    if(null != this.markerGroups[group]) {
        for(var i = 0; i < this.markerGroups[group].length; i++){
            var marker = this.markerGroups[group][i];
            if(null != marker){
                // console.log("showing marker"+i);

                var pinColor = "1abc9c";
                if(key == 1){
                    pinColor = "3F9ECF";
                }
                marker.setIcon("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor);
                marker.setMap(this.map);
            }
        }
    }
};

MapCommon.prototype.hideMarkerGroup = function( group ){
    if(null != this.markerGroups[group]) {
        for(var i = 0; i < this.markerGroups[group].length; i++){
            var marker = this.markerGroups[group][i];
            if(null != marker){
                marker.setMap(null);
            }
        }
    }
};

MapCommon.prototype.hoverOverMarker = function(markerID){
    var marker = this.mapMarkers[markerID];
    if(marker != undefined){
        marker.setIcon('media/sprites/sprite-hotspot-orange.png')
    }
}

MapCommon.prototype.hoverOutMarker = function(markerID){
    var marker = this.mapMarkers[markerID];
    var station = markerID.replace('Station ','');
    if(marker != undefined){
        if(parseInt(station) >=2 && parseInt(station) <=9) {
            marker.setIcon('media/sprites/sprite-hotspot-' + station + '.png')
        }
        else{
            marker.setIcon('media/sprites/sprite-hotspot-med.png')
        }
    }
}


MapCommon.prototype.getX = function(long){
    var x = this.width * ((this.westLong - long)/(this.westLong - this.eastLong));
    return x;
}

MapCommon.prototype.getY = function(lat){
    var y = this.height * ((this.northLat - lat)/(this.northLat - this.southLat));
    return y;
}