/**
*	Bootstrap the javascript
*/

$(document).ready(function () {

	$('.rs-slideshow').rsfSlideshow();
	
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
	$('#slideshow').bind('rsFirstSlide', function(slide) {
		$('#callback-messages').append('<p><strong>This is the first slide</strong></p>'); 
	});
	$('#slideshow').bind('rsLastSlide', function(slide) {
		$('#callback-messages').append('<p><strong>This is the last slide</strong></p>'); 
	});
	
	
	
});
