(function(){
    webService = new WebService();
})();

function WebService(){
    this.host = "http://scc-reinhola.lancs.ac.uk:8182/";
    this.JSON = ".json";
}

WebService.prototype.getStations = function(callback){
    var url = webService.buildURL("crosthwaite/stations",webService.JSON);
    webService.get(url,callback);
};

WebService.prototype.getTextMeta = function( callback){
    var url = webService.buildURL("crosthwaite/text", webService.JSON);
    webService.get(url,callback);
};

WebService.prototype.getText = function(textUID, callback){
    var url = webService.buildURL("crosthwaite/text/"+textUID, webService.JSON);
    webService.get(url,callback);
};

WebService.prototype.getStationText = function(stationUID, callback){
    var url = webService.buildURL("crosthwaite/station/"+stationUID+"/text",webService.JSON);
    webService.get(url,callback);
};

WebService.prototype.getStationTextDetail = function(textUID, start, end , callback){
    var url = webService.buildURL("crosthwaite/text/"+textUID+"/"+start+"/"+end+"/text",webService.JSON);
    webService.get(url,callback);
};

WebService.prototype.buildURL = function(path, ext){
    var url = webService.host + path + ext;
    return url;
};

WebService.prototype.get = function(url, callback){
    $.get(url, function(response) {
        //console.log(response);
        var jsonResults = JSON.parse(response);
        callback(jsonResults);
    }).fail(function(){
        console.log("Error with GET for: " + url);
    });
};

WebService.prototype.post = function(url, post, callback)
{
    var jsonPost = JSON.stringify(post);
    //console.log(url,jsonPost);
    $.post(url,jsonPost,function(response)
    {
        //console.log(response);
        callback(response);
    }).fail(function(){
        console.log("Error with POST for: " + url);
    });
};