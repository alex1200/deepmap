function LocationRender(){

}

LocationRender.prototype.addConcordance = function(concordance, altMode){
    this.addToListView(concordance,altMode);
    // this.addToTableView(concordance,altMode);
};

LocationRender.prototype.buildLocation = function(media){
    var long = media.lng;
    var lat = media.lat;

    return '<p class="location" onclick="mapCommon.goto('+parseFloat(lat).toFixed(2)+','+parseFloat(long).toFixed(2)+')">'+ parseFloat(lat).toFixed(2) + ", " + parseFloat(long).toFixed(2)+'</p>';
};

LocationRender.prototype.addToListView = function(media, altMode){
    var container = $("#leftScroll");


    // fetch tbody and row template
    var row = $('<div class="renderContainer"></div>');
    var con = $('<div class="concordance"></div>');
    var concString = '<div class="concordanceInnerDiv"><h3>' + media.title + "</h3>";
    if(media.description != undefined) {
        concString += '<p>' + media.description + '</p>';
    }
    concString += '<div class="source"><img src="'+webService.getIcon(media.source)+'"/>'+media.sourceProvider+'</div>';
    concString += '<a class="sourceLink" href="'+media.sourceURI+'" target="_blank">go to website</a>';
    con.append($('<img src="'+media.url+'" width="75px"/>'));

    var hl = '<div class="hasLocation">';
    if(media.lat == 0 && media.lng == 0) {
        hl+="No Location";
    }
    else{
        if(altMode == true){
            row.addClass("renderAltType");
        }
        else{
            row.addClass("renderMainType");
        }
        hl += locationRender.buildLocation(media);
    }
    hl += '</div>';

    concString += hl;
    concString += "</div>";
    con.append(concString);
    row.append(con);
// clone row and insert into table
    container.append(row);
};

// LocationRender.prototype.addToTableView = function(media){
//     var table = $('#concordanceTable');
//     var tr = $('<tr></tr>');
//     tr.append($('<td class="textRight">'+concordance.concordanceStringLeading+'</td>'));
//     tr.append($('<td>'+concordance.term+'</td>'));
//     tr.append($('<td>'+concordance.concordanceStringTrailing+'</td>'));
//     table.append(tr);
//
//
// };