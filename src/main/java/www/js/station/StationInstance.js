function StationInstance(){
    this.source = new Array;
    this.arrayStationText = new Array;
    this.mapGeoparseInstances = new Array;
}

StationInstance.prototype.init = function(inSource){
    this.source = inSource;
    this.loadStationText();
    // this.loadPlacenames();
    mapCommon.addMarker("Station "+this.source[0],this.source[1],this.source[2],this.source[3],this.source[4]);
    // var pt = new Point(this.source[1],this.source[2],arcmap.spatialReference)
    // arcmap.graphics.add(new Graphic(pt, markerSymbol));
};

StationInstance.prototype.update = function(source){
    this.source = source;
};

StationInstance.prototype.loadStationText = function(){
    var self = this;
    webService.getStationText(self.source[0], function(results){
        if(results.status == "SUCCESS"){
            self.arrayStationText = results.list;
            for(var i = 0; i < self.arrayStationText.length; i++){
                var record = self.arrayStationText[i];
                var textInstance = textManager.getInstance(record[2]);
                textInstance.addStation(record);
                self.loadStationTextDetail(record,i,self);
            }
        }
    });
};

StationInstance.prototype.loadStationTextDetail = function(record,i,self){
    //var self = this;
    webService.getStationTextDetail(record[2],record[3],record[4], function(text){
        // console.log(text);
        if(text.status == "SUCCESS"){
            self.arrayStationText[i].text = text.text;
        }
    });
};

StationInstance.prototype.loadPanoDetails = function(){

    var list = $('<ul id="textTabs"></ul>');
    var totalText = "";
    var tabContent ="";
    for(var i = 0; i < this.arrayStationText.length; i++){
        var instance = this.arrayStationText[i];
        var textInstance = textManager.getInstance(instance[2]);
// console.log(textInstance);
        list.append($('<li><a href="#tabs-'+i+'">'+textInstance.source[6]+'</a></li>'));
        tabContent += '<div id="tabs-'+i+'" class="tabContent">' +
            '<h2>'+textInstance.source[3]+'</h2>' +
            '<p>Author: '+textInstance.source[5]+'</p>' +
            '<p><a onclick="mainNavigator.loadText('+textInstance.source[0]+')">see full text</a></p>' +
            '<p>'+instance.text+'</p></div>';
        totalText += instance.text;

    }
    list.append($('<li><a href="#tabs-foam">FoamTree</a></li>'));

    tabContent += '<div id="tabs-foam" class="tabContent"><div id="foamIntro">This <i>foam tree</i> shows the top 50 most used terms ' +
        'used in the text about this station.</div><div id="visualization"></div></div>';
    // list.append(tabs);
    if($("#text").tabs()) {
        $("#text").tabs("destroy");
    }
    $('#text').empty();
    $('#text').show();
    $('#text').append(list);
    $('#text').append(tabContent);
    $( function() {
        $( "#text" ).tabs();
    } );

    this.loadFoamTree(totalText);
};

StationInstance.prototype.loadFoamTree = function(text){
    // console.log(text);
    var stopWords = ["a","able","about","above","abst","accordance","according","accordingly","across","act","actually","added","adj","affected","affecting","affects","after","afterwards","again","against","ah","all","almost","alone","along","already","also","although","always","am","among","amongst","an","and","announce","another","any","anybody","anyhow","anymore","anyone","anything","anyway","anyways","anywhere","apparently","approximately","are","aren","arent","arise","around","as","aside","ask","asking","at","auth","available","away","awfully","b","back","be","became","because","become","becomes","becoming","been","before","beforehand","begin","beginning","beginnings","begins","behind","being","believe","below","beside","besides","between","beyond","biol","both","brief","briefly","but","by","c","ca","came","can","cannot","can't","cause","causes","certain","certainly","co","com","come","comes","contain","containing","contains","could","couldnt","d","date","did","didn't","different","do","does","doesn't","doing","done","don't","down","downwards","due","during","e","each","ed","edu","effect","eg","eight","eighty","either","else","elsewhere","end","ending","enough","especially","et","et-al","etc","even","ever","every","everybody","everyone","everything","everywhere","ex","except","f","far","few","ff","fifth","first","five","fix","followed","following","follows","for","former","formerly","forth","found","four","from","further","furthermore","g","gave","get","gets","getting","give","given","gives","giving","go","goes","gone","got","gotten","h","had","happens","hardly","has","hasn't","have","haven't","having","he","hed","hence","her","here","hereafter","hereby","herein","heres","hereupon","hers","herself","hes","hi","hid","him","himself","his","hither","home","how","howbeit","however","hundred","i","id","ie","if","i'll","im","immediate","immediately","importance","important","in","inc","indeed","index","information","instead","into","invention","inward","is","isn't","it","itd","it'll","its","itself","i've","j","just","k","keep","keeps","kept","kg","km","know","known","knows","l","largely","last","lately","later","latter","latterly","least","less","lest","let","lets","like","liked","likely","line","little","'ll","look","looking","looks","ltd","m","made","mainly","make","makes","many","may","maybe","me","mean","means","meantime","meanwhile","merely","mg","might","million","miss","ml","more","moreover","most","mostly","mr","mrs","much","mug","must","my","myself","n","na","name","namely","nay","nd","near","nearly","necessarily","necessary","need","needs","neither","never","nevertheless","new","next","nine","ninety","no","nobody","non","none","nonetheless","noone","nor","normally","nos","not","noted","nothing","now","nowhere","o","obtain","obtained","obviously","of","off","often","oh","ok","okay","old","omitted","on","once","one","ones","only","onto","or","ord","other","others","otherwise","ought","our","ours","ourselves","out","outside","over","overall","owing","own","p","page","pages","part","particular","particularly","past","per","perhaps","placed","please","plus","poorly","possible","possibly","potentially","pp","predominantly","present","previously","primarily","probably","promptly","proud","provides","put","q","que","quickly","quite","qv","r","ran","rather","rd","re","readily","really","recent","recently","ref","refs","regarding","regardless","regards","related","relatively","research","respectively","resulted","resulting","results","right","run","s","said","same","saw","say","saying","says","sec","section","see","seeing","seem","seemed","seeming","seems","seen","self","selves","sent","seven","several","shall","she","shed","she'll","shes","should","shouldn't","show","showed","shown","showns","shows","significant","significantly","similar","similarly","since","six","slightly","so","some","somebody","somehow","someone","somethan","something","sometime","sometimes","somewhat","somewhere","soon","sorry","specifically","specified","specify","specifying","still","stop","strongly","sub","substantially","successfully","such","sufficiently","suggest","sup","sure	t","take","taken","taking","tell","tends","th","than","thank","thanks","thanx","that","that'll","thats","that've","the","their","theirs","them","themselves","then","thence","there","thereafter","thereby","thered","therefore","therein","there'll","thereof","therere","theres","thereto","thereupon","there've","these","they","theyd","they'll","theyre","they've","think","this","those","thou","though","thoughh","thousand","throug","through","throughout","thru","thus","til","tip","to","together","too","took","toward","towards","tried","tries","truly","try","trying","ts","twice","two","u","un","under","unfortunately","unless","unlike","unlikely","until","unto","up","upon","ups","us","use","used","useful","usefully","usefulness","uses","using","usually","v","value","various","'ve","very","via","viz","vol","vols","vs","w","want","wants","was","wasnt","way","we","wed","welcome","we'll","went","were","werent","we've","what","whatever","what'll","whats","when","whence","whenever","where","whereafter","whereas","whereby","wherein","wheres","whereupon","wherever","whether","which","while","whim","whither","who","whod","whoever","whole","who'll","whom","whomever","whos","whose","why","widely","willing","wish","with","within","without","wont","words","world","would","wouldnt","www","x","y","yes","yet","you","youd","you'll","your","youre","yours","yourself","yourselves","you've","z","zero"];
    var noPuncText = text.replace(/,/g,"").replace(/\./g,"");//.replace(/;/g,"");
    // console.log(noPuncText);
    var splitText = noPuncText.split(" ");
    var words = new Array;
    // console.log(splitText);
    for(var i=0; i < splitText.length; i++){
        var word = splitText[i];
        if(stopWords.indexOf(word.toLowerCase())==-1){
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
    $( "#text" ).on( "tabsactivate", function( event, ui )// {} );
    //window.addEventListener("load", function()
    {
        if (ui.newPanel.is("#tabs-foam")) {
            console.log(event, ui);
            $("#visualization").empty();
            if(stationManager.foamtree != undefined){
                stationManager.foamtree.dispose();
            }
            stationManager.foamtree = new CarrotSearchFoamTree({
                id: "visualization",
                dataObject: {
                    groups: groups.slice(0, 50)
                }
            });
        }
    });
}

