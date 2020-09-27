(function(){
    webService = new WebService();
})();

function WebService(){
    //this.host = "http://ec2-54-187-57-46.us-west-2.compute.amazonaws.com/";
    this.host = "http://localhost:8182/";
    this.JSON = ".json";
}

WebService.prototype.getLiterarySources = function(callback){
    var url = webService.buildURL("literary",webService.JSON);
    webService.get(url,callback);
};

WebService.prototype.getLiteraryLocations = function(litUID, callback){
    var url = webService.buildURL("literary/"+litUID+"/locations", webService.JSON);
    webService.get(url,callback);
};

WebService.prototype.getPlacenames = function(litUID, callback){
    var url = webService.buildURL("literary/"+litUID+"/placenames",webService.JSON);
    webService.get(url,callback);
};

WebService.prototype.getPlaces = function(litUID, plnUID, callback){
    var url = webService.buildURL("literary/"+litUID+"/placenames/"+plnUID+"/places", webService.JSON);
    webService.get(url,callback);
};

WebService.prototype.postNLPText = function(text, callback){
    var url = webService.buildURL("nlp/parse", webService.JSON);
    webService.post(url,{text:text}, callback);
};

WebService.prototype.getGazetteers = function(callback){
    var url = webService.buildURL("nlp/gazetteers", webService.JSON);
    webService.get(url,callback);
};

WebService.prototype.buildURL = function(path, ext){
    var url = webService.host + path + ext;
    return url;
};

WebService.prototype.getSurvey = function(page, callback){
    console.log("getSurvey");
    var url = webService.buildURL("survey/questions/"+page, webService.JSON);
    webService.get(url, callback);
};

WebService.prototype.postSurvey = function(question, answer, callback){
    var url = webService.buildURL("survey/answer", webService.JSON);
    webService.post(url,{question:question,answer:answer}, callback);
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
        var jsonResults = JSON.parse(response);
        //console.log(response);
        callback(jsonResults);
    }).fail(function(){
        console.log("Error with POST for: " + url);
    });
};