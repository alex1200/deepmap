function GazetteerManager(){
    this.mapInstances = new Array;

}

GazetteerManager.prototype.init = function(){
    var self = this;
    var div = $('#gazetteerList');

    webService.getGazetteers(function(jsonResults){
            console.log(jsonResults);
            var listSources = jsonResults;
            div.empty();
            var count = 0;
            var table = $('<table id="gazetteerTable"></table>');
            for(var i = 0; i < listSources.length; i++){
                var gazetteer = listSources[i];
                var header = $('<tr></tr>');
                var row = $('<tr></tr>');

                header.append($('<th></th>'));
                row.append($('<td><input type="checkbox" checked id="checkbox_'+gazetteer.uid+'"></td>'));

                if (count == 0) {
                    header.append($('<th>Gazetteer Name</th>'));
                    // header.append($('<th>Filepath</th>'));
                    header.append($('<th>Location Column</th>'));
                    header.append($('<th>Latitude Column</th>'));
                    header.append($('<th>LongitudeColumn</th>'));
                    header.append($('<th>Line Delimiter</th>'));
                    header.append($('<th>Column Delimiter</th>'));
                }
                row.append($('<td>' + gazetteer.gazetteerName + '</td>'));
                // row.append($('<td>' + gazetteer.filepath + '</td>'));
                row.append($('<td>' + gazetteer.locationName + '</td>'));
                row.append($('<td>' + gazetteer.latColumn + '</td>'));
                row.append($('<td>' + gazetteer.longColumn + '</td>'));
                row.append($('<td>' + gazetteer.lineDelimiter + '</td>'));
                row.append($('<td>' + gazetteer.columnDelimiter + '</td>'));


                if (count == 0) {
                    table.append(header);
                }
                count++;
                table.append(row);
            }
            div.append(table);
    })
};

GazetteerManager.prototype.getInstance = function(UID){
    var instance = this.mapInstances[UID];
    if(null != instance && instance != undefined){
        return instance;
    }
};