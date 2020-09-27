(function(){
    webService = new WebService();
})();

function WebService(){
    this.host = "http://localhost:8182/";
    this.JSON = ".json";
}

WebService.prototype.postSearch = function(search, callback){
    var url = webService.buildURL("explorer/search",webService.JSON);
    webService.post(url,search, callback);
};

// WebService.prototype.getStations = function(callback){
//     var url = webService.buildURL("crosthwaite/stations",webService.JSON);
//     webService.get(url,callback);
// };

WebService.prototype.getTextMeta = function( callback){
    var url = webService.buildURL("explorer/textmeta", webService.JSON);
    webService.get(url,callback);
};

WebService.prototype.getText = function(textUID, callback){
    var url = webService.buildURL("explorer/"+textUID+"/text", webService.JSON);
    webService.get(url,callback);
};

WebService.prototype.postLocationSearch = function(search, callback){
    var url = webService.buildURL("explorer/search/location",webService.JSON);
    webService.post(url,search, callback);
};

// WebService.prototype.getStationText = function(stationUID, callback){
//     var url = webService.buildURL("crosthwaite/station/"+stationUID+"/text",webService.JSON);
//     webService.get(url,callback);
// };

// WebService.prototype.getStationTextDetail = function(textUID, start, end , callback){
//     var url = webService.buildURL("crosthwaite/text/"+textUID+"/"+start+"/"+end+"/text",webService.JSON);
//     webService.get(url,callback);
// };
WebService.prototype.getSurvey = function(page, callback){
    console.log("getSurvey");
    var url = webService.buildURL("survey/questions/"+page, webService.JSON);
    webService.get(url, callback);
};

WebService.prototype.postSurvey = function(question, answer, user, callback){
    var url = webService.buildURL("survey/answer", webService.JSON);
    webService.post(url,{question:question,answer:answer,user:user}, callback);
};

WebService.prototype.postSurveyUser = function(user, type, callback){
    var url = webService.buildURL("survey/user", webService.JSON);
    webService.post(url,{user:user,type:type}, callback);
};

WebService.prototype.getIcon = function(source){
    var url = webService.buildURL("explorer/media/icon/"+source,".png");
    return url;
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
        var jsonResults = JSON.parse(response);
        callback(jsonResults);
    }).fail(function(){
        console.log("Error with POST for: " + url);
    });
};