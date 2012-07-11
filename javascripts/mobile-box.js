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

	var screenWidth  = $( window ).width( ),
		screenHeight = $( window ).height( ),
		layout       = 'landscape';

	//template for mobileBox
	var template = [
		'<div class="mobileBox">',
			'<div class="mobileBoxHeader">',
				'<span class="mobileBoxDone"><a href="#done">Done</a></span>',
				'<span class="mobileBoxTitle">{title}</span>',
			'</div>',
			'<img src="{src}" />',
			'<div class="mobileBoxSlider">',
				'<ul>',
					'<li class="mobileBoxLeft"><a href="#">left</a></li>',
					'<li class="mobileBoxRight"><a href="#">right</a></li>',
				'</ul>',
			'</div>',
		'</div>'
	].join('');


	$.fn.mobileBox = function( options ) {
		
		$( this ).click( function( ) {
			
			var dfd = $.Deferred();

			var href    = $( this ).attr( 'href' ),
				title   = $( this ).attr( 'title' ),
				img     = new Image();
				img.src = href;

			$( img ).load( function( e ) {
				var target = e.currentTarget;
				if ( target.width < target.height ) {
					layout = 'portrait';
				}

				dfd.resolve( target.width, target.height );
			});

			dfd.done( function( width, height ){
				template = template.replace('{src}', href ).replace( '{title}', title );
				
			
				$( 'body' ).prepend( template );
				$( '.mobileBoxDone a' ).bind( 'click', closeBox );
			});

			//@TODO rather than return false, I should unbind
			//to any mobileBox el prior to calling?
			return false;	
		});

		var closeBox = function( ) {
			$( '.mobileBox' ).remove( );
		};
	};


}( jQuery, document, this ));