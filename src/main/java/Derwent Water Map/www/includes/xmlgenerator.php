<?php

//this is for the old method with the arrays defined in the php file
/*
function generatePanoXMLs($panos, $imgdir, $xmlpath='pano.xml',$hotspots=array(), $isiphone=false){
	$rm='rm -rf includes/xml/*.xml';
	exec($rm);
	$xml=generatePanoXMLsGetText($panos, $imgdir, $hotspots, $isiphone);
	
	$path='/Users/landonsilla/Sites/cyark/html/iphone/'.'includes/'.$xmlpath;
	$fh = fopen($path, 'w') or die("can't open file ".$path);
	fwrite($fh, $xml);
	fclose($fh);
	chmod($path, 0777);
	
}
*/


//this is the new way, it's the db driven way
function generatePanosXMLs2($maparray, $imgdir, $xmlpath='pano.xml', $isiphone=false, $imgending='jpg', $widthpercent=60, $heightpercent=60, $showcompass=true, $browserversion=false){
	$hotspots=array();
	$panos=array();
	$sql=$maparray;
	
	
	if(is_array($maparray))$sql= implode(',',$maparray);
	$q=query("select * from app_pano where map_id in (".$sql.")");
	while($r=rows($q)){
		$viewingotherpanos=array();
		$q1=query("SELECT * FROM `app_pano_link` WHERE srcpano=".$r['id']);
		while($r1=rows($q1)){
			$viewingotherpanos[]=$r1['dstpano'];
		}
		$r['showotherpanos']=$viewingotherpanos;
		
		$r['hasalt']=$r['hasalt']==1;
		
		$panos[]=$r;
	}
	//echo '<pre>';print_r($panos);exit;

	$themap=rows(query("select * from app_map where id in (".$sql.")"));
	
	
	$q=query("select * from app_hung_media");
	while($r=rows($q)){
		$hotspots[$r['pano_id']][]=$r;
	}
	$xml=generatePanoXMLsGetText($panos, $themap['default_pano'], $imgdir, $hotspots, $isiphone, $imgending, $widthpercent, $heightpercent, $showcompass, $browserversion);
	
	$path='includes/'.$xmlpath;
	$fh = fopen($path, 'w') or die("can't open file ".$path);
	fwrite($fh, $xml);
	fclose($fh);
	chmod($path, 0777);
}


function generatePanoXMLsGetText($panos, $defaultpano, $imgdir, $hotspots=array(), $isiphone=false, $imgending='jpg', $widthpercent=60, $heightpercent=60, $showcompass=true, $browserversion=false){

		
	//deal with the other areas	
	/*
		$otherscenes='';
	$hotspots=
	if(isset($pano['showotherpanos'])&&is_array($pano['showotherpanos']) && sizeof($pano['showotherpanos'])>0){
		for($i=0;$i<sizeof($panos);$i++){
			if(in_array($i,$pano['showotherpanos'])){
				$hotspot
			}
		}
	}
*/

if($browserversion)$imgpath='/iphone';
else $imgpath='..';
	
		
$xml='<!-- 
	krpano Virtual Tour Demo - Weingut
		http://krpano.com/tours/weingut/
	
	note - this is an reduced example (stronger image compression, only small 
	images, fewer panos) to keep the download package small
-->
<krpano version="1.0.8" onstart="startup();">
	<!-- vtour.xml template krpano tools version 1.0.8.12 -->
	
	<action name="startup">
		<!-- load the first scene -->
';
if($browserversion){
	$xml.=' loadscene(scene_'.$defaultpano.', null, null); 
	oninterrupt( stopspinloop() );'./*this allows touching to stop the spinning*/'
	';
}
	else
	$xml.='loadscene(get(scenename), null, null); 
		oninterrupt( break);'./*this allows touching to stop the spinning*/'
	
	';


$xml.='		
		set(continuespinning,true);
		set(spincount,0);
		set(intouchmode,true);
		set(picname,blah);
		set(caption,initdefault);
		';

		/*;<!-- this will initially orient you at a certain heading-->*/

		$xml.='
		spinloop();
		
		
		<!-- build the thumbnails (remove the next line to remove the thumbnails) -->
		<!-- buildthumbs(); -->
	</action>';
	
	if($browserversion){
	$xml.='		
		<action name="spinloop">
		oninterrupt( stopspinloop(); );
';
		if($showcompass)$xml.='sub(plugin[compass_pointer].rotate, view.hlookat, heading);';

		$xml.='	
		set(plugin[spinicon].enabled,true);set(plugin[spinicon].visible,true);
		set(plugin[spiniconover].enabled,false);set(plugin[spiniconover].visible,false);
				
		add(hlookattemp,get(view.hlookat),1);
		lookto(get(hlookattemp), get(view.vlookat), get(view.fov), linear(10));
		if(continuespinning,spinloop())
	</action>
	<action name="stopspinloop">
		set(continuespinning,false);
		set(plugin[spinicon].enabled,false);set(plugin[spinicon].visible,false);
		set(plugin[spiniconover].enabled,true);set(plugin[spiniconover].visible,true);
		</action>
	<action name="gofullscreen">
		switch(fullscreen);
		set(plugin[fullscreenicon].enabled,false);set(plugin[fullscreenicon].visible,false);
		set(plugin[fullscreeniconover].enabled,true);set(plugin[fullscreeniconover].visible,true);
	</action>
	<action name="gofullscreenback">
		switch(fullscreen);
		set(plugin[fullscreeniconover].enabled,false);set(plugin[fullscreeniconover].visible,false);
		set(plugin[fullscreenicon].enabled,true);set(plugin[fullscreenicon].visible,true);
	</action>
	';
	}else{
	$xml.='<action name="spinloop">
		oninterrupt(break);
';
		if($showcompass)$xml.='sub(plugin[compass_pointer].rotate, view.hlookat, heading);';
$xml.='		
		add(hlookattemp,get(view.hlookat),1);
		lookto(get(hlookattemp), get(view.vlookat), get(view.fov), linear(10));
		if(continuespinning,spinloop())
	</action>';
	}
		
		
	$xml.='	
	<!-- disable the progress bar -->
	<progress showload="none" showwait="none" />
	

	<!-- hotspot styles (for Flash and HTML5) -->
	<style name="hotspot_ani_black"
	       url="'.$imgpath.'/img/hotspot_ani_black_64x64x20.png"
	       crop="0|0|64|64"
	       frames="20" framewidth="64" frameheight="64" frame="0"
	       onloaded="hotspot_animate();"
	       altonloaded="if(isphone, mul(scale,2)); onloaded();"
	       />

	<style name="hotspot_ani_white"
	       url="'.$imgpath.'/img/hotspot_ani_outline_64x64x20.png"
	       crop="0|0|64|64"
	       alpha="1"
	       frames="20" framewidth="64" frameheight="64" frame="0"
	       onloaded="hotspot_animate();"
	       altonloaded="if(isphone, mul(scale,2)); onloaded();"
	       />
	       
	<style name="alt_hotspot_ani_black"
	       alturl="'.$imgpath.'/img/hotspot_ani_black_64x64x20.png"
	       frames="20" framewidth="64" frameheight="64" frame="0"
	       altonloaded="set(crop,\'0|0|64|64\'); resetsize(); set(alpha,1.0); if(isphone, mul(scale,2)); hotspot_animate();"
	       />
	       
	<style name="alt_hotspot_ani_white"
	       alturl="'.$imgpath.'/img/hotspot_ani_outline_64x64x20.png"
	       frames="20" framewidth="64" frameheight="64" frame="0"
	       altonloaded="set(crop,\'0|0|64|64\'); resetsize(); set(alpha,1.0); if(isphone, mul(scale,2)); hotspot_animate();"
	       />

		<style name="imagehotspot" 
		       capture="false" 
		       zorder="2"
		       alpha="1"
		       url="'.$imgpath.'/img/hotspot_photo.png" 
		       alturl="'.$imgpath.'/img/hotspot_photo.png" 
		       altonloaded="if(isphone, mul(scale,2));"
		       zoom="true" 
		       scale="0.3" 
		       ox="+40" 
		       oy="+30" 
		       />
		<style name="perspectivehotspot" 
		       capture="false" 
		       zorder="2" 
		       alpha="1"
		       url="'.$imgpath.'/img/hotspot_scanshot.png" 
		       alturl="'.$imgpath.'/img/hotspot_scanshot.png" 
		       altonloaded="if(isphone, mul(scale,2));"
		       zoom="true" 
		       scale="0.3" 
		       ox="+40" 
		       oy="+30" 
		       />
		<style name="jshotspot" 
		       capture="false" 
		       zorder="2" 
		       onclick="js(jshotspot(get(pic)));" 
		       alpha="0"'./*this should be 0 for prod, set to .5 to view it for dev*/'
		       alturl="'.$imgpath.'/img/pixel-blue.png" 
		       altonloaded="if(isphone, mul(scale,2));"
		       zoom="true" 
		       scale="0.3" 
		       ox="+40" 
		       oy="+30" 
		       />
		 <style name="transparenthotspot" 
		       capture="false" 
		       zorder="2" 
		       onclick="showpic(\'\');" 
		       alpha="0"'./*this should be 0 for prod, set to .5 to view it for dev*/'
		       url="'.$imgpath.'/img/pixel-blue.png" 
		       alturl="'.$imgpath.'/img/pixel-blue.png" 
		       altonloaded="if(isphone, mul(scale,2));"
		       zoom="true" 
		       scale="0.3" 
		       ox="+20" 
		       oy="+15" 
		       />
		<style name="videohotspot" 
		       capture="false" 
		       zorder="2" 
		       onclick="showvideo();" 
		       alpha="1"
		       url="'.$imgpath.'/img/hotspot_video.png" 
		       alturl="'.$imgpath.'/img/hotspot_video.png" 
		       altonloaded="if(isphone, mul(scale,2));"
		       zoom="true" 
		       scale="0.3" 
		       ox="+40" 
		       oy="+30" 
		       />
		       
	<action name="hotspot_animate">
		inc(frame,1,get(frames),0);
		mul(ypos,frame,frameheight);
		txtadd(crop,\'0|\',get(ypos),\'|\',get(framewidth),\'|\',get(frameheight));
		delayedcall(0.03, hotspot_animate() );
	</action>
	
	
	<!-- text style for hotspot hovering -->       
	<textstyle name="hotspottextstyle" 
	           font="Arial" fontsize="18" bold="true" italic="true" textcolor="0xFFF7EF" background="false" border="false"
	           alpha="1" blendmode="layer" effect="glow(0x000000,0.5,4,3);dropshadow(4,45,0x000000,4,0.66);" 
	           origin="cursor" edge="bottom" textalign="center" xoffset="0" yoffset="-3" noclip="true" showtime="0.1" fadetime="0.25" fadeintime="0.1" 
	           />	
	<textstyle name="mediacaptiontextstyle" 
	           font="Arial" 
	           fontsize="14" 
	           bold="true" 
	           textcolor="0x000000" 
	           background="true"
	           backgroundcolor="0xFFFFFF"
	            
	           border="true"
	           bordercolor="0x000000"
	           
	           alpha=".9" 
	           blendmode="layer" 
	           effect="glow(0x000000,0.5,4,3);dropshadow(4,45,0x000000,4,0.66);" 
	           origin="bottom" './*used to be cursor*/'
	           edge="bottom" 
	           textalign="center" 
	           xoffset="0" 
	           yoffset="5" 
	           noclip="true" 
	           showtime="0.1" 
	           fadetime="0.25" 
	           fadeintime="0.1" 
	           />	
	           ';
    
	
			
	
	foreach($panos as $pano){
		
		#doing stuff for the alt stuff
		$limit=($pano['hasalt']) ? 2 :1;
		for($ii=0;$ii<$limit;$ii++){
		if($ii==0){
			$pathext='';
			$idext='';
		}
		else{
			$pathext='_alt';
			$idext='_alt';
		}
		$pano['path']=str_replace('.jpg',$pathext.'.jpg',$pano['path']);	
		#END doing stuff for the alt stuff
				
			

		
		$hlookat=0;
		$i=$pano['id'];
		
		
		$xml.='
		<scene name="scene_'.$i.$idext.'" title="scene_'.$i.$idext.'" onstart="" thumburl="'.$imgpath.'/'.str_replace('#face#','front',$pano['path']).'">'./* */'
		<view hlookat="'.$hlookat.'" vlookat="0" fovtype="MFOV" fov="100" fovmin="30" fovmax="120" />
		'.//<!--preview url="'.$imgpath.'/'.str_replace('#face#','front',$pano['path']).'" /-->
		'
		<image>
			<left  url="../'.str_replace('#face#','left',$pano['path']).'" />
			<front url="../'.str_replace('#face#','front',$pano['path']).'" />
			<right url="../'.str_replace('#face#','right',$pano['path']).'" />
			<back  url="../'.str_replace('#face#','back',$pano['path']).'" />
			<up    url="../'.str_replace('#face#','up',$pano['path']).'" />
			<down  url="../'.str_replace('#face#','down',$pano['path']).'" />
			<mobile>
			<left  url="../'.str_replace('#face#','left',$pano['path']).'" />
			<front url="../'.str_replace('#face#','front',$pano['path']).'" />
			<right url="../'.str_replace('#face#','right',$pano['path']).'" />
			<back  url="../'.str_replace('#face#','back',$pano['path']).'" />
			<up    url="../'.str_replace('#face#','up',$pano['path']).'" />
			<down  url="../'.str_replace('#face#','down',$pano['path']).'" />
			</mobile>
			<tablet>
			<left  url="../'.str_replace('#face#','left',$pano['path']).'" />
			<front url="../'.str_replace('#face#','front',$pano['path']).'" />
			<right url="../'.str_replace('#face#','right',$pano['path']).'" />
			<back  url="../'.str_replace('#face#','back',$pano['path']).'" />
			<up    url="../'.str_replace('#face#','up',$pano['path']).'" />
			<down  url="../'.str_replace('#face#','down',$pano['path']).'" />
			</tablet>
		</image>


	
		<!-- invisible polygonal hotsppot as "hit area" for the door hotspot
			(for HTML5 an animated gif is used as alternative) -->
		';
		if(isset($pano['showotherpanos'])&&is_array($pano['showotherpanos']) && sizeof($pano['showotherpanos'])>0 ){
			//for($j=0;$j<sizeof($panos);$j++){
			foreach($panos as $pano2){
				$j=$pano2['id'];
				if(!in_array($pano2['id'],$pano['showotherpanos']))continue;
				$heading_calc=getHeading($pano['lat'],$pano['lon'],$pano2['lat'],$pano2['lon']);
				//echo $j.' '.$pano['lat'].' '.$pano['lon'].' '.$pano2['lat'].' '.$pano2['lon'];
				$heading=$heading_calc;
				$vert=0;
				
				$vert = getHeadingVertDB($i, $j, $heading, $vert, 'vert');
				$heading = getHeadingVertDB($i, $j, $heading, $vert, 'heading');
				
				//$vert = getHeadingVert($i, $j, $heading, $vert, 'vert');
				//$heading = getHeadingVert($i, $j, $heading, $vert, 'heading');
				
				$lookingbackheading=(($heading_calc+180)%360);
				$lookingbackvert=0;
				
				//$lookingbackheading=getHeadingVert($j, $i, $lookingbackheading, 0, 'heading');
				//$lookingbackvert=getHeadingVert($j, $i, 0, $lookingbackvert, 'vert');

				$lookingbackvert = getHeadingVertDB($j, $i, $lookingbackvert, $lookingbackvert, 'vert');
				$lookingbackheading = getHeadingVertDB($j, $i, $lookingbackheading, $lookingbackheading, 'heading');
				
				$gotopanoid=$j;
				if($pano2['hasalt'])$gotopanoid=$gotopanoid.$idext;
				
				$xml.='
				<hotspot name="door_hitarea'.$j.'"
				         style="hotspot_ani_white"
					     ath="'.$heading.'" './*this is the spin/heading, 0-360*/'
					     atv="'.$vert.'" './*this is the height, -90 is straight up, 90 is straight down*/'
				         alpha="0"
				         capture="false"
				         onhover="showtext(go there);"
				         onclick="set(enabled,false);
					              set(scenename,scene_'.$j.');
					              set(view.maxpixelzoom,null);
					              set(view.fovmin,28);
					              lookto('.$heading.', '.$vert.', 25);'./*this is where the camera moves to before the transition (should be the same as the ath, atv above)*/'
					              loadscene(scene_'.$gotopanoid.', null, MERGE, BLEND(2));
					              
					              if(get(intouchmode), lookat('.$lookingbackheading.', '.$lookingbackvert.', 25));'./*this is where the camera opens up after the transition*/'
						          if(get(intouchmode), wait(LOAD));
						          if(get(intouchmode), oninterrupt(break));
						          if(get(intouchmode), wait(BLEND));
						          if(get(intouchmode), lookto('.$lookingbackheading.', '.$lookingbackvert.', 108, smooth(45,45,60), false));'./*this is where the camera pans to after the transition*/'

						          ifnot(get(intouchmode), lookat(0, 0, 108, smooth(45,45,60), false));'./*this is where the camera pans to after the transition*/'
						          
						           "
					>
				</hotspot>';
			}
		}
		//echo '<code>'.$xml;
		//exit;

		foreach($hotspots[$pano['id']] as $hs){
			$hotspotxml='
			<!-- polygonal hotspots for the pictures on the side -->
			<hotspot 
				name="hs_'.$hs['id'].'" 
				pic="'.substr(basename($hs['path']),0,-4).'" 
				ath="'.($hs['xdeg']-7).'" 
				atv="'.($hs['ydeg']-4).'"
				style="'.$hs['type'].'hotspot" 
				';
			if(in_array($hs['type'],array('perspective','image'))){
				$hotspotxml.=' onclick="showpic(\''.formatcaption($hs['caption']).'\');" ';
			}
			if($hs['width']>0){
				$hotspotxml.='height="'.$hs['height'].'" width="'.$hs['width'].'"';
			}
			
			$hotspotxml.='></hotspot>';
			
			$xml.=$hotspotxml;
		}

/*
		$hs=0;
		if(isset($pano['hotspots']))
		foreach($pano['hotspots'] as $hotspot){
			$hsid=$hotspot['hotspotid'];
		$xml.='
		<!-- polygonal hotspots for the pictures on the side 
			(for a HTML5 a zoomicon is used as alternative) -->
		       
		<hotspot name="hs_'.$hsid.'" style="'.$hotspots[$hsid]['hotspottype'].'" pic="'.$hotspots[$hsid]['imgpath'].'"  ath="'.$hotspot['yangle'].'" atv="'.$hotspot['xangle'].'">
			<point ath=" 35.5409" atv=" -4.8241" />
			<point ath=" 35.6940" atv="  3.7081" />
			<point ath=" 46.0841" atv="  3.0648" />
			<point ath=" 45.9859" atv=" -4.4321" />
		</hotspot>';
	}
*/
	//this for the compass, to remove it remove references to onviewchange in other actions
	$compass.='
		<events onxmlcomplete="action(onstart);"
		    onviewchange= "action(onviewchange);"
		/>

		<!-- show info, set heading, create hotpots -->
		<action name="onstart">
			set(heading, 0);
			<!-- action(add_compass_spots); -->
		</action>

		
		<action name="onviewchange">
			sub(plugin[compass_pointer].rotate, view.hlookat, heading);
		</action>
		
		<!-- compass with rotating pointer -->
		<plugin name="compass" url="../img/compass.png" keep="true" zorder="0" children="true"
		        align="lefttop" x="10" y="10"
		        scalechildren="true" 
		        scale=".7"'./*change between 1 and .5*/'
		        './/onclick="switch(destscale,1.0,0.5);tween(scale,get(destscale));"
		        //'onhover="showtext(click to toggle size,hoverstyle);"
		        'heading="0"
		        alpha=".6"
		        onloaded="if(isphone, mul(scale,2));"
		        />

		<!-- compass pointer, the rotation will be changed in the "onviewchange" action -->
		<plugin name="compass_pointer" url="../img/compass_pointer.png" keep="true" handcursor="false"
				parent="compass" zorder="0"
				align="center"
				onloaded="if(isphone, mul(scale,2));"
		        />';
	if($showcompass) $xml.=$compass;
	
	
	
	if($browserversion){//add the full screen thing
		$xml.='<plugin name="fullscreenicon" url="../../images/fullscreen.png"
		        align="rightbottom" x="10" y="10"
		        scale=".7"
		        alpha=".6"
		        zorder="1"
		        onloaded="if(isphone, mul(scale,2));"
		        onclick="gofullscreen();"
		        />';
		
		$xml.='<plugin name="fullscreeniconover" url="../../images/fullscreen_on.png"
		        align="rightbottom" x="10" y="10"
		        scale=".7"
		        alpha=".6"
		        zorder="1"
		        visible="false"
		        onloaded="if(isphone, mul(scale,2));"
		        onclick="gofullscreenback();"
		        />';
		
		//yellow icon, clicking it stops the spinning
		$xml.='<plugin name="spinicon" url="../../images/rotate_on.png"
		        align="bottomleft" x="10" y="10"
		        scale=".7"
		        alpha=".6"
		        zorder="1"
		        onclick="stopspinloop();"
		        />';
		
		//white icon, clicking it starts spinning
		$xml.='<plugin name="spiniconover" url="../../images/rotate.png"
		        align="bottomleft" x="10" y="10"
		        scale=".7"
		        alpha=".6"
		        zorder="2"
		        onclick="set(continuespinning,true);spinloop();"
		        />';
	}
	
	$xml.='		</scene>';
	$i++;
	}//end for loop (the alt stuff)
	}//end foreach loop
	$xml.='	
	<!-- actions -->
       
	<!-- calc the max. flyout size of a hotspot for the current screen size -->
	<action name="calc_flyout_size">
		div(screen_sideaspect, stagewidth, stageheight);
		div(hotspot_sideaspect, hotspot[%1].width, hotspot[%1].height);
		
		if(screen_sideaspect LT hotspot_sideaspect,
			<!-- align at screen width -->
			div(hotspot[%1].width,stagewidth,stageheight);
			mul(hotspot[%1].width,'.$widthpercent.');
			txtadd(hotspot[%1].width,\'%\');
			set(hotspot[%1].height,prop);
		  ,
		  <!-- align at screen height -->
			set(hotspot[%1].width,prop);
			set(hotspot[%1].height,'.$heightpercent.'%);
		  );
	</action>

	<!-- fly in a hotspot = show hotspot fixed at screen -->
	<action name="flyin">
		if(hotspot[%1].flying == 0.0, hotspot[%1].resetsize(); calc_flyout_size(%1); );
		if(hotspot[%1].oldscale === null, copy(hotspot[%1].oldscale, hotspot[%1].scale) );
		if(hotspot[%1].oldrx === null, copy(hotspot[%1].oldrx, hotspot[%1].rx) );
		if(hotspot[%1].oldry === null, copy(hotspot[%1].oldry, hotspot[%1].ry) );
		if(hotspot[%1].oldrz === null, copy(hotspot[%1].oldrz, hotspot[%1].rz) );
		set(hotspot[%1].zorder,20);
		set(hotspot[%1].enabled,true);
		set(hotspot[%1].visible,true);
		tween(hotspot[%1].alpha,  1.0);
		tween(hotspot[%1].flying, 1.0);
		tween(hotspot[%1].scale,  1.0);
		tween(hotspot[%1].rx, 0.0);
		tween(hotspot[%1].ry, 0.0);
		tween(hotspot[%1].rz, 0.0);
	</action>

	<!-- fly the hotspot out/back -->
	<action name="flyout">
		set(hotspot[%1].enabled,false);
		tween(hotspot[%1].alpha,  0.0, 0.5, default, set(hotspot[%1].visible,false); );
		tween(hotspot[%1].flying, 0.0);
		tween(hotspot[%1].scale,  get(hotspot[%1].oldscale));
		tween(hotspot[%1].rx,  get(hotspot[%1].oldrx));
		tween(hotspot[%1].ry,  get(hotspot[%1].oldry));
		tween(hotspot[%1].rz,  get(hotspot[%1].oldrz));
		set(picname,);'./*clear the picname so the javascript cycle picks it up and clears the caption*/'
	</action>	       
	       
	<action name="showpic">
		<!-- creates a new hotspot and fly it out -->
		if(hotspot[get(pic)] === null,
			txtadd(picfilename,\''.$imgdir.'/\',get(pic),\'.'.$imgending.'\');
			addhotspot(get(pic));
			getcenter(hsath,hsatv);
			copy(hotspot[get(pic)].ath, hsath);
			copy(hotspot[get(pic)].atv, hsatv);
			set(hotspot[get(pic)].visible,false);
			set(hotspot[get(pic)].distorted,true);
			set(hotspot[get(pic)].zorder,20);
			set(hotspot[get(pic)].scale,0.1);
			set(hotspot[get(pic)].alpha,0.0);
			<!--set(hotspot[get(pic)].effect,glow(0xFFFFFF,1.0,30,10000);dropshadow(10,45,0x000000,10,0.3););-->
			set(hotspot[get(pic)].onloaded, flyin(get(name)) );
			set(hotspot[get(pic)].onclick, flyout(get(name)) );
			set(hotspot[get(pic)].onhover, showtext(%1, mediacaptiontextstyle) );
			copy(hotspot[get(pic)].url,picfilename); 
			set(picname,get(name));'./*sets the picname so the javascript cycle picks it up and puts in the caption*/'
		,
			flyin(get(pic));
			set(picname,get(name));'./*sets the picname so the javascript cycle picks it up and puts in the caption*/'
		);
	</action>
	<action name="showvideo">
		set(videoname,get(name));'./*sets the picname so the javascript cycle picks it up and puts in the caption*/'
	</action>

	
	
	
		
		        
	
	
	
</krpano>
	';
	return $xml;
}





//algo taken from http://mathforum.org/library/drmath/view/55417.html
function getHeading($lat1, $lon1, $lat2, $lon2){
	//echo $lat1.' '.$lon1.' '.$lat2.' '.$lon2.'*';
	$lat1*=pi()/180;
	$lon1*=pi()/180;
	$lat2*=pi()/180;
	$lon2*=pi()/180;
	
	$dlat = $lat2 - $lat1;
	$dlon = $lon2 - $lon1;
	$y = sin($lon2-$lon1)*cos($lat2);
	$x = cos($lat1)*sin($lat2)-sin($lat1)*cos($lat2)*cos($lon2-$lon1);
	$tc1=1000;
	if ($y > 0){
	    if ($x > 0)  $tc1 = atan_degrees($y/$x);
	    if ($x < 0)  $tc1 = 180 - atan_degrees(-1*$y/$x);
	    if ($x == 0)  $tc1 = 90;
	    //die('awefwaef');
	}
	if ($y < 0){
	    if ($x > 0)  $tc1 = -1*atan_degrees(-$y/$x);
	    if ($x < 0)  $tc1 = atan_degrees($y/$x)-180;
	    if ($x == 0)  $tc1 = 270;
	    //die('awefwaefwaef');
	}
	if ($y == 0){
	    if ($x > 0)  $tc1 = 0;
	    if ($x < 0)  $tc1 = 180;
	    if ($x == 0)  $tc1=0;//the two points are the same
	    //die('wwefawefwaefwaef');
	}
	if($tc1<0)$tc1+=360;
	
	//$tc1=360-$tc1;
	//echo $tc1;exit;
	return round($tc1);
}
function atan_degrees($rad){
	return atan($rad)*180/pi();
}

































function generateRadarMap($panos, $imagefile, $mapminlat, $mapmaxlat, $mapminlon, $mapmaxlon){
	$imwidth=200;
	$imheight=250;

	$mapimg=@imagecreatefromjpeg($imagefile);
	if(!$mapimg)echo $imagefile;
	
	foreach($panos as $pano){
		$im=imagecreatetruecolor($imwidth, $imheight);

		$londif=$mapmaxlon-$mapminlon;
		$xpercent=($mapmaxlon-$pano['lon'])/$londif;     
		$xoffset=(1-$xpercent) * imagesx($mapimg) - ($imwidth/2);
			
		$latdif=$mapmaxlat-$mapminlat;
		$ypercent=($mapmaxlat-$pano['lat'])/$latdif;     
		$yoffset=($ypercent) * imagesy($mapimg) - ($imheight/2);
		imagecopyresampled($im,$mapimg,0,0,$xoffset,$yoffset,$imwidth, $imheight,$imwidth, $imheight);

		$panodot = @ImageCreateFromPng('img/hotspot1_pano.png');
		//if($pano['music']=='')
			//$panodot = @ImageCreateFromPng('img/hotspot2_pano.png');
		
		if(!$panodot)die('sdf');
		$panodotsize=25;//how big do you want the image to show up?
		imagecopyresampled($im,$panodot,($imwidth/2-$panodotsize/2),($imheight/2-$panodotsize/2),0,0,$panodotsize,$panodotsize,imagesx($panodot),imagesy($panodot));
		
		$file = @imagepng($im,dirname($pano['path']).'/radarmap.png');chmod(dirname($pano['path']).'/radarmap.png', 0777);
		

		if(!$file){
			//echo ('IMG FAILED: '.dirname($pano['path']).'/radarmap.png<br>');
			//exit;
		}else{
			//echo dirname($pano['path']).'/radarmap.png'."<br>";
		}
	}
}

function getHeadingVertDB($i, $j, $heading, $vert, $whichone){
	$q=query("select * from app_pano_link where srcpano=".$i." and dstpano=".$j);
	if(num($q)==0){
		if($whichone=='vert')return $vert;
		if($whichone=='heading')return $heading;
	}
	else{
		$r=rows($q);
		if($r['xdeg']==0 && $r['ydeg']==0){
			if($whichone=='vert')return $vert;
			if($whichone=='heading')return $heading;
		}
		else{
			if($whichone=='vert')return $r['ydeg'];
			if($whichone=='heading')return $r['xdeg'];
		}
	}
}
function getHeadingVert($i, $j, $heading, $vert, $whichone){
	
	if($i==0 && $j==8)$heading=260;
	if($i==0 && $j==8)$vert=6;
	if($i==0 && $j==8)$vert=6;
	if($i==4 && $j==22)$heading=25;
	if($i==5 && $j==22)$heading=230;
	if($i==6 && $j==7)$heading=28;
	if($i==7 && $j==6)$vert=6;
	if($i==7 && $j==15)$vert=6;
	if($i==10 && $j==23)$heading=7;
	if($i==10 && $j==23)$vert=3;
	if($i==11 && $j==23)$heading=10;
	if($i==13 && $j==17)$heading=57;
	if($i==14 && $j==3)$heading=173;
	if($i==14 && $j==3)$vert=-3;
	if($i==15 && $j==18)$heading=7;
	if($i==15 && $j==7)$heading=42;
	if($i==15 && $j==24)$heading=210;
	if($i==15 && $j==9)$heading=175;
	if($i==15 && $j==16)$heading=55;
	if($i==15 && $j==24)$heading=215;
	if($i==15 && $j==22)$heading=15;
	if($i==20 && $j==23)$heading=160;
	if($i==20 && $j==24)$heading=125;
	if($i==21 && $j==24)$heading=100;
	if($i==22 && $j==5)$heading=322;
	if($i==22 && $j==24)$heading=50;
	if($i==22 && $j==4)$heading=40;
	if($i==22 && $j==16)$heading=150;
	if($i==22 && $j==16)$vert=3;
	if($i==23 && $j==10)$heading=310;
	if($i==23 && $j==10)$vert=-25;
	if($i==23 && $j==11)$heading=293;
	if($i==24 && $j==13)$heading=161;
	if($i==24 && $j==16)$heading=206;
	if($i==24 && $j==12)$heading=211;
	if($i==24 && $j==22)$heading=215;
	if($i==24 && $j==21)$heading=235;
	if($i==24 && $j==15)$heading=30;

	
	if($i==0 && $j==1){$vert=-2.43;$heading=93.81;}
	if($i==0 && $j==8){$vert=5.49;$heading=-104.26;}
	if($i==0 && $j==9){$vert=3.13;$heading=234.2;}
	if($i==0 && $j==13){$vert=1.59;$heading=33.1;}
	if($i==0 && $j==16){$vert=2.12;$heading=-27.01;}
	if($i==1 && $j==0){$vert=4.5;$heading=-94.06;}
	if($i==2 && $j==3){$vert=0.07;$heading=5.55;}
	if($i==2 && $j==16){$vert=0.17;$heading=-469;}
	if($i==3 && $j==2){$vert=2.17;$heading=185.4;}
	if($i==3 && $j==14){$vert=-0.07;$heading=352.66;}
	if($i==3 && $j==45){$vert=-0.28;$heading=270.41;}
	if($i==4 && $j==25){$vert=11.69;$heading=161.23;}
	if($i==4 && $j==67){$vert=12;$heading=27.1;}
	if($i==5 && $j==28){$vert=6.25;$heading=93.41;}
	if($i==5 && $j==32){$vert=10.19;$heading=228;}
	if($i==5 && $j==22){$vert=10.79;$heading=-491.66;}
	if($i==6 && $j==7){$vert=6.16;$heading=407.72;}
	if($i==6 && $j==34){$vert=3.8;$heading=31;}
	if($i==7 && $j==6){$vert=8.12;$heading=-129.68;}
	if($i==7 && $j==14){$vert=8.25;$heading=161.9;}
	if($i==7 && $j==15){$vert=10.52;$heading=144.31;}
	if($i==7 && $j==34){$vert=6.18;$heading=230.26;}
	if($i==7 && $j==45){$vert=7.38;$heading=210.4;}
	if($i==8 && $j==0){$vert=5.21;$heading=90;}
	if($i==8 && $j==16){$vert=2.33;$heading=363.8;}
	if($i==8 && $j==44){$vert=1.25;$heading=319;}
	if($i==9 && $j==12){$vert=2.18;$heading=-9.08;}
	if($i==9 && $j==44){$vert=0.52;$heading=-21;}
	//if($i==9 && $j==0){$vert=0.83;$heading=;}
	//if($i==10 && $j==23){$vert=;$heading=;}
	if($i==10 && $j==41){$vert=10;$heading=318;}
	if($i==10 && $j==43){$vert=9.82;$heading=368.7;}
	if($i==11 && $j==35){$vert=4;$heading=10.6;}
	if($i==11 && $j==37){$vert=6.5;$heading=99.9;}
	if($i==12 && $j==16){$vert=0.23;$heading=57.6;}
	if($i==12 && $j==19){$vert=0.23;$heading=-101.4;}
	if($i==12 && $j==9){$vert=0.24;$heading=-188.95;}
	if($i==12 && $j==22){$vert=0.27;$heading=17.08;}
	if($i==12 && $j==44){$vert=6.87;$heading=210.28;}
	if($i==12 && $j==51){$vert=-0.81;$heading=333.5;}
	if($i==12 && $j==52){$vert=-0.77;$heading=339;}
	if($i==12 && $j==24){$vert=0.12;$heading=388.6;}
	if($i==13 && $j==0){$vert=0.77;$heading=-138.9;}
	if($i==13 && $j==16){$vert=0.9;$heading=-58.9;}
	if($i==13 && $j==24){$vert=0.32;$heading=-13.27;}
	if($i==13 && $j==44){$vert=-0.2;$heading=-84.5;}
	if($i==13 && $j==47){$vert=3.27;$heading=44.8;}
	if($i==14 && $j==3){$vert=-3;$heading=-178.72;}
	if($i==14 && $j==7){$vert=1.22;$heading=-29.5;}
	if($i==15 && $j==7){$vert=-0.03;$heading=41.7;}
	if($i==15 && $j==24){$vert=-0.71;$heading=-139.1;}
	if($i==15 && $j==45){$vert=2.89;$heading=-195;}
	if($i==15 && $j==54){$vert=-1.27;$heading=-475.5;}
	if($i==15 && $j==66){$vert=-2.9;$heading=-112.8;}
	if($i==15 && $j==48){$vert=1.05;$heading=10.3;}
	if($i==16 && $j==0){$vert=0.11;$heading=-204.8;}
	if($i==16 && $j==2){$vert=3.2;$heading=69.8;}
	if($i==16 && $j==8){$vert=0.27;$heading=-175.9;}
	if($i==16 && $j==12){$vert=5.97;$heading=-92.73;}
	if($i==16 && $j==22){$vert=3.28;$heading=-37.31;}
	if($i==16 && $j==24){$vert=4.59;$heading=20.59;}
	if($i==17 && $j==47){$vert=7.11;$heading=-128.8;}
	if($i==18 && $j==48){$vert=3.85;$heading=195;}
	if($i==18 && $j==50){$vert=-0.79;$heading=256.58;}
	if($i==18 && $j==49){$vert=3.87;$heading=249.99;}
	if($i==19 && $j==12){$vert=7.43;$heading=117.6;}
	if($i==20 && $j==24){$vert=9.15;$heading=145.87;}
	if($i==20 && $j==55){$vert=4.84;$heading=43.7;}
	if($i==21 && $j==59){$vert=12.53;$heading=315.29;}
	if($i==21 && $j==65){$vert=7.8;$heading=102;}
	if($i==21 && $j==56){$vert=7.8;$heading=102;}
	if($i==22 && $j==5){$vert=2.2;$heading=41.4;}
	if($i==22 && $j==16){$vert=6.11;$heading=508.53;}
	if($i==22 && $j==32){$vert=23.73;$heading=-57.67;}
	if($i==22 && $j==67){$vert=0.69;$heading=41.56;}
	if($i==23 && $j==16){$vert=1.49;$heading=52.8;}
	if($i==23 && $j==24){$vert=6.8;$heading=121.9;}
	if($i==23 && $j==35){$vert=1.75;$heading=298.4;}
	if($i==23 && $j==43){$vert=-22.9;$heading=307.96;}
	if($i==23 && $j==37){$vert=14.65;$heading=257.65;}
	if($i==24 && $j==12){$vert=1.93;$heading=-149.86;}
	if($i==24 && $j==13){$vert=0.48;$heading=152;}
	if($i==24 && $j==15){$vert=1.95;$heading=28.3;}
	if($i==24 && $j==16){$vert=2;$heading=-161;}
	if($i==24 && $j==20){$vert=1.6;$heading=8.1;}
	if($i==24 && $j==45){$vert=2;$heading=52;}
	if($i==24 && $j==55){$vert=1.7;$heading=18.85;}
	if($i==24 && $j==56){$vert=1.3;$heading=-128;}
	if($i==24 && $j==12){$vert=1.93;$heading=-149.86;}
	//if($i==24 && $j==23){$vert=use existing;$heading=;}
	if($i==24 && $j==30){$vert=-2.63;$heading=-144.5;}
	if($i==25 && $j==4){$vert=10;$heading=298;}
	if($i==25 && $j==67){$vert=10;$heading=373;}
	if($i==26 && $j==27){$vert=10;$heading=23;}
	if($i==26 && $j==64){$vert=10;$heading=207;}
	if($i==26 && $j==67){$vert=10;$heading=196;}
	if($i==27 && $j==26){$vert=26;$heading=192;}
	if($i==28 && $j==5){$vert=10;$heading=332;}
	if($i==28 && $j==32){$vert=10;$heading=200;}
	if($i==29 && $j==63){$vert=7;$heading=237;}
	if($i==30 && $j==63){$vert=2;$heading=-150;}
	if($i==30 && $j==24){$vert=4.1;$heading=32.4;}
	if($i==31 && $j==46){$vert=19.02;$heading=-42.6;}
	if($i==31 && $j==63){$vert=20;$heading=151;}
	if($i==32 && $j==5){$vert=4;$heading=-40;}
	if($i==32 && $j==28){$vert=10;$heading=-3;}
	if($i==32 && $j==63){$vert=-23;$heading=-58;}
	if($i==32 && $j==22){$vert=26;$heading=-231;}
	if($i==32 && $j==46){$vert=3;$heading=-51;}
	if($i==33 && $j==34){$vert=3;$heading=-163;}
	if($i==34 && $j==6){$vert=8;$heading=-125;}
	if($i==34 && $j==7){$vert=10;$heading=206;}
	if($i==34 && $j==33){$vert=8;$heading=34;}
	if($i==35 && $j==11){$vert=10;$heading=606;}
	if($i==35 && $j==23){$vert=10;$heading=511;}
	if($i==35 && $j==36){$vert=25;$heading=329;}
	if($i==36 && $j==35){$vert=27;$heading=126;}
	if($i==36 && $j==38){$vert=13;$heading=-46;}
	if($i==37 && $j==11){$vert=12;$heading=-36;}
	if($i==37 && $j==23){$vert=15.45;$heading=395.7;}
	if($i==38 && $j==36){$vert=18;$heading=147;}
	if($i==38 && $j==39){$vert=12;$heading=238;}
	if($i==39 && $j==38){$vert=17;$heading=416;}
	if($i==39 && $j==40){$vert=9;$heading=372;}
	if($i==40 && $j==39){$vert=18;$heading=138;}
	if($i==41 && $j==10){$vert=10;$heading=123;}
	if($i==41 && $j==43){$vert=17;$heading=67;}
	if($i==42 && $j==43){$vert=15;$heading=140;}
	if($i==43 && $j==10){$vert=13;$heading=160;}
	if($i==43 && $j==41){$vert=16;$heading=278;}
	if($i==43 && $j==42){$vert=16;$heading=316;}
	if($i==43 && $j==23){$vert=34.5;$heading=99.6;}
	if($i==44 && $j==8){$vert=-0.66;$heading=144.8;}
	if($i==44 && $j==9){$vert=-0.47;$heading=-188;}
	if($i==44 && $j==12){$vert=5;$heading=36;}
	if($i==44 && $j==13){$vert=-1.85;$heading=95.5;}
	if($i==44 && $j==53){$vert=4;$heading=-90;}
	if($i==45 && $j==3){$vert=1.09;$heading=105.97;}
	if($i==45 && $j==7){$vert=0.72;$heading=35.66;}
	if($i==45 && $j==15){$vert=2.79;$heading=-8.95;}
	if($i==45 && $j==24){$vert=0.24;$heading=-91.26;}
	if($i==45 && $j==47){$vert=-2.36;$heading=-171.18;}
	if($i==45 && $j==2){$vert=1.35;$heading=-249;}
	if($i==46 && $j==31){$vert=-9.16;$heading=152.25;}
	if($i==46 && $j==32){$vert=0;$heading=152;}
	if($i==46 && $j==64){$vert=-0.35;$heading=112.6;}
	if($i==47 && $j==13){$vert=2.8;$heading=-141;}
	if($i==47 && $j==17){$vert=4.3;$heading=93.22;}
	if($i==47 && $j==45){$vert=0.08;$heading=-4;}
	if($i==48 && $j==18){$vert=-3.03;$heading=-353.74;}
	//if($i==48 && $j==15){$vert=use existing;$heading=;}
	if($i==49 && $j==50){$vert=2.4;$heading=64.53;}
	if($i==49 && $j==18){$vert=3.05;$heading=80.4;}
	if($i==50 && $j==18){$vert=3.9;$heading=175.2;}
	if($i==50 && $j==49){$vert=2.5;$heading=220.4;}
	if($i==51 && $j==12){$vert=2.95;$heading=109.48;}
	if($i==52 && $j==12){$vert=3.4;$heading=150.4;}
	if($i==53 && $j==44){$vert=4.63;$heading=120.6;}
	if($i==54 && $j==15){$vert=5.17;$heading=-8.6;}
	if($i==54 && $j==66){$vert=5.76;$heading=-32.12;}
	if($i==55 && $j==20){$vert=5.25;$heading=-154.6;}
	if($i==55 && $j==24){$vert=14.4;$heading=-247.7;}
	if($i==56 && $j==65){$vert=9.11;$heading=341.9;}
	if($i==56 && $j==24){$vert=7.2;$heading=425.71;}
	if($i==57 && $j==58){$vert=12.42;$heading=274.8;}
	if($i==57 && $j==65){$vert=9.51;$heading=434.5;}
	if($i==58 && $j==57){$vert=11.54;$heading=168.34;}
	if($i==58 && $j==65){$vert=12.1;$heading=350.93;}
	if($i==59 && $j==21){$vert=12.3;$heading=102.2;}
	if($i==60 && $j==61){$vert=6.2;$heading=-244.76;}
	if($i==60 && $j==62){$vert=10.34;$heading=-327.9;}
	if($i==61 && $j==60){$vert=4.9;$heading=351.99;}
	if($i==61 && $j==62){$vert=1.58;$heading=387.5;}
	if($i==62 && $j==60){$vert=11;$heading=247.4;}
	if($i==62 && $j==61){$vert=8.21;$heading=155.62;}
	if($i==62 && $j==65){$vert=33;$heading=136.74;}
	if($i==63 && $j==29){$vert=9.7;$heading=18.6;}
	if($i==63 && $j==30){$vert=2.45;$heading=125;}
	if($i==63 && $j==31){$vert=19;$heading=-45.6;}
	if($i==63 && $j==32){$vert=35.35;$heading=131;}
	if($i==64 && $j==26){$vert=4.21;$heading=-195.91;}
	if($i==64 && $j==46){$vert=5.49;$heading=-362.88;}
	if($i==64 && $j==67){$vert=12.34;$heading=194.4;}
	if($i==64 && $j==32){$vert=0.37;$heading=-78.55;}
	if($i==65 && $j==56){$vert=11;$heading=-231;}
	if($i==65 && $j==57){$vert=10;$heading=-463;}
	if($i==65 && $j==58){$vert=1.58;$heading=-416.03;}
	if($i==65 && $j==21){$vert=1.95;$heading=-408.9;}
	if($i==65 && $j==62){$vert=-22.36;$heading=-401.86;}
			
	if($i==66 && $j==15){$vert=8.94;$heading=-272.5;}
	if($i==66 && $j==54){$vert=6.67;$heading=143.23;}
			
	if($i==67 && $j==25){$vert=8.6;$heading=160;}
	if($i==67 && $j==26){$vert=4.1;$heading=-31.09;}
	if($i==67 && $j==4){$vert=9;$heading=-73.5;}
	if($i==67 && $j==22){$vert=6;$heading=134;}
	if($i==67 && $j==64){$vert=4.14;$heading=-47;}
	
	if($i==2 && $j==24){$vert=0;$heading=-91.61;}
	if($i==24 && $j==2){$vert=1;$heading=89.16;}
	
	$heading=$heading%360;
	
	if($whichone=='vert')return $vert;
	if($whichone=='heading')return $heading;
}


function formatcaption($c){
	$c=wordwrap($c, 80, '[br]');//how many chars
	
	$ent = array(
	'�' =>'&#233;',
	"'" =>'&#39;'
	); 

	$c=str_replace(array("'",",",'"'),array("`",";",'`'),htmlnumericentities($c));
	return $c;
}

function htmlnumericentities($str){
  return preg_replace('/[^!-%\x27-;=?-~ ]/e', '"&#".ord("$0").chr(59)', $str);
} 

?>