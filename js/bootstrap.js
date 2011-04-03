/**
*	Bootstrap the javascript
*/

$(document).ready(function () {

	$('#slideshow').rsfSlideshow();
	$('#slideshow-2').rsfSlideshow({
		interval: 3,
		transition: 500,
		effect: 'slideLeft'
	});
	
});
