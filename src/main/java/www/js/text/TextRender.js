function TextRender(){

}

TextRender.prototype.loadList = function () {
    var list = $('#textList');
    list.empty();
    for(var key in textManager.mapTextMetaInstances){
        var instance = textManager.mapTextMetaInstances[key];
        var container = $('<div class="textContainer" onclick="mainNavigator.loadAdvancedText('+instance.source[0]+')"></div>');
        var header = $('<h2>'+instance.source[3]+'</h2>');
        var detail1 = $('<div>Author: '+instance.source[5]+'</div>');
        var detail2 = $('<div>Published: '+instance.source[6]+'</div>');

        container.append(header);
        container.append(detail1);
        container.append(detail2);
        list.append(container);
    }
};