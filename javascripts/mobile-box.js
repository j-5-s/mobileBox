//#Todo
// * Determine the height and width of the mobie app
// * Determine if it is a mobile smartphone device
// * Create clean looking UI
//    * Top nav
//    * bottom nav
// * Swipe / gestures (optional, relies on )


/*global jQuery:true, Image, document */
(function( $, document, window ){
	'use strict';

	var screenWidth  = $(window).width(),
		screenHeight = $(window).height(),
		layout       = 'landscape';

	//template for mobileBox
	var template = [
		'<div class="mobileBox">',
			'<img src="{src}" />',
		'</div>'
	].join('');


	$.fn.mobileBox = function( options ) {
		
		$(this).click(function(){
			
			var dfd = $.Deferred();

			var href = $(this).attr('href'),
				img  = new Image();
				img.src = href;

			$(img).load(function(e){
				var target = e.currentTarget;
				if (target.width < target.height) {
					layout = 'portrait';
				}
				dfd.resolve( target.width, target.height );
			});

			dfd.done(function(width, height){
				console.log( width, height, layout );
			});
		});
	};


}( jQuery, document, this ));