function WWMapCommon(){
    this.width = 1000;//2480;
    this.height = 700;//1332;
    this.westLong = -3.18615287119;
    this.eastLong = -3.11426333743;
    this.northLat = 54.62092662510;
    this.southLat = 54.53912329273;

    this.wwd;

    this.markerGroups = new Array;
    this.layers = new Array;

    this.placemarkAttributes  = new WorldWind.PlacemarkAttributes(null);
    this.placemarkAttributes.imageScale = 1;
    this.placemarkAttributes.imageOffset = new WorldWind.Offset(
        WorldWind.OFFSET_FRACTION, 0.3,
        WorldWind.OFFSET_FRACTION, 0.0);
    this.placemarkAttributes.imageColor = WorldWind.Color.WHITE;
    this.placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
        WorldWind.OFFSET_FRACTION, 0.5,
        WorldWind.OFFSET_FRACTION, 1.0);
    this.placemarkAttributes.labelAttributes.color = WorldWind.Color.YELLOW;
    this.placemarkAttributes.drawLeaderLine = true;
    this.placemarkAttributes.leaderLineAttributes.outlineColor = WorldWind.Color.RED;

    this.placemarkLayer = new WorldWind.RenderableLayer("Placemarks")
}

WWMapCommon.prototype.init = function(){
    var myLatLng = {lat: 54.583333, lng: -3.15};

    // Create a World Window for the canvas.
    wwd = new WorldWind.WorldWindow("canvasOne");

    // Add some image layers to the World Window's globe.
    wwd.addLayer(new WorldWind.BMNGOneImageLayer());
    wwd.addLayer(new WorldWind.BingAerialWithLabelsLayer());

    // Add a compass, a coordinates display and some view controls to the World Window.
    wwd.addLayer(new WorldWind.CompassLayer());
    wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
    wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));

    // Adjust the Navigator to place Alaska in the center of the
// World Window.
    wwd.navigator.lookAtLocation.latitude = 54.583333;
    wwd.navigator.lookAtLocation.longitude = -3.15;
    wwd.navigator.range = 1e4; // 1 million meters above the ellipsoid

// Redraw the World Window.
    wwd.redraw();
};

WWMapCommon.prototype.loadKMZ = function(layerName, path){
    var ctaLayer = new google.maps.KmlLayer({
        url: path,
        map: mapCommon.map
    });
    ctaLayer.setMap(this.map);
    console.log("Added Layer");

    this.layers[layerName] = ctaLayer;
};

WWMapCommon.prototype.addMarker = function(title, lat, long){
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

    // Create the placemark and its label.
    placemark = new WorldWind.Placemark(new WorldWind.Position(parseFloat(lat), parseFloat(long), 1e2), true, null);
    placemark.label = title
        + "Lat " + placemark.position.latitude.toPrecision(4).toString() + "\n"
        + "Lon " + placemark.position.longitude.toPrecision(5).toString();
    placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;

    // Create the placemark attributes for this placemark. Note that the attributes differ only by their
    // image URL.
    placemarkAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
    // placemarkAttributes.imageSource = pinLibrary + images[i];
    placemark.attributes = placemarkAttributes;

    // Create the highlight attributes for this placemark. Note that the normal attributes are specified as
    // the default highlight attributes so that all properties are identical except the image scale. You could
    // instead vary the color, image, or other property to control the highlight representation.
    highlightAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
    highlightAttributes.imageScale = 1.2;
    placemark.highlightAttributes = highlightAttributes;

    // Add the placemark to the layer.
    placemarkLayer.addRenderable(placemark);
};

WWMapCommon.prototype.addMarkerToGroup = function(title, lat, long, group){
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

WWMapCommon.prototype.showMarkerGroup = function( group, key ){
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

WWMapCommon.prototype.hideMarkerGroup = function( group ){
    if(null != this.markerGroups[group]) {
        for(var i = 0; i < this.markerGroups[group].length; i++){
            var marker = this.markerGroups[group][i];
            if(null != marker){
                marker.setMap(null);
            }
        }
    }
};

WWMapCommon.prototype.getX = function(long){
    var x = this.width * ((this.westLong - long)/(this.westLong - this.eastLong));
    return x;
}

WWMapCommon.prototype.getY = function(lat){
    var y = this.height * ((this.northLat - lat)/(this.northLat - this.southLat));
    return y;
}