function HistoricMapCommons(){
    this.markerGroups = new Array;

}

var HIST_LEFT_OFF = 426/11283 ;
var HIST_TOP_OFF = 454/7710;
var HIST_GEO_DEM_WIDTH = (11283 - (426+393))/11283;
var HIST_GEO_DEM_HEIGHT = (7710 - (454+281))/7710;
var HIST_LEFT_LONG = -3.81667;
var HIST_TOP_LAT = 54.81667;
var HIST_RIGHT_LONG = -2.9333;
var HIST_BOTTOM_LAT = 54.4833;

HistoricMapCommons.prototype.init = function(){
};

HistoricMapCommons.prototype.addMarkerToGroup = function(title,lat,long,group){
    if((HIST_TOP_LAT > lat && lat > HIST_BOTTOM_LAT)||(HIST_BOTTOM_LAT > lat && lat > HIST_TOP_LAT)) {
        if((HIST_LEFT_LONG > long && long > HIST_RIGHT_LONG)||(HIST_RIGHT_LONG > long && long > HIST_LEFT_LONG)) {
            var container = $('#histMapContainer');
            var image = $('#histMapImage');
            var marker = $('<div class="' + group + ' histMarker"><img src="media/sprites/sprite-hotspot-med.png"/></div>');
            marker.css('left', (HIST_LEFT_OFF * image.width()) + (((parseFloat(long) - HIST_LEFT_LONG) / (HIST_LEFT_LONG - HIST_RIGHT_LONG))* -1* image.width() * HIST_GEO_DEM_WIDTH) + '%');
            marker.css('top', (HIST_TOP_OFF * image.height()) + (((parseFloat(lat) - HIST_TOP_LAT) / (HIST_TOP_LAT - HIST_BOTTOM_LAT))* -1* image.height() * HIST_GEO_DEM_HEIGHT) + '%');

            // console.log(marker);
            container.append(marker);

            if (null == this.markerGroups[group]) {
                this.markerGroups[group] = new Array;
            }
            this.markerGroups[group].push(marker);
        }
    }
};

HistoricMapCommons.prototype.showMarkerGroup = function( group, key ){
    $('.'+group).show();
    // if(null != mapCommons.markerGroups[group]) {
    //     for(var i = 0; i < mapCommons.markerGroups[group].length; i++){
    //         var marker = mapCommons.markerGroups[group][i];
    //         if(null != marker){
    //             // console.log("showing marker"+i);
    //
    //             var pinColor = "1abc9c";
    //             if(key == 1){
    //                 pinColor = "3F9ECF";
    //             }
    //             // var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
    //             //     new google.maps.Size(21, 34),
    //             //     new google.maps.Point(0,0),
    //             //     new google.maps.Point(10, 34));
    //             //marker.setIcon("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor);
    //             marker.setMap(mapCommons.map);
    //         }
    //     }
    // }
};

HistoricMapCommons.prototype.hideMarkerGroup = function( group ){
    $('.'+group).hide();
    // if(null != mapCommons.markerGroups[group]) {
    //     for(var i = 0; i < mapCommons.markerGroups[group].length; i++){
    //         var marker = mapCommons.markerGroups[group][i];
    //         if(null != marker){
    //             marker.setMap(null);
    //         }
    //     }
    // }
};