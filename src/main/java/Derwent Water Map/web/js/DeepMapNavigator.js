function DeepMapNavigator(){

}

DeepMapNavigator.prototype.toggleDualTimeline = function(){
    var enabled = $('#checkDualTimeline').is(':checked');
    if(enabled == false){
        $('#dualTimeline').hide();
        literaryManager.timeline = new Array;
    }
    else {
        if(null == dualTimelineCommons) {
            dualTimelineCommons = new DualTimelineCommons();
        }
        else{
            $('#dualTimeline').show();
        }
    }
};

DeepMapNavigator.prototype.toggleHistoricMap = function(){
    var enabled = $('#checkHistoricMap').is(':checked');
    if(enabled == false){
        $('#map').show();
        $('#histMap').hide();
    }
    else {
        $('#map').hide();
        $('#histMap').show();

        var panzoom = $("#histMapContainer").panzoom({
            // cursor: 'default',
            contain: "invert",
            increment: 0.3,
            minScale: 1,
            maxScale: 10,
            rangeStep: 2,
            transition: true,
            duration: 200,
            easing: "ease-in-out",
            // focal: {
            //     clientX: 108,
            //     clientY: 132
            // },
            onZoom: function( e, panzoom, scale ) {
                console.log('zoom',scale);
                    $('.histMarker img').css('width',36/scale+'px');
                    $('.histMarker img').css('height',35/scale+'px');
                }
        });
        panzoom.parent().on('mousewheel.focal', function( e ) {
            contain: "invert",
                e.preventDefault();
            var delta = e.delta || e.originalEvent.wheelDelta;
            var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
            panzoom.panzoom('zoom', zoomOut, {
                increment: 0.3,
                minScale: 1,
                maxScale: 10,
            });
        });

        var map = $('#histMapContainer');

        // $('#histMap').append(map);
    }
};

DeepMapNavigator.prototype.toggleMarkersFor = function(UID){
    var enabled = $('#check_'+UID).is(':checked');
    if(enabled == true){
        console.log("showing marker group");
        mapCommons.showMarkerGroup(UID);
        historicMapCommons.showMarkerGroup(UID);
    }
    else{
        console.log("hiding marker group");
        mapCommons.hideMarkerGroup(UID);
        historicMapCommons.hideMarkerGroup(UID);

    }
};