//this is pretty good ....
//http://articles.sitepoint.com/article/iphone-development-12-tips


var jQT = $.jQTouch({
    formSelector: false,
    icon: 'icon.png',
    startupScreen: 'Default.png',
    statusBar: 'black', 
    useFastTouch: false,
    preloadImages: [
        'jqtouchthemes/jqt/img/back_button.png',
        'jqtouchthemes/jqt/img/back_button_clicked.png',
        'jqtouchthemes/jqt/img/button_clicked.png',
        'jqtouchthemes/jqt/img/grayButton.png',
        'jqtouchthemes/jqt/img/whiteButton.png',
        'jqtouchthemes/jqt/img/loading.gif'
    ]
});

var db;
var isIPhone=(window.orientation==0||window.orientation==90||window.orientation==180||window.orientation==-90)
var map;
var initZoom=.5;//what is the initial zoom, should be less than 1 for zoomed out
var zoomMin=.5;
var loaded = false;
if(isphone)zoomMin=.25;

$(document).ready(function(){
				if(loaded == false)
				  onLoad();

				  
});
function onLoad(){
	loaded=true;
	document.documentElement.addEventListener('touchmove', function(e) {shouldIScroll(e)});
	$('#moviecaptionholders').bind('touchmove',function(e) {e.preventDefault();});
	
	$('#viewport').bind('touchstart mousedown',function(){
						pause();
						})
	$('#viewport').bind('touchmove',function(){
						toggleTouch(true);
						})
	
	initMap();
	loadMap();
	$('#mapholder').bind('touchstart mousedown',function(){
						 hideMapInstructions();
						 })
	
	printMotionModeHtml();//print the html for motion mode if we need to
	
	listenForUpdatesFromPano();
	
	$('img.retina').retina();

}
function shouldIScroll(e){
	currentpage=$('div.current').attr('id');
	
	var blockscrolling=!$('#'+currentpage).hasClass('allowscrolling');
	
	if(blockscrolling) e.preventDefault();

}

function initMap(){
	//alert ("init");
	myScroll = new iScroll('mapholder', { momentum:true, lockDirection:false, zoom: true, zoomMin:zoomMin, zoomMax:1, initZoom:initZoom });
}

var currentpano=null;
var currentscene='';
var current_media;
var viewer;
function loadPanoViewer(id){
	viewer = createPanoViewer({swf:"includes/krpano.swf", xml:"includes/panos-index.xml", target:"viewport", id: "krpanoSWFObject"});
	viewer.useHTML5("always");
	viewer.addVariable("scenename", 'scene_'+id);
	viewer.embed();
	
}
function selectpano(id){
	removepano("krpanoSWFObject");
	$('#viewport').html('');
	if ($('#viewport').html()==''){
		loadPanoViewer(id);
	}
	setTimeout(function(){
		document.getElementById("krpanoSWFObject").set('picname','');//initialize this, i don't think the xml does
		document.getElementById("krpanoSWFObject").set('videoname','');//initialize this, i don't think the xml does
		currentscene = document.getElementById("krpanoSWFObject").get('scenename');
		$('#viewport').hide();
		$('#pano').show();
		$('#viewport').fadeIn(500);
		loadPeripheralsOfPano(id);
		//setTimeout(function(){pause();},2000);
		setTimeout(function(){play();},2500);
		listenForUpdatesFromPano()
	},500);
}
function showpano(id){
	setTimeout(function(){
		$('#viewport').fadeIn();//1000? i want it more reliable
		loadPeripheralsOfPano(id);
	},500);
}



var showcaptiontoggle=false;//what's the initial default for captions?
var hotspotname='';
var videoname='';
function listenForUpdatesFromPano(){
	if($('#krpanoSWFObject')){
		var kr = $('#krpanoSWFObject');
		var newscenename=document.getElementById("krpanoSWFObject").get('scenename');
		if(newscenename!='' && currentscene!=newscenename && newscenename!=null){//there is a current scene, and the last selected scene is not what's currently playing
			var id=newscenename.replace("scene_","");
			loadPeripheralsOfPano(id);
			currentscene=newscenename;
		}
		//handle picture hotspots
		var newhotspotname=document.getElementById("krpanoSWFObject").get('picname');
		if(newhotspotname!='' && hotspotname!=newhotspotname && newhotspotname!=null){//there is a current hotspot, and the last selected hotspot is not what's currently showing
			var id=newhotspotname.replace("hs_","");
			var picpath = document.getElementById("krpanoSWFObject").get('picpath');
			if(hotspotcaptions[id]){
				$('#panocaption').html(hotspotcaptions[id])
				$('#panocaption').show();
				hotspotcaption=hotspotcaptions[id]
			}
			$("#hotspotimage").attr("src",picpath);
			var imageWidth = $("#hotspotimage").width();
			$("#hotspotimage").css("left",((1024-imageWidth)/2));
			var imageHeight = $("#hotspotimage").height();
			$("#hotspotimage").css("top",((708-imageHeight)/2));
			$("#hotspotimage").fadeIn(750);
		}
		if(newhotspotname=='' || newhotspotname == null){
			hotspotcaption='';
			hideHotSpotImage();
		}	
		setCaption();
		
		//handle video clicks
		videoname=document.getElementById("krpanoSWFObject").get('videoname');
		if(videoname!='' && newscenename!=null){
			var id=videoname.replace("hs_","");
			$('.descpage').hide();
			$('#hotspot'+id).show();
			$('#gotohotspotpage').trigger('click');
			
			//clear out the selection
			document.getElementById("krpanoSWFObject").set('videoname','');//initialize this, i don't think the xml does
			videoname='';
		}
	}
	
	setTimeout(function(){
		listenForUpdatesFromPano();
	},100);//TODO, kick this up for prod to a higher frequency
}

var panocaption='';
var hotspotcaption='';
function hideHotSpotImage(){
	$("#hotspotimage").hide();
	document.getElementById("krpanoSWFObject").set('picname','');
	newhotspotname = '';
}
function loadPeripheralsOfPano(id){
	currentpanoid=id;
	stopMusic();
	if(musicfiles[id]){
		setTimeout(function(){playMusic(musicfiles[id])},1500);//let the panos load for 1.5 seconds before trying this
		$('#restartmusic').show();
		$('#replayaudioimg').click(function(){restartMusic(id);});

		$('#viewcaption').show();
		$('#viewcaptionlink').click(function(){setScrollOnCaption(id);});
		
	}
	else{
		$('#restartmusic').hide();
		$('#viewcaption').hide();
	}
	if(panocaptions[id]){
		panocaption=panocaptions[id];
	}
	else{
		panocaption='';
	}
	setCaption();

}

function setCaption(){
	if(hotspotcaption!=''){
		$('#panocaption').show();
		$('#panocaption').html(hotspotcaption)
	}
	else if(panocaption!=''){
		$('#panocaption').show();
		$('#panocaption').html(panocaption)
	}
	else{
		$('#panocaption').html('');
		$('#panocaption').hide();
	}	
}

function restartMusic(id){

	document.getElementById('audioplayer').pause();
	document.getElementById('audioplayer').currentTime = 0;
	document.getElementById('audioplayer').play();
	
	$('#replayaudioimg').attr('src','img/replay_audio_down'+iphonetext+'.png');
	$('#replayaudioimg').retina();
	setTimeout(function(){
		$('#replayaudioimg').attr('src','img/replay_audio'+iphonetext+'.png');
		$('#replayaudioimg').retina();
	},1000);
}

function playMusic(path){

	$('#mp3').html('<audio id="audioplayer" autoplay><source src="'+path+'" type="audio/mpeg"></audio>');

}

function stopMusic(){

	$("#mp3").html('');

}

function goBack() {
	$('#pano').hide();
}

var hasmaprefreshed=false;
function loadMap(){
	stopMusic();

	setTimeout(function () {
		if(!hasmaprefreshed){
			myScroll.refresh();
			var centerx=($('#mapholderinner').width()*initZoom)/2-$('#mapholder').width()/2;
			var centery=($('#mapholderinner').height()*initZoom)/2-$('#mapholder').height()/2;
			myScroll.scrollTo(-1*centerx,-1*centery,0);
		}
		hasmaprefreshed=true;
		//center the init view
	}, 2);
}

//manual controls of the panoviewer
function setHeading(x,y){
	toggleTouch(true);
	document.getElementById("krpanoSWFObject").set('continuespinning','false');
	document.getElementById("krpanoSWFObject").call('lookto('+x+','+y+',get("view.fov"))');
		
	pause();
}
function play(){
	toggleTouch(true);//get out of the motion mode
	var imgheight=52;
	if(isphone)imgheight=30;
	
	document.getElementById("krpanoSWFObject").set('continuespinning','true');
	document.getElementById("krpanoSWFObject").call('spinloop()');

	$('#playpause').html('<a href="#" onclick="pause();return false;"><img height="'+imgheight+'" id="spinner" src="img/VirtualTour_buttons_spin_on'+iphonetext+'.png"></a>');
	$('#spinner').retina();
}
function pause(){
	document.getElementById("krpanoSWFObject").set('continuespinning','false');
	var imgheight=52;
	if(isphone)imgheight=30;
	
	var htmlplay = '<a href="#" onclick="play();return false;"><img height="'+imgheight+'" id="spinner" src="img/VirtualTour_buttons_spin'+iphonetext+'.png"></a>';
	if ($('#playpause').html() != htmlplay){
		$('#playpause').html(htmlplay);
		$('#spinner').retina();
	}
}



/********************************************
 * below here is the interface to the hardware to get the accelerometer, magnetic heading, and gps
********************************************/

var intouchmode=true;

function printMotionModeHtml(){
	toggleTouch(intouchmode);
}


function toggleTouch(b){
	intouchmode=b;
	if(document.getElementById("krpanoSWFObject"))
		document.getElementById("krpanoSWFObject").set('intouchmode',intouchmode);
		
	//if(getValue('showmotion')!='true'){
	if(false){//put the and false to prevent disabling of motion mode, option is always there
		$('#touchmode').html('');;//alert('hiding');
	}
	//var iphonetext=isphone ? '_iphone':''); ?>;
	
	var imgheight=52;
	if(isphone)imgheight=30;
	var html='';
	
	if(intouchmode){
		html='<img height="'+imgheight+'" id="toggletouch1" src="img/touch2_on'+iphonetext+'.png"><br><a href="#" onclick="toggleTouch(false);return false;"><img  height="'+imgheight+'" id="toggletouch2" src="img/motion2_off'+iphonetext+'.png"></a>';
	}
	else{
		html='<a href="#" onclick="toggleTouch(true);return false;"><img  height="'+imgheight+'" id="toggletouch1" src="img/touch2_off'+iphonetext+'.png"></a><br><img  height="'+imgheight+'" id="toggletouch2" src="img/motion2_on'+iphonetext+'.png">';
	}
	$('#touchmode').html(html);
	$('#toggletouch1').retina();
	$('#toggletouch2').retina();
	
	setTimeout(function(){
		$('#touchmode').html(html);
		$('#toggletouch1').retina();
		$('#toggletouch2').retina();
	},500)
	
	handleHardware();

	if(intouchmode==b)return;//passed this are actions we only do on switching of types
	pause();

}



var accelz=0;
var prevzvalue=0;

//loops every second to call a check for hardware
function handleHardwareLoop(){
	handleHardware();
	setTimeout(function(){
		handleHardwareLoop();
	},1000)
}
//actual function to check for hardware, it's not in the loop so we can call it directly
var usinghardware=false;//initial setting
function handleHardware(){
	var currentpage=$('div.current').attr('id');
	if(currentpage!='pano'){//we're not even looking at the pano, so who cares?
		if(usinghardware)
			turnOffHardware();
		usinghardware=false;
	}
	else if(intouchmode){//we're watching the pano and it's in touch mode
		if(usinghardware)
			turnOffHardware();
		usinghardware=false;
	}
	else{//we're watching the pano and it's in motion mode
		if(!usinghardware)
			turnOnHardware();
		usinghardware=true;
	}
}

function turnOnHardware(){
	//alert('turning it on')
	window.ondevicemotion = function(event) {
		accelz = event.accelerationIncludingGravity.z;
		
		//get a lowpass filter setting
		if(!intouchmode){
			var lowpassfilterconstant=3;//lower makes this more responsive, but possibly more jittery
			var alpha=Math.max(1-(Math.abs(prevzvalue-round(accelz,1000))/lowpassfilterconstant), .5);
			var lowpassz=alpha*prevzvalue+(1-alpha)*accelz;
			prevzvalue=lowpassz;
			var setyto=Math.min(1,Math.max(-1,prevzvalue/10));//really force it to be between -1 and 1
			setyto=Math.asin(setyto);//this gives me the degrees I want in radians
			setyto=-1*setyto*180/Math.PI;
			
			document.getElementById("krpanoSWFObject").set('continuespinning','false');
			if(magneticHeading!=-1)
				document.getElementById("krpanoSWFObject").call('lookat('+magneticHeading+','+setyto+',get("view.fov"))');
			pause()
			//setHeading(setyto,magneticHeading)
		}
	}
	
	loopgetheadingbool=true;
	loopGetHeading();
}

var loopgetheadingbool=false;
function loopGetHeading(){
	navigator.compass.getCurrentHeading(
		function (heading){
			magneticHeading=heading.magneticHeading;
		}
		, function(){/*don't do anything onFail*/}
	);
	if(loopgetheadingbool)
		setTimeout(function(){loopGetHeading();},10);
}

function turnOffHardware(){
	//alert('turning it off')
	window.ondevicemotion = null;//clear this event listener? is this how to do it?
	loopgetheadingbool=false;//this will kill the loops
}



function queryHeading(){
	var kr=document.getElementById("krpanoSWFObject");
	if(kr){
		var t = currentscene1 = kr.get('scenename').replace('scene_','')+" h:"+round(kr.get('view.hlookat')+2,100)+" v:"+round(kr.get('view.vlookat')+5,100);
		$('#output').html(t);
	}
	setTimeout(function(){queryHeading();},500);
}



function round(i,v){
	return Math.round(i*v)/v;
}



function hideMapInstructions(){
	$('#mapinstructions').fadeOut(200);
}



/********************************************
 * below here is extraneous page functions
********************************************/
var showradarmaptoggle=false;//what's the initial default for radarmap?
function loadRadarMap(id){
	var t = filepaths[id].replace(/\\/g, '/').replace(/\/[^\/]*\/?$/, '');
	var img = t+'/radarmap.png';
	if(window.devicePixelRatio >= 2)
		$('#radarmap').html('<div style="position:absolute;text-align:center;width:200px;">tap to close</div><img src="'+img+'"><img style="position:absolute;top:0px;left:0px;" src="img/radar.png" id="radarcone">');
	else{
		$('#showradarmap').hide();
		$('#radarmap').hide();
		$('#radarmap').html('');
	}
}

//MOVIE STUFF
var lastmovie=1;
function loadMovie(i){
	resetResetCounter();
	$('#moviebutton'+lastmovie).attr("src",'img-rus/video_'+lastmovie+iphonetext+'.png')
	$('#moviebutton'+i).attr("src",'img-rus/video_'+i+'_on'+iphonetext+'.png')
	
	$('#moviebutton'+lastmovie).retina();
	$('#moviebutton'+i).retina();
	
	var width=960;//960 540
	var height=540;
	if(isphone){
		width=320;
		height=200;
	}
	
	var movieending='';
	if(!isphone || window.devicePixelRatio >= 2)//if it's 
		movieending='_large';
	
	var html='<EMBED SRC="img-rus/media/mountrushmoreintensity'+movieending+'.mov" autoplay="true" scale="tofit" LOOP="TRUE" width="'+(width)+'" height="'+(height)+'"></EMBED>';
	if(i==1) html='<EMBED SRC="img-rus/media/mountrushmoreintensity'+movieending+'.mov" autoplay="true" scale="tofit" LOOP="TRUE" width="'+(width)+'" height="'+(height)+'"></EMBED>';
	if(i==2) html='<EMBED SRC="img-rus/media/gw_head'+movieending+'.mov" LOOP="TRUE" autoplay="true" scale="tofit" width="'+(width)+'" height="'+(height)+'"></EMBED>';
	if(i==3) html='<EMBED SRC="img-rus/media/tj_head'+movieending+'.mov" autoplay="true" scale="tofit" LOOP="TRUE" width="'+(width)+'" height="'+(height)+'"></EMBED>';
	if(i==4) html='<EMBED SRC="img-rus/media/al_head'+movieending+'.mov" autoplay="true" scale="tofit" LOOP="TRUE" width="'+(width)+'" height="'+(height)+'"></EMBED>';
	if(i==5) html='<EMBED SRC="img-rus/media/tr_head'+movieending+'.mov" autoplay="true" LOOP="TRUE" scale="tofit" width="'+(width)+'" height="'+(height)+'"></EMBED>';
	if(i==6) html='<EMBED SRC="img-rus/media/hall_of_records'+movieending+'.mov" autoplay="true" scale="tofit" LOOP="TRUE" width="'+(width)+'" height="'+(height)+'"></EMBED>';
	$('#movieplayer').html(html);
	
	$('.moviecaptions').hide();
	$('#moviecaptions'+i).show();
	
	lastmovie=i;
}

function showIphoneMovieCaption(){
	loadMovie(lastmovie);
	$('#moviecaptionholders').toggle();
}

//MOVIE2 STUFF
var lastmovie2=1;
function loadMovie2(i){
	resetResetCounter();
	$('#moviebutton2'+lastmovie2).attr("src",'img-rus/DigitalPreservationProject_buttons_'+lastmovie2+iphonetext+'.jpg')
	$('#moviebutton2'+i).attr("src",'img-rus/DigitalPreservationProject_buttons_'+i+'_on'+iphonetext+'.jpg')
	
	$('#moviebutton2'+lastmovie2).retina();
	$('#moviebutton2'+i).retina();
	
	var width=960;//960 540
	var height=540;
	if(isphone){
		width=320;
		height=200;
	}
	
	var movieending='';
	if(!isphone || window.devicePixelRatio >= 2)//if it's 
		movieending='_large';
	
	var html='<EMBED SRC="img-rus/media/video_2_1'+movieending+'.mov" autoplay="true" scale="tofit" LOOP="TRUE" width="'+(width)+'" height="'+(height)+'"></EMBED>';
	if(i==1) html='<EMBED SRC="img-rus/media/video_2_1'+movieending+'.mov" autoplay="true" scale="tofit" LOOP="TRUE" width="'+(width)+'" height="'+(height)+'"></EMBED>';
	if(i==2) html='<EMBED SRC="img-rus/media/video_2_2'+movieending+'.mov" autoplay="true" scale="tofit" LOOP="TRUE" width="'+(width)+'" height="'+(height)+'"></EMBED>';
	if(i==3) html='<EMBED SRC="img-rus/media/video_2_3'+movieending+'.mov" autoplay="true" scale="tofit" LOOP="TRUE" width="'+(width)+'" height="'+(height)+'"></EMBED>';
	$('#movieplayer2').html(html);
	
	$('.moviecaptions2').hide();
	$('#moviecaptions2'+i).show();
	
	lastmovie2=i;
}

function showIphoneMovieCaption2(){
	loadMovie(lastmovie);
	$('#moviecaptionholders2').toggle();
}


function hideShowPanoRadarMap(bool){
	showradarmaptoggle=bool;
	//if(showradarmaptoggle) {$('#showradarmap').fadeOut(500, function(){$('#radarmap').show(1000);}); }
	//else {$('#radarmap').hide(1000, function(){$('#showradarmap').fadeIn(1000);});}

	if(showradarmaptoggle) {$('#showradarmap').hide(); $('#radarmap').show(); }
	else {$('#radarmap').hide(); $('#showradarmap').show();}

	//printPanoRadarMapToggle();
}

