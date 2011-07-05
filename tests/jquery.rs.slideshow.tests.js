
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
			$('#slideshow').data('rsf_slideshow').slides[3].url,
			'http://example.com/image.png'
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
				$('#slideshow').data('rsf_slideshow').slides[3][key],
				slide[key]
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
					$('#slideshow').data('rsf_slideshow').slides[(3 + i)][key],
					slides[i][key]
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
		expect(3);
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
		equal($('#slideshow').data('rsf_slideshow').slides.length, 3);
		$('#slideshow').rsfSlideshow('removeSlides');
		equal($('#slideshow').data('rsf_slideshow').slides.length, 0);
	});
	
	test("Using slide index", function() {							
		$('.rs-slideshow').rsfSlideshow({autostart: false});
		equal($('#slideshow').data('rsf_slideshow').slides.length, 3);
		$('#slideshow').rsfSlideshow('removeSlides', 1);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 2);
		$('#slideshow').rsfSlideshow('removeSlides', 0);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 1);
	});
	
	test("Using array: [1,2]", function() {							
		$('.rs-slideshow').rsfSlideshow({autostart: false});
		equal($('#slideshow').data('rsf_slideshow').slides.length, 3);
		$('#slideshow').rsfSlideshow('removeSlides', [1,2]);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 1);
	});
	
	test("Using array: [1,1,2]", function() {							
		$('.rs-slideshow').rsfSlideshow({autostart: false});
		equal($('#slideshow').data('rsf_slideshow').slides.length, 3);
		$('#slideshow').rsfSlideshow('removeSlides', [1,1,2]);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 1);
	});
	
	test("Using array: [0,0,0]", function() {							
		$('.rs-slideshow').rsfSlideshow({autostart: false});
		equal($('#slideshow').data('rsf_slideshow').slides.length, 3);
		$('#slideshow').rsfSlideshow('removeSlides', [0,0,0]);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 2);
	});
	
	
	/**
	*	startShow()
	*/
	module("startShow()");
	
	asyncTest("Without params", function(){
		expect(1);
		$('.rs-slideshow').rsfSlideshow({
			autostart: false
	    }).bind('rsPostTransition', function(e, data) {
			deepEqual(
				$('#slideshow').data('rsf_slideshow').slides[1], 
				data.slide);
			$('.rs-slideshow').rsfSlideshow('stopShow');
			start();
		}).rsfSlideshow('startShow');

	});

	asyncTest("Using interval", function(){
		expect(1);
		$('.rs-slideshow').rsfSlideshow({
			autostart: false
	    }).bind('rsPostTransition', function(e, data) {
			deepEqual(
				$('#slideshow').data('rsf_slideshow').slides[1], 
				data.slide);
			$('.rs-slideshow').rsfSlideshow('stopShow');
			start();
		}).rsfSlideshow('startShow', 1);
	});
	
	asyncTest("Using interval & instant flag", function(){
		expect(1);
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
		expect(1);
		$('.rs-slideshow').rsfSlideshow({
			autostart: false
	    }).bind('rsPostTransition', function(e, data) {
			$(this).rsfSlideshow('stopShow');
		}).bind('rsStopShow', function(e, data) {
			equal($(this).data('rsf_slideshow').interval_id, false);
			start();
		}).rsfSlideshow('startShow');
	});
	
	
	/**
	*	toggleShow(), isRunning()
	*/
	module("toggleShow(), isRunning()");
	
	asyncTest("toggleShow(), isRunning()", function(){
		expect(2);
		$('.rs-slideshow').rsfSlideshow().bind('rsPostTransition', function(e, data) {
			$(this).rsfSlideshow('toggleShow');
		}).bind('rsStopShow', function(e, data) {
			$(this).unbind('rsStopShow');
			equal($(this).rsfSlideshow('isRunning'), false);
			$(this).rsfSlideshow('toggleShow');
		}).bind('rsStartShow', function(e, data) {
			$(this).unbind('rsStartShow');
			equal($(this).rsfSlideshow('isRunning'), true);
			$(this).rsfSlideshow('stopShow');
			start();
		}).rsfSlideshow('startShow');
	});
	
	
	/**
	*	nextSlide(), previousSlide(), goToSlide()
	*/
	module("Slide Iteration & Navigation");
	
	asyncTest("nextSlide()", function(){
		expect(2);
		$('.rs-slideshow').rsfSlideshow({
			autostart: false
	    }).bind('rsPostTransition', function(e, data) {
		 	var $caption = $('.slide-container .slide-caption'),
				$img = $('.slide-container img');
			equal($img.attr('src'), '../images/morzine-2011-a.png');
			equal($caption.html(), 'This is the second slide');
			start();
		}).rsfSlideshow('nextSlide');
	});
	
	asyncTest("previousSlide()", function(){
		expect(2);
		$('.rs-slideshow').rsfSlideshow({
			autostart: false
	    }).bind('rsPostTransition', function(e, data) {
		 	var $caption = $('.slide-container .slide-caption'),
				$img = $('.slide-container img');
			equal($img.attr('src'), '../images/morzine-2011-b.png');
			equal($caption.html(), 'This is the third slide');
			start();
		}).rsfSlideshow('previousSlide');
	});
	
	asyncTest("goToSlide()", function(){
		expect(2);
		$('.rs-slideshow').rsfSlideshow({
			autostart: false
	    }).bind('rsPostTransition', function(e, data) {
		 	var $caption = $('.slide-container .slide-caption'),
				$img = $('.slide-container img');
			equal($img.attr('src'), '../images/morzine-2011-c.png');
			equal($caption.html(), 'This is the first slide');
			start();
		}).rsfSlideshow('goToSlide', 0);
	});
	
	
	
	/**
	*	getSlidesFromMarkup()
	*/
	module("getSlidesFromMarkup()");
	
	test("Without params", function() {	
		$('.rs-slideshow').rsfSlideshow();
		$('#slideshow .slides li').each(function(i) {
			equal(
				$('#slideshow').data('rsf_slideshow').slides[i].url,
				$(this).children('a').attr('href')
			);
			equal(
				$('#slideshow').data('rsf_slideshow').slides[i].caption,
				$(this).children('a').attr('title')
			);
		});
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