function TextLoader(){

}

TextLoader.prototype.load = function(start, end){
    var xhttp;
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else {    // IE 5/6
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.overrideMimeType('text/xml');

    xhttp.open("GET", "resources/West_cqp_17.xml", false);
    xhttp.send(null);
    var xmlDoc = xhttp.responseXML;
    // console.log(xmlDoc);

    var sentences = xmlDoc.getElementsByTagName("s");
    var text = '';
    for(var i = 0; i < sentences.length; i++){
        var tag = sentences[i];
        var id = tag.getAttribute('id');
        // console.log(start,end);
        for(var j = start; j <= end; j++){
            if(id == 's'+j){
                // console.log(tag);
                text += tag.innerHTML;
            }
        }
        // if(id == 's318' || id == 's319' || id == 's320' || id == 's321' || id == 's322'
        //     || id == 's323' || id == 's324' || id == 's325' || id == 's326'){
        //
        // }
    }
    console.log(text);
    return text;
};
