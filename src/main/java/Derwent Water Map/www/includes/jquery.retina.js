/*
	Author: Troy Mcilvena (http://troymcilvena.com)
	Twitter: @mcilvena
	Date: 23 August 2010
	Version: 1.0
	
	Revision History:
		1.0 (23/08/2010)	- Initial release.
*/

jQuery.fn.retina = function(retina_part) {
	// Set default retina file part to '-2x'
	// Eg. some_image.jpg will become some_image-2x.jpg
	//var settings = {'retina_part': '-2x'};
	var settings = {'retina_part': '@2x'};
	if(retina_part) jQuery.extend(config, settings);
		
	if(window.devicePixelRatio >= 2) {//put an || true to include hd to all devices
		this.each(function(index, element) {
			if(!$(element).attr('src')) return;
			if($(element).attr('src').search('@2x')>0)return;//it's already formed
			
			
			var new_image_src = $(element).attr('src').replace(/(.+)(\.\w{3,4})$/, "$1"+ settings['retina_part'] +"$2");
			$.ajax({url: new_image_src, type: "HEAD", success: function() {
				//alert(new_image_src);
				//var width=$(element).width();
				$(element).attr('src', new_image_src);
				//if(width>0)
				//	$(element).width(width);
				//$(element).load(function(){
					//var w = this.width;
					//alert(w);
					//if(width>0){
						//alert(w/2)
						//$(element).width(w/2);
					//}
				//})
			}});
		});
	}
	return this;
}