function TextRender(){

}

TextRender.prototype.loadTextView = function (concordanceUID) {
    $('#textDetailPanel').show();
    var concordance = concordanceManager.getInstance(concordanceUID);
    console.log(concordance);
    var textInstance = textManager.getInstance(concordance.parentUID);
    textInstance.getText(concordanceUID, this.loadTextCallback);
};

TextRender.prototype.loadTextCallback = function(concordanceUID, textResonse){
    var concordance = concordanceManager.getInstance(concordanceUID);
    console.log(concordance);
    var textInstance = textManager.getInstance(concordance.parentUID);
    var rawText = textResonse.text;
    var meta = textInstance.source;

    rawText = textRender.replaceEnamex(rawText);
    var textDiv = $('#textDetail');
    textDiv.empty();
    textDiv.html(rawText);

    var metaTable = $('#textMetaTable');
    for(var key in meta){
        var tr = $('<tr></tr>');
        tr.append($('<td>'+key+'</td>'));
        tr.append($('<td>'+meta[key]+'</td>'));
        metaTable.append(tr);
    }
};

TextRender.prototype.replaceEnamex = function(text){
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