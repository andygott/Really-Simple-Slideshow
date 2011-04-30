/**
*	Bootstrap the javascript
*/

$(document).ready(function () {
	
	var opts = {
		controls: {
			playPause: {auto: true},
			previousSlide: {auto: true},
			nextSlide: {auto: true},
			index: {auto: true}
		}
	};
	$('.rs-slideshow').rsfSlideshow(opts);
	
});
