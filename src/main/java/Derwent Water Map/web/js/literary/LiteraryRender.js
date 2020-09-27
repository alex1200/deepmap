function LiteraryRender(){

}

LiteraryRender.prototype.loadList = function(){
    var container = $('#literaryList');
    for(var key in literaryManager.mapLiteraryInstances){
        var instance = literaryManager.mapLiteraryInstances[key];
        if(null != instance){
            container.append(this.buildListRender(instance));
        }
    }
};

LiteraryRender.prototype.buildListRender = function(instance){
    var render = $('<div class="listRender"></div>');
    render.append($('<input id="check_'+instance.source[0]+'" type="checkbox" checked onclick="deepMapNavigator.toggleMarkersFor(\''+instance.source[0]+'\')">' +
        '<label for="check_'+instance.source[1]+'">Show on map</label>'));
    render.append($('<div><span class="listLabel">Title:</span>'+instance.source[1]+'</div>'));
    render.append($('<div><span class="listLabel">Author:</span>'+instance.source[2]+'</div>'));
    render.append($('<div><span class="listLabel">Description:</span>'+instance.source[3]+'</div>'));
    render.append($('<div><span class="listLabel">Time Range:</span>'+instance.source[4]+'-'+instance.source[5]+'</div>'));
    return render;
};
