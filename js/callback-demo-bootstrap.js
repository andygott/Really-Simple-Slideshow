/**
*	Bootstrap the javascript
*/

$(document).ready(function () {

	$('.rs-slideshow').rsfSlideshow({
		slide_data_selectors: {class: {selector: 'a', attr: 'data-class'}}
	});
	
	$('#slideshow').bind('rsPostTransition', function(e, slide) {
		var html = '<h3>A transition has completed!</h3>';
		html += '<p>Slide data:</p><ul>';
		html += '<li>Slide key: ' + slide.slide_key + '</li>';
		for (var key in slide.slide) {
			html += '<li>' + key + ': ' + slide.slide[key] + '</li>';
		}
		html += '</ul>';
		$('#callback-messages').html(html); 
	});
	
	//	Do after transition into the first slide
	$('#slideshow').bind('rsFirstSlide', function(e, event_data) {
		$('#callback-messages').append('<p><strong>This is the first slide</strong></p>'); 
	});
	
	//	Do after transition into the last slide
	$('#slideshow').bind('rsLastSlide', function(e, event_data) {
		$('#callback-messages').append('<p><strong>This is the last slide</strong></p>'); 
	});
	
	//	Do when each slide is ready for transition
	$('#slideshow').bind('rsSlideReady', function(e, event_data) {
		if (event_data.slide.class) {
			event_data.$slide.addClass(event_data.slide.class);
			$('#slide-class-message').html('<p><strong>Added the class ‘' + event_data.slide.class + '’ to this slide using a custom handler for the rsSlideReady event.</strong></p>'); 
		}
		else {
			$('#slide-class-message').html('<p><strong>There is no custom class for this slide.</strong></p>'); 
		}
	});
	
	
	
});
