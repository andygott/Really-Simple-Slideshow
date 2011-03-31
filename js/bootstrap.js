/**
*	Bootstrap the javascript
*/

$(document).ready(function () {

	$('#slideshow').rsfSlideshow({
		effect: {
			effects: Array('slideUp', 'slideLeft', 'slideRight'),
			iteration: 'backAndForth'
		}
	});
	
});
