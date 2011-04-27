/**
*	Bootstrap the javascript
*/

$(document).ready(function () {

	
	$('#slideshow').rsfSlideshow();
	$('#slideshow').rsfSlideshow(
		'addCallback', 
		'postTransition', 
		function(slide) {
			var html = '<h3>A transition has completed!</h3>';
			html += '<p>Slide data:</p><ul>';
			for (var key in slide) {
				html += '<li>' + key + ': ' + slide[key] + '</li>';
			}
			html += '</ul>';
			$('#callback-messages').html(html); 
		}
	);
	$('#slideshow').rsfSlideshow(
		'addCallback', 
		'firstSlide', 
		function(slide) {$('#callback-messages').append('<p><strong>This is the first slide</strong></p>'); }
	);
	$('#slideshow').rsfSlideshow(
		'addCallback', 
		'lastSlide', 
		function(slide) {$('#callback-messages').append('<p><strong>This is the last slide</strong></p>'); }
	);
	
});
