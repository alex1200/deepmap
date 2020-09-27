function MapCommons(){
    this.map;
    this.markerGroups = new Array;
}

MapCommons.prototype.init = function(){
    var myLatLng = {lat: 54.54, lng: -3.09};

    this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        center: myLatLng
    });
};

MapCommons.prototype.addMarker = function(title, lat, long){
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
};

MapCommons.prototype.addMarkerToGroup = function(title, lat, long, group){
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

MapCommons.prototype.showMarkerGroup = function( group, key ){
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

MapCommons.prototype.hideMarkerGroup = function( group ){
    if(null != this.markerGroups[group]) {
        for(var i = 0; i < this.markerGroups[group].length; i++){
            var marker = this.markerGroups[group][i];
            if(null != marker){
                marker.setMap(null);
            }
        }
    }
};