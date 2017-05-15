function StationRender(){

}

StationRender.prototype.loadList = function () {
    var list = $('#stationList');
    list.empty();
    for(var key in stationManager.mapStationsInstances){
        var instance = stationManager.mapStationsInstances[key];
        var container = $('<div class="stationContainer" onclick="mainNavigator.loadStation('+instance.source[0]+')" ' +
            'onmouseover="mainNavigator.overMarker('+instance.source[0]+');" ' +
            'onmouseout="mainNavigator.outMarker('+instance.source[0]+')"></div>');
        var left = $('<img style="display:inline-block;     vertical-align: bottom;padding-right: 5px;" src="'+mapCommon.getImageAtStation(instance.source[0])+'">');
        var right = $('<div style="display:inline-block"></div>')
        var header = $('<h2>Station '+instance.source[0]+'</h2>');
        var detail1 = $('<div>Latitude: '+instance.source[1]+'<br> Longitude: '+instance.source[2]+'</div>');

        right.append(header);
        right.append(detail1);
        container.append(left);
        container.append(right);
        list.append(container);
    }
};