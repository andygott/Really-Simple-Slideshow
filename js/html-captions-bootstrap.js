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
		},
		slide_data_selectors: {
   			caption: {selector: 'div.caption', attr: false}
		}
	};
	$('.rs-slideshow').rsfSlideshow(opts);
	
});
