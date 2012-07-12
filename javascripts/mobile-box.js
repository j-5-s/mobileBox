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
		'<div class="mobileBoxWrapper">',
			'<div class="mobileBoxBg"></div>',
			'<div class="mobileBox">',
				'<div class="mobileBoxHeader">',
					'<span class="mobileBoxDone"><a href="#done">Done</a></span>',
					'<span class="mobileBoxTitle">{title}</span>',
				'</div>',
				'<img src="{src}" />',
			'</div>',
		'<div>'
	].join('');


	$.fn.mobileBox = function( options ) {
		var self = this;
		
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

				var spacing = screenHeight - height;
				//spacing must be greater than/equal 0 or set it to zero
				spacing = (spacing >= 0) ? ((spacing/4) + 30) : 0;

				$( '.mobileBox img' ).css({'margin-top': +'px'});
				$( '.mobileBoxDone a' ).bind( 'click', closeBox );
				//bind to the swiping gestures
				swiper( $( '.mobileBox' ) );
			});

			//@TODO rather than return false, I should unbind
			//to any mobileBox el prior to calling?
			return false;
		});

		/**
		 * function to close the slideshow
		 */
		var closeBox = function( ) {
			$( '.mobileBoxWrapper' ).remove( );
		};

		/**
		 * Bind to touch sliding gesture
		 * credits: https://gist.github.com/936253
		 *          http://plugins.jquery.com/project/swipe
		 *          http://ryanscherf.com/demos/swipe/
		 */
		var swiper = function( el ) {
			var self = el;
		
			var originalCoord = { 'x': 0, 'y': 0 },
			    finalCoord = { 'x': 0, 'y': 0 },
			    options = {
					'threshold': {
						'x': 5,
						'y': 10
					},
					'swipeLeft': function() {
						//slide image left
						alert('swiped left');
					},
					'swipeRight': function() {
						//slide image right
						alert('swiped right');
					}
			    };

			function touchStart(event) {

				var touch = event.originalEvent.targetTouches[0];
				originalCoord.x = touch.pageX;
				originalCoord.y = touch.pageY;
			}

			// Store coordinates as finger is swiping
			function touchMove(event) {
				var touch = event.originalEvent.targetTouches[0];
				finalCoord.x = touch.pageX; // Updated X,Y coordinates
				finalCoord.y = touch.pageY;
				event.preventDefault();
			}

			// Swipe was canceled
			function touchCancel() {
				//console.log('Canceling swipe gesture')
			}

			// Done swiping
			// Swipe should only be on X axis, ignore if swipe on Y axis
			// Calculate if the swipe was left or right
			function touchEnd() {
				var changeY = originalCoord.y - finalCoord.y,
				    changeX,
				    threshold = options.threshold,
				    y = threshold.y,
				    x = threshold.x;
				if (changeY < y && changeY > (- y)) {
					changeX = originalCoord.x - finalCoord.x;
					if (changeX > x) {
						options.swipeLeft.call(self);
					} else if (changeX < (- x)) {
						options.swipeRight.call(self);
					}
				}
			}

			$(self)
				.bind('touchstart.swipe', touchStart)
				.bind('touchmove.swipe', touchMove)
				.bind('touchend.swipe', touchEnd)
				.bind('touchcancel.swipe', touchCancel);
		};
	};


}( jQuery, document, this ));