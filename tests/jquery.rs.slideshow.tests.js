
/**
*	QUnit tests
*/

$(document).ready(function() {
	
	
	/**
	*	getSlideData
	*/
	module("getSlideData");
	
	test("getSlideData()", function() {							
		$('.rs-slideshow').rsfSlideshow({autostart: false});
		deepEqual(
			$('#slideshow').rsfSlideshow('getSlideData'),
			$('#slideshow').data('rsf_slideshow').slides
		);
	});
	
	test("getSlideData(key)", function() {							
		$('.rs-slideshow').rsfSlideshow({autostart: false});
		expect($('#slideshow').data('rsf_slideshow').slides.length);
		for (var i = 0, len = $('#slideshow').data('rsf_slideshow').slides.length; i < len; i ++) {
			deepEqual(
				$('#slideshow').rsfSlideshow('getSlideData', i),
				$('#slideshow').data('rsf_slideshow').slides[i]
			);
		}
	});
	
	
	/**
	*	removeSlides
	*/
	module("removeSlides");
	
	test("removeSlides()", function() {	
		$('.rs-slideshow').rsfSlideshow({autostart: false});
		expect(2);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 3);
		$('#slideshow').rsfSlideshow('removeSlides');
		equal($('#slideshow').data('rsf_slideshow').slides.length, 0);
	});
	
	test("removeSlides(key)", function() {							
		$('.rs-slideshow').rsfSlideshow({autostart: false});
		expect(3);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 3);
		$('#slideshow').rsfSlideshow('removeSlides', 1);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 2);
		$('#slideshow').rsfSlideshow('removeSlides', 0);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 1);
	});
	
	test("removeSlides([1,2])", function() {							
		$('.rs-slideshow').rsfSlideshow({autostart: false});
		expect(2);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 3);
		$('#slideshow').rsfSlideshow('removeSlides', [1,2]);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 1);
	});
	
	test("removeSlides([1,1,2])", function() {							
		$('.rs-slideshow').rsfSlideshow({autostart: false});
		expect(2);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 3);
		$('#slideshow').rsfSlideshow('removeSlides', [1,1,2]);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 1);
	});
	
	test("removeSlides([0,0,0])", function() {							
		$('.rs-slideshow').rsfSlideshow({autostart: false});
		expect(2);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 3);
		$('#slideshow').rsfSlideshow('removeSlides', [0,0,0]);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 2);
	});
	
	
	/**
	*	Slide Data from Markup
	*/
	module("Slide Data from Markup");
	
	test("Image Src & Caption", function(){
		stop();
		expect(2);
		$('.rs-slideshow').rsfSlideshow({
			autostart: false
	    }).bind('rsPostTransition', function(e, data) {
		 	var $caption = $('.slide-container .slide-caption'),
				$img = $('.slide-container img');
			equal($img.attr('src'), '../images/morzine-2011-a.png');
			equal($caption.html(), 'This is the second slide');
			start();
		}).rsfSlideshow('goToSlide', 1);
	});
	
	test("Image Link Dest", function(){
		stop();
		expect(1);
		$('.rs-slideshow').rsfSlideshow({
			autostart: false
	    }).bind('rsPostTransition', function(e, data) {
		 	var $a = $('.slide-container a');
			equal($a.attr('href'), 'http://reallysimpleworks.com');
			start();
		}).rsfSlideshow('goToSlide', 1);
	});

	test("Image Alt & Title", function(){
		stop();
		expect(2);
		$('.rs-slideshow').rsfSlideshow({
			autostart: false,
			slide_data_selectors: {
				url: {selector: 'a', attr: 'href'},
				caption: {selector: 'a', attr: 'title'},
				link_to: {selector: 'a', attr: 'data-link-to'},
				effect: {selector: 'a', attr: 'data-effect'},
				image_title: {selector: 'a', attr: 'data-image-title'},
				image_alt: {selector: 'a', attr: 'data-image-alt'}
			}
	    }).bind('rsPostTransition', function() {
		 	var $img = $('.slide-container img');
		 	equal($img.attr('alt'), 'The last image in a slideshow demo');
		 	equal($img.attr('title'), 'This is the last slide');
			start();
		}).rsfSlideshow('goToSlide', 2);
	});
	
	
						   
});