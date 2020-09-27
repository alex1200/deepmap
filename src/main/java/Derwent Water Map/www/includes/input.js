function manageState(){
	var val = location.href;
	var array=val.split("map=");
	if(array.length==2){
		loadMapAfter(array[1]);
	}	
}


function editMap(id){
	openModal(800,600);
	$.ajax({
		url: "input.php",
		data: {
			action:'editmap',
			id:id
		},
		success: function(data) { 
			$('#mediamodal').html(data);
		}
	});	
}

var curmap=-1;
function loadMap(id, width){//we put this here as a pre function that will save the state, some things call the after which will omit the states
	var baseurl=window.location+"";
	var urlparts= baseurl.split("?");
	if (history.pushState)
		history.pushState(null, null, urlparts[0]+"?map="+id);

	loadMapAfter(id, width)
}
function loadMapAfter(id, width){
	curmap=id;
	if(!width)width=DEFAULTWIDTH
	$.ajax({
		url: "input.php",
		data: {
			action:'getmap',
			id:id,
			width:width
		},
		success: function(data) { 
			$('#map').html(data);
		}
	});	
}
function loadPanoList(id){
	$.ajax({
		url: "input.php",
		data: {
			action:'loadpanolist',
			id:id
		},
		success: function(data) { 
			$('#panolist').html(data);
		}
	});	
}
function editPano(id){
	openModal(800,600);
	$.ajax({
		url: "input.php",
		data: {
			action:'editpano',
			id:id
		},
		success: function(data) { 
			$('#mediamodal').html(data);
			//alert(data);
			getPanoLinks(id);
			$('.panoimg').click(function(event) {
				detectClickAngle(event, $(this));
			});
		}
	});	
}
function insertBlankPano(){
	$.ajax({
		url: "input.php",
		data: {
			action:'insertblankpano',
			map:curmap
		},
		success: function(data) { 
			loadPanoList(curmap);
		}
	});	
}
function getPanoLinks(id){
	$.ajax({
		url: "input.php",
		data: {
			action:'loadpanolinks',
			id:id
		},
		success: function(data) { 
			$('#panolinks').html(data);
		}
	});	
}
function saveNewPanoLink(id){
	$.ajax({
		url: "input.php",
		data: {
			action:'savepanolink',
			id:id,
			dstid:$('#newpanolink').val()
		},
		success: function(data) { 
			getPanoLinks(id);
			loadMap(curmap)
		}
	});	
}
function updatePanoLink(srcpano, dstpano){
	var xdeg=$('#'+dstpano+'-xdeg').val();
	var ydeg=$('#'+dstpano+'-ydeg').val();
	
	$.ajax({
		url: "input.php",
		data: {
			action:'savepanolink',
			id:srcpano,
			dstid:dstpano,
			xdeg:xdeg,
			ydeg:ydeg
		},
		success: function(data) { 
			//refresh the list? i don't think that's necessary
			//getPanoLinks(srcpano);
		}
	});	
	$('#'+dstpano+'-save').hide();
}
function deletePanoLink(srcpano, dstpano){
	$.ajax({
		url: "input.php",
		data: {
			action:'deletepanolink',
			id:srcpano,
			dstid:dstpano
		},
		success: function(data) { 
			getPanoLinks(srcpano);
			loadMap(curmap)		
		}
	});	
}
function insertBlankHungMedia(id){
	$.ajax({
		url: "input.php",
		data: {
			action:'insertblankhungmedia',
			id:id
		},
		success: function(data) { 
			editPano(id);
		}
	});	
}

function makeFileList(inputelem){
	//alert($(inputelem).attr('id'));
	output=$('#'+$(inputelem).attr('id')+'_outputdiv');
	
	output.empty();
	var html='<ul>';
	for (var i = 0; i < inputelem.files.length; i++) {
		html+='<li>'+inputelem.files[i].name+'</li>';
	}
	if(inputelem.files.length==6){
		html+='<li><span style="font-weight:bold;color:#0c0;">Good Job!</span> You appear to have correctly added six pano sides</li>';
	}
	html+='</ul>';	

	if(inputelem.files.length!=6) {
		html='<ul><li><span style="color:#c00;font-weight:bold;">Please try again!</span> Select exactly 6 files representing the pano faces. Use shift/ctrl clicking to select multiple files or ctrl-a for select all of a directory</li></ul>';
	}
	output.html(html);
	output.slideDown(600);
	
}


function deletehangingmedia(id){
	$.ajax({
		url: "input.php",
		data: {
			action:'deletehungmedia',
			id:id
		},
		success: function(panoid) { 
			editPano(panoid);
		}
	});		
}



function latloncalc(){
	var point1x=$('#point1x').val();
	var point2x=$('#point2x').val();
	var point1lon=$('#point1lon').val();
	var point2lon=$('#point2lon').val();
	var imgwidth=$('#imgwidth').val();
	var difx=Math.abs(point1x- point2x);
	var diflon=Math.abs(point1lon-point2lon);
	var degreelonperpixel=diflon/difx;
	var minlon=point1lon*1-point1x*degreelonperpixel
	var maxlon=point1lon*1+(imgwidth-point1x)*degreelonperpixel
	
	$('#minlon').val(minlon);
	$('#maxlon').val(maxlon);

	var point1y=$('#point1y').val();
	var point2y=$('#point2y').val();
	var point1lat=$('#point1lat').val();
	var point2lat=$('#point2lat').val();
	var imgheight=$('#imgheight').val();
	var dify=Math.abs(point1y- point2y);
	var diflat=Math.abs(point1lat-point2lat);
	var degreelatperpixel=diflat/dify;
	var maxlat=point1lat*1+point1y*degreelatperpixel
	var minlat=point1lat-(imgheight-point1y)*degreelatperpixel

	$('#minlat').val(minlat);
	$('#maxlat').val(maxlat);
}






//utility functions

function openModal(width, height){
	
	$.modal('<div id="mediamodal" style="height:'+(height)+'px;"><h1 style="text-align:center;padding-top:10px;">Loading</h1></div>',{
		overlayClose:true,
		minWidth:width,
		minHeight:height,
	
		onClose: function(dialog) {
			
			//$('#simplemodal-data').html('<h3>Goodbye...</h3>');
			//$('#simplemodal-container').animate({
			//	height: 40
			//}, function () {
			//	dialog.data.fadeOut(0, function () {//200
			//		dialog.container.fadeOut(0, function () {//200
			//			dialog.overlay.fadeOut(0, function () {//200
							$.modal.close();
			//			});
			//		});
			//	});
			//});
		},
		onOpen: function (dialog) {
			dialog.overlay.fadeIn(0, function () {//fast
				dialog.data.hide();
				dialog.container.slideDown(0, function () {//fast
					dialog.data.fadeIn(0);//fast
				});
			});
		}
	});
	
	//hack to have this take up half the screen
	//end hack	
}
function closeModal(){//potential problem: is it a problem that i "close" the modal at the same time as the form is being submitted? dunno, we'll see
	$('.simplemodal-close').trigger('click');
}

var globalframecounter=0;
function submitform(form){	
	var iframename='frame_'+(globalframecounter++);
	var num=globalframecounter;
	
	// Create the iframe...  
	var iframe = document.createElement("iframe");  
	iframe.setAttribute("id",iframename);  
	iframe.setAttribute("name",iframename);  
	var width=0;//set these two to 0 to hide the iframe for prod, leave them 250/400 for debugging
	var height=0;
	iframe.setAttribute("width",width);  
	iframe.setAttribute("height",height);  
	iframe.setAttribute("border","0");  
	iframe.setAttribute("style","width: "+width+"; height: "+height+"; border: none;");  
	
	// Add to document...  
	$('#iframeholder').append(iframe);
	window.frames[iframename].name=iframename;
	iframeId = document.getElementById(iframename);
	
	// Add event...  
	var eventHandler = function()  {
	   
		if (iframeId.detachEvent)  
			iframeId.detachEvent("onload", eventHandler);  
		else  
			iframeId.removeEventListener("load", eventHandler, false);  
			

		//what do we do on form complete
		if(form.action.value=='editpanoreceive'){
			loadPanoList(curmap);
			loadMap(curmap);
		}


	}  
	
	if (iframeId.addEventListener)  
		iframeId.addEventListener("load", eventHandler, true);  
	if (iframeId.attachEvent)  
		iframeId.attachEvent("onload", eventHandler);  
   
	// Set properties of form...  
	form.setAttribute("target",iframename);  	
	form.submit();
	
	//if(form.APC_UPLOAD_PROGRESS){}
	
	//this was inside the oncomplete event handler, but i didn't want to wait that long
	//i fire this async just after the form submits
	//i hope the form is already being submitted before i kill it's html with the closeModal();
	if(form.action.value!='edithungmedia'){
		setTimeout(function(){
			closeModal();//close the modal
		},1);
	}
}


function sendAjaxData(a){
	$.ajax({
		url: "input.php",
		data: a,
		success: function(data) { 
			if(data!='') alert(data);
		}
	});	
}



function detectClickAngle(e, elem){
	if(e.target.id=='panoimg4')return;
	if(e.target.id=='panoimg5')return;
	
	var pos_x = e.offsetX?(e.offsetX):event.pageX-elem.offsetLeft;
	var pos_y = e.offsetY?(e.offsetY):event.pageY-elem.offsetTop;
	var size=elem.width();
	var angle_x=Math.atan((pos_x-size/2) / (size/2));
	angle_x=angle_x*180/Math.PI;
	if(e.target.id=='panoimg1') angle_x+= 90;
	if(e.target.id=='panoimg2') angle_x+= 180;
	if(e.target.id=='panoimg3') angle_x+= 270;
	angle_x=(angle_x+360)%360;
	angle_x=Math.round(angle_x*10)/10;
	
	var hypotneuse = Math.sqrt(size/2*size/2 + (pos_x-size/2)*(pos_x-size/2));
	angle_y=Math.atan(((size/2)-pos_y)/hypotneuse);
	angle_y=angle_y*180/Math.PI;
	angle_y=Math.round(angle_y*10)/10;
	angle_y=angle_y*-1;//oops, want to keep it consistent so just flip the sign
	
	$('#angleoutputter').html('hdeg: <b>'+angle_x+'</b> vdeg:<b>'+angle_y+'</b>');
	
	//alert(e.target.id+" "+elem.width()+" "+pos_x+" "+pos_y+" "+angle_x);
}

