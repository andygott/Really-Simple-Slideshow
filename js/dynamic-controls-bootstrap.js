/**
*	Bootstrap the javascript
*/

$(document).ready(function () {
	
	var opts = {
		effect: {
			effects: Array('slideDown', 'slideLeft', 'slideUp', 'slideRight'),
			iteration: 'loop'
		},
		transition: 300,
		controls: {
			playPause: {auto: true},
			previousSlide: {auto: true},
			nextSlide: {auto: true},
			index: {auto: true}
		}
	};
	$('.rs-slideshow').rsfSlideshow(opts);
	
});
