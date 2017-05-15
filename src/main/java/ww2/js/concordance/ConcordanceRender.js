function ConcordanceRender(){

}

ConcordanceRender.prototype.addConcordance = function(concordance, altMode){
    this.addToListView(concordance,altMode);
    this.addToTableView(concordance,altMode);
};

ConcordanceRender.prototype.buildLocation = function(token){
    var text = token.fullToken;
    var enamex = text.indexOf('<enamex', 0);
    var longStart = text.indexOf('long="', enamex) + 6;
    var longEnd = text.indexOf('"', longStart);
    var long = text.slice(longStart, longEnd);
    var latStart = text.indexOf('lat="', enamex) + 5;
    var latEnd = text.indexOf('"', latStart);
    var lat = text.slice(latStart, latEnd);

    return $('<div class="location" onclick="mapCommon.goto('+parseFloat(lat)+','+parseFloat(long)+')">'+token.word+'</div>')
};

ConcordanceRender.prototype.addToListView = function(concordance, altMode){
    var container = $("#leftScroll");


    // fetch tbody and row template
    var row = $('<div class="renderContainer"></div>');
    var con = $('<div class="concordance"></div>');
    var concString = "\"..."+concordance.concordanceStringLeading+ " <b>" + concordance.term + "</b> " +
        concordance.concordanceStringTrailing+"...\"";
    con.append(concString);
    con.append($('<a onclick="textRender.loadTextView(\''+concordance.UID+'\')">full text</a>'));
    var hl = $('<div class="hasLocation"></div>');
    if(concordance.hasLocation == false || concordance.hasLocation == "false") {
        hl.append("No Location");
    }
    else{
        if(altMode == true){
            row.addClass("renderAltType");
        }
        else{
            row.addClass("renderMainType");
        }
        for(var i = 0; i < concordance.concordance.length; i++){
            var token = concordance.concordance[i];
            if(token.xmlTag == "enamex"){
                hl.append(concordanceRender.buildLocation(token));
            }
        }
    }


    row.append(con);
    row.append(hl);
// clone row and insert into table
    container.append(row);
}

ConcordanceRender.prototype.addToTableView = function(concordance, altMode){
    var table = $('#concordanceTable');
    var tr = $('<tr></tr>');
    tr.append($('<td class="textRight">'+concordance.concordanceStringLeading+'</td>'));
    tr.append($('<td>'+concordance.term+'</td>'));
    tr.append($('<td>'+concordance.concordanceStringTrailing+'</td>'));
    table.append(tr);


};

ConcordanceRender.prototype.loadDetailPanel = function(useStopWords){
    $( function() {
        $( "#concordanceFrequencyContainer" ).tabs();
    } );
    var text = "";
    for(var i = 0; i < concordanceManager.mapConcordance.length; i++){
        var concordance = concordanceManager.mapConcordance[i];
        text += " "+concordance.concordanceStringLeading+ " " + concordance.term + " " +
            concordance.concordanceStringTrailing;
    }
    for(var i = 0; i < concordanceManager.mapAltConcordance.length; i++){
        var concordance = concordanceManager.mapAltConcordance[i];
        text += " "+concordance.concordanceStringLeading+ " " + concordance.term + " " +
            concordance.concordanceStringTrailing;
    }

    var stopWords = ["a","able","about","above","abst","accordance","according","accordingly","across","act","actually","added","adj","affected","affecting","affects","after","afterwards","again","against","ah","all","almost","alone","along","already","also","although","always","am","among","amongst","an","and","announce","another","any","anybody","anyhow","anymore","anyone","anything","anyway","anyways","anywhere","apparently","approximately","are","aren","arent","arise","around","as","aside","ask","asking","at","auth","available","away","awfully","b","back","be","became","because","become","becomes","becoming","been","before","beforehand","begin","beginning","beginnings","begins","behind","being","believe","below","beside","besides","between","beyond","biol","both","brief","briefly","but","by","c","ca","came","can","cannot","can't","cause","causes","certain","certainly","co","com","come","comes","contain","containing","contains","could","couldnt","d","date","did","didn't","different","do","does","doesn't","doing","done","don't","down","downwards","due","during","e","each","ed","edu","effect","eg","eight","eighty","either","else","elsewhere","end","ending","enough","especially","et","et-al","etc","even","ever","every","everybody","everyone","everything","everywhere","ex","except","f","far","few","ff","fifth","first","five","fix","followed","following","follows","for","former","formerly","forth","found","four","from","further","furthermore","g","gave","get","gets","getting","give","given","gives","giving","go","goes","gone","got","gotten","h","had","happens","hardly","has","hasn't","have","haven't","having","he","hed","hence","her","here","hereafter","hereby","herein","heres","hereupon","hers","herself","hes","hi","hid","him","himself","his","hither","home","how","howbeit","however","hundred","i","id","ie","if","i'll","im","immediate","immediately","importance","important","in","inc","indeed","index","information","instead","into","invention","inward","is","isn't","it","itd","it'll","its","itself","i've","j","just","k","keep","keeps","kept","kg","km","know","known","knows","l","largely","last","lately","later","latter","latterly","least","less","lest","let","lets","like","liked","likely","line","little","'ll","look","looking","looks","ltd","m","made","mainly","make","makes","many","may","maybe","me","mean","means","meantime","meanwhile","merely","mg","might","million","miss","ml","more","moreover","most","mostly","mr","mrs","much","mug","must","my","myself","n","na","name","namely","nay","nd","near","nearly","necessarily","necessary","need","needs","neither","never","nevertheless","new","next","nine","ninety","no","nobody","non","none","nonetheless","noone","nor","normally","nos","not","noted","nothing","now","nowhere","o","obtain","obtained","obviously","of","off","often","oh","ok","okay","old","omitted","on","once","one","ones","only","onto","or","ord","other","others","otherwise","ought","our","ours","ourselves","out","outside","over","overall","owing","own","p","page","pages","part","particular","particularly","past","per","perhaps","placed","please","plus","poorly","possible","possibly","potentially","pp","predominantly","present","previously","primarily","probably","promptly","proud","provides","put","q","que","quickly","quite","qv","r","ran","rather","rd","re","readily","really","recent","recently","ref","refs","regarding","regardless","regards","related","relatively","research","respectively","resulted","resulting","results","right","run","s","said","same","saw","say","saying","says","sec","section","see","seeing","seem","seemed","seeming","seems","seen","self","selves","sent","seven","several","shall","she","shed","she'll","shes","should","shouldn't","show","showed","shown","showns","shows","significant","significantly","similar","similarly","since","six","slightly","so","some","somebody","somehow","someone","somethan","something","sometime","sometimes","somewhat","somewhere","soon","sorry","specifically","specified","specify","specifying","still","stop","strongly","sub","substantially","successfully","such","sufficiently","suggest","sup","sure	t","take","taken","taking","tell","tends","th","than","thank","thanks","thanx","that","that'll","thats","that've","the","their","theirs","them","themselves","then","thence","there","thereafter","thereby","thered","therefore","therein","there'll","thereof","therere","theres","thereto","thereupon","there've","these","they","theyd","they'll","theyre","they've","think","this","those","thou","though","thoughh","thousand","throug","through","throughout","thru","thus","til","tip","to","together","too","took","toward","towards","tried","tries","truly","try","trying","ts","twice","two","u","un","under","unfortunately","unless","unlike","unlikely","until","unto","up","upon","ups","us","use","used","useful","usefully","usefulness","uses","using","usually","v","value","various","'ve","very","via","viz","vol","vols","vs","w","want","wants","was","wasnt","way","we","wed","welcome","we'll","went","were","werent","we've","what","whatever","what'll","whats","when","whence","whenever","where","whereafter","whereas","whereby","wherein","wheres","whereupon","wherever","whether","which","while","whim","whither","who","whod","whoever","whole","who'll","whom","whomever","whos","whose","why","widely","willing","wish","with","within","without","wont","words","world","would","wouldnt","www","x","y","yes","yet","you","youd","you'll","your","youre","yours","yourself","yourselves","you've","z","zero"];
    var noPuncText = text.replace(/,/g,"").replace(/\./g,"");//.replace(/;/g,"");
    // console.log(noPuncText);
    var splitText = noPuncText.split(" ");
    var words = new Array;
    // console.log(splitText);
    for(var i=0; i < splitText.length; i++){
        var word = splitText[i];
        if(word == "" || word == " "){
            continue;
        }
        else if (stopWords.indexOf(word.toLowerCase())==-1 || useStopWords == false){
            if(words[word.toLowerCase()]== null || words[word.toLowerCase()]== undefined){
                words[word.toLowerCase()] = 1;
            }
            else{
                words[word.toLowerCase()]++;
            }
        }
    }
    // console.log(words);
    var groups = [];
    for(var key in words){
        var group = {}
        group.label = key + ":" + words[key];
        group.weight = words[key];
        groups.push(group);
    }

    groups.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
    // console.log(groups);
    $( "#concordanceFrequencyContainer" ).on( "tabsactivate", function( event, ui )// {} );
        //window.addEventListener("load", function()
    {
        if (ui.newPanel.is("#concordancFoamTreeTab")) {
    //         console.log(event, ui);
            $("#concordanceFoamTree").empty();
            if(this.foamtree != undefined){
                this.foamtree.dispose();
            }
            this.foamtree = new CarrotSearchFoamTree({
                id: "concordanceFoamTree",
                dataObject: {
                    groups: groups.slice(0, 50)
                }
            });
        }
    });
    var table = $('#concordanceFrequencyTable');
    for(var key in words){
        var tr = $('<tr></tr>');
        tr.append($('<td>'+key+'</td>'));
        tr.append($('<td>'+words[key]+'</td>'));
        table.append(tr);
    }
}

