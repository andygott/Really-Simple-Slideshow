
/**
*	QUnit tests
*/

$(document).ready(function() {
	
	
	/**
	*	addSlides
	*/
	module("addSlides()");
	
	test("Using URL only", function() {	
		$('.rs-slideshow').rsfSlideshow({autostart: false});
		$('.rs-slideshow').rsfSlideshow('addSlides', 'http://example.com/image.png');
		equal(
			'http://example.com/image.png',
			$('#slideshow').data('rsf_slideshow').slides[3].url
		);
	});
	
	test("Using a single slide object", function() {
		expect(4);
		$('.rs-slideshow').rsfSlideshow({autostart: false});
		var slide = {
			url: 'http://example.com/image.png',
			caption: 'Test Caption',
			link_to: 'http://example.com/link-to-here',
			custom_value: 'test custome value'
		};
		$('.rs-slideshow').rsfSlideshow('addSlides', slide);
		for (var key in slide) {
			equal(
				slide[key],
				$('#slideshow').data('rsf_slideshow').slides[3][key]
			);
		}
	});
	
	test("Using an array of slide objects (multiple slides)", function() {
		expect(8);
		$('.rs-slideshow').rsfSlideshow({autostart: false});
		var slides = [
			{
				url: 'http://example.com/image.png',
				caption: 'Test Caption',
				link_to: 'http://example.com/link-to-here',
				custom_value: 'test custome value'
			},
			{
				url: 'http://example.com/image2.png',
				caption: 'Test Caption 2',
				link_to: 'http://example.com/link-to-here-2',
				custom_value: 'test custome value 2'
			}
		];
		$('.rs-slideshow').rsfSlideshow('addSlides', slides);
		for (var i = 0, len = slides.length; i < len; i ++) {
			for (var key in slides[i]) {
				equal(
					slides[i][key],
					$('#slideshow').data('rsf_slideshow').slides[(3 + i)][key]
				);
			}
		}
	});
	
	
	/**
	*	getSlideData
	*/
	module("getSlideData()");
	
	test("Without params", function() {	
		$('.rs-slideshow').rsfSlideshow({autostart: false});
		deepEqual(
			$('#slideshow').rsfSlideshow('getSlideData'),
			$('#slideshow').data('rsf_slideshow').slides
		);
	});
	
	test("Using slide index", function() {							
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
	module("removeSlides()");
	
	test("Without params", function() {	
		$('.rs-slideshow').rsfSlideshow({autostart: false});
		expect(2);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 3);
		$('#slideshow').rsfSlideshow('removeSlides');
		equal($('#slideshow').data('rsf_slideshow').slides.length, 0);
	});
	
	test("Using slide index", function() {							
		$('.rs-slideshow').rsfSlideshow({autostart: false});
		expect(3);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 3);
		$('#slideshow').rsfSlideshow('removeSlides', 1);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 2);
		$('#slideshow').rsfSlideshow('removeSlides', 0);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 1);
	});
	
	test("Using array: [1,2]", function() {							
		$('.rs-slideshow').rsfSlideshow({autostart: false});
		expect(2);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 3);
		$('#slideshow').rsfSlideshow('removeSlides', [1,2]);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 1);
	});
	
	test("Using array: [1,1,2]", function() {							
		$('.rs-slideshow').rsfSlideshow({autostart: false});
		expect(2);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 3);
		$('#slideshow').rsfSlideshow('removeSlides', [1,1,2]);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 1);
	});
	
	test("Using array: [0,0,0]", function() {							
		$('.rs-slideshow').rsfSlideshow({autostart: false});
		expect(2);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 3);
		$('#slideshow').rsfSlideshow('removeSlides', [0,0,0]);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 2);
	});
	
	
	/**
	*	startShow()
	*/
	module("startShow()");
	
	asyncTest("Without params", function(){
		$('.rs-slideshow').rsfSlideshow({
			autostart: false
	    }).bind('rsPostTransition', function(e, data) {
console.log($('#slideshow').data('rsf_slideshow').slides);
			deepEqual(
				$('#slideshow').data('rsf_slideshow').slides[1], 
				data.slide);
			$('.rs-slideshow').rsfSlideshow('stopShow');
			start();
		}).rsfSlideshow('startShow');

	});

	asyncTest("Using interval", function(){
		$('.rs-slideshow').rsfSlideshow({
			autostart: false
	    }).bind('rsPostTransition', function(e, data) {
console.log($('#slideshow').data('rsf_slideshow').slides);
			deepEqual(
				$('#slideshow').data('rsf_slideshow').slides[1], 
				data.slide);
			$('.rs-slideshow').rsfSlideshow('stopShow');
			start();
		}).rsfSlideshow('startShow', 1);
	});
	
	asyncTest("Using interval & instant flag", function(){
		$('.rs-slideshow').rsfSlideshow({
			autostart: false
	    }).bind('rsPostTransition', function(e, data) {
			deepEqual(
				$('#slideshow').data('rsf_slideshow').slides[1], 
				data.slide);
			$('.rs-slideshow').rsfSlideshow('stopShow');
			start();
		}).rsfSlideshow('startShow', 1, true);
	});


	/**
	*	stopShow()
	*/
	module("stopShow()");
	
	asyncTest("stopShow()", function(){
		$('.rs-slideshow').rsfSlideshow({
			autostart: false
	    }).bind('rsPostTransition', function(e, data) {
			$(this).rsfSlideshow('stopShow');
		}).bind('rsStopShow', function(e, data) {
			equal(false, $(this).data('rsf_slideshow').interval_id);
			start();
		}).rsfSlideshow('startShow');
	});
	
	
	/**
	*	Slide Data from Markup
	*/
	module("Slide Data from Markup");
	
	asyncTest("Image Src & Caption", function(){
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
	
	asyncTest("Image Link Dest", function(){
		expect(1);
		$('.rs-slideshow').rsfSlideshow({
			autostart: false
	    }).bind('rsPostTransition', function(e, data) {
		 	var $a = $('.slide-container a');
			equal($a.attr('href'), 'http://reallysimpleworks.com');
			start();
		}).rsfSlideshow('goToSlide', 1);
	});

	asyncTest("Image Alt & Title", function(){
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