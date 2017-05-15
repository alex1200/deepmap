function NLPManager(){
    this.mapInstances = new Array;

}

NLPManager.prototype.postText = function(){
    var self = this;
    var text = $("#input").val();
    console.log(text);
    var div = $('#locTable');
    div.append($('<progress></progress>'));
    webService.postNLPText(text, function(jsonResults){
        if(jsonResults.status == "SUCCESS"){
            console.log(jsonResults);
            var listSources = jsonResults.text;
            div.empty();
            var i = 0;
            for(var key in listSources.locations){
                var data = listSources.locations[key];
                div.append($('<div class="locHeading">'+key+'</div>'));
                var table = $('<table class="subLocTable"></table>');
                for(var datakey in data) {
                    var match = data[datakey];
                    if (i == 0) {
                        var row = $('<tr></tr>');
                        for (var inKey in match) {
                            row.append($('<th>' + inKey + '</th>'))
                        }
                        table.append(row);
                    }
                    i++;
                    var row = $('<tr></tr>');
                    for (var inKey in match) {
                        row.append($('<td>' + match[inKey] + '</td>'))
                    }
                    table.append(row);
                }
                div.append(table);
            }

        }
    })
};

NLPManager.prototype.getInstance = function(UID){
    var instance = this.mapGeoparseInstances[UID];
    if(null != instance && instance != undefined){
        return instance;
    }
};