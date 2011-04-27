/**
*	Bootstrap the javascript
*/

$(document).ready(function () {

	$.rsfSlideshow({interval: 1, transition: 300});
	
	$('.rs-slideshow').rsfSlideshow();
	
	/*$('#slideshow').bind('rsPostTransition', function(e, slide) {
		var html = '<h3>A transition has completed!</h3>';
		html += '<p>Slide data:</p><ul>';
		for (var key in slide) {
			html += '<li>' + key + ': ' + slide[key] + '</li>';
		}
		html += '</ul>';
		$('#callback-messages').html(html); 
	});
	$('#slideshow').bind('rsFirstSlide', function(slide) {
		$('#callback-messages').append('<p><strong>This is the first slide</strong></p>'); 
	});
	$('#slideshow').bind('rsLastSlide', function(slide) {
		$('#callback-messages').append('<p><strong>This is the last slide</strong></p>'); 
	});*/
	
	
	
});
