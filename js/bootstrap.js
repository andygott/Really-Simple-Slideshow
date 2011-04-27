/**
*	Bootstrap the javascript
*/

$(document).ready(function () {

	var slides = [];
	var letters = ['a', 'b', 'c'];
	for (var i = 0, len = letters.length; i < len; i ++) {
		slides.push('images/morzine-2011-' + letters[i] + '.png');
	}
	
	$('#slideshow').rsfSlideshow({interval: 2, transition: 800, slides: slides});
	
	$('#slideshow-play-pause').click(function(e) {
		e.preventDefault();
		if ($('#slideshow').rsfSlideshow('isRunning')) {
			$('#slideshow').rsfSlideshow('stopShow');
			return;
		}
		$('#slideshow').rsfSlideshow('startShow', false, true);
	});
	
	$('#slideshow').rsfSlideshow('addCallback', 'startShow', function(slide) {
		$('#slideshow-play-pause').html('Click to pause');
	});
	
	$('#slideshow').rsfSlideshow('addCallback', 'stopShow', function(slide) {
		$('#slideshow-play-pause').html('Click to play');
	});
	
	$('#slideshow-prev').click(function(e) {
		e.preventDefault();
		$('#slideshow').rsfSlideshow('previousSlide');
	});
	
	$('#slideshow-next').click(function(e) {
		e.preventDefault();
		$('#slideshow').rsfSlideshow('nextSlide');
	});
	
	$('#slideshow-start-again').click(function(e) {
		e.preventDefault();
		$('#slideshow').rsfSlideshow('goToSlide', 0);
		$('#slideshow').rsfSlideshow('startShow');
	});
	
	$('#slideshow').rsfSlideshow('addCallback', 'postTransition', function(slide) {
			var html = '<h3>A transition has completed!</h3>';
			html += '<p>Slide data:</p><ul>';
			for (var key in slide) {
				html += '<li>' + key + ': ' + slide[key] + '</li>';
			}
			html += '</ul>';
			var total_slides = $('#slideshow').rsfSlideshow('totalSlides');
			var slide_index = $('#slideshow').rsfSlideshow('currentSlideKey');
			html += '<p>Slide index: ' + slide_index 
				+ ' (slide ' + (slide_index + 1) + ' of ' + total_slides + ')</p>';
			$('#callback-messages').html(html); 
	});
	
	$('#slideshow').rsfSlideshow('addCallback', 'firstSlide', function(slide) {
		$('#callback-messages').append('<p><strong>This is the first slide</strong></p>'); 
	});
	
	$('#slideshow').rsfSlideshow('addCallback', 'lastSlide', function(slide) {
		$('#callback-messages').append('<p><strong>This is the last slide</strong></p>'); 
	});


});
