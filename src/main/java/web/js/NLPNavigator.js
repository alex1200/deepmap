function NLPNavigator(){

}

NLPNavigator.prototype.openGazAdd = function() {
    $('#addDataSection').show();
    document.getElementById("addDataSection").style.width = "350px";
    // document.getElementById("map").style.marginLeft = "350px";
    // document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    // $('#navButtonOut').hide();
    // $('#navButtonIn').show();
};

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
NLPNavigator.prototype.closeGazAdd = function() {
    document.getElementById("addDataSection").style.width = "0";
    // document.getElementById("map").style.marginLeft = "0";
    // document.body.style.backgroundColor = "white";
    // $('#navButtonOut').show();
    // $('#navButtonIn').hide();
    $('#addDataSection').hide();
};

NLPNavigator.prototype.submitText = function(){
    console.log('submitText function');
    $('#textForm').submit(function(event) {
        console.log(event);
        event.preventDefault();
        console.log('past event');
        $.ajax({
            url : "/nlp/parse.json",//path of url where u want to submit form
            type : "POST",
            data: new FormData( this ),
            processData: false,
            contentType: false,
            // data : $(this).serialize(),
            // enctype : "multipart/form-data",
            success : function(data) {
                console.log(data)
                var json = JSON.parse(data);
                if(json.UID != undefined){
                    window.location("/nlp/"+json.UID+"/response.html");
                }
            }
        });
        console.log('ran ajax');
    });
    $('#textForm').submit();

};

NLPNavigator.prototype.submitGazetteer = function(){
    console.log("Submit Pressed");
    $('#gazAddProgress').show();
    $('#gazetteerForm').submit(function(event) {
        console.log("Submit Started");
        console.log(this);
        $.ajax({//action="/nlp/gazetteers.json" method="post" enctype="multipart/form-data"
            url : "/nlp/gazetteers.json",//path of url where u want to submit form
            type : "POST",
            data: new FormData( this ),
            processData: false,
            contentType: false,
            // data : $(this).serialize(),
            // enctype : "multipart/form-data",
            // contentType: "multipart/form-data",
            success : function(data) {
                $('#gazAddProgress').hide();
                $('#addDataSection').trigger("reset");
                $('#addDataSection').hide();
                gazetteerManager.init();
            }
        });
        event.preventDefault();
    });

    $('#gazetteerForm').submit();
};