
/**
*	QUnit tests
*/

$(document).ready(function() {
	
	
	/**
	*	getSlideData
	*/
	module("getSlideData");
	
	test("getSlideData()", function() {							
		$('.rs-slideshow').rsfSlideshow();
		deepEqual(
			$('#slideshow').rsfSlideshow('getSlideData'),
			$('#slideshow').data('rsf_slideshow').slides
		);
	});
	
	test("getSlideData(key)", function() {							
		$('.rs-slideshow').rsfSlideshow();
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
		$('.rs-slideshow').rsfSlideshow();
		expect(2);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 3);
		$('#slideshow').rsfSlideshow('removeSlides');
		equal($('#slideshow').data('rsf_slideshow').slides.length, 0);
	});
	
	test("removeSlides(key)", function() {							
		$('.rs-slideshow').rsfSlideshow();
		expect(3);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 3);
		$('#slideshow').rsfSlideshow('removeSlides', 1);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 2);
		$('#slideshow').rsfSlideshow('removeSlides', 0);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 1);
	});
	
	test("removeSlides([1,2])", function() {							
		$('.rs-slideshow').rsfSlideshow();
		expect(2);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 3);
		$('#slideshow').rsfSlideshow('removeSlides', [1,2]);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 1);
	});
	
	test("removeSlides([1,1,2])", function() {							
		$('.rs-slideshow').rsfSlideshow();
		expect(2);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 3);
		$('#slideshow').rsfSlideshow('removeSlides', [1,1,2]);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 1);
	});
	
	test("removeSlides([0,0,0])", function() {							
		$('.rs-slideshow').rsfSlideshow();
		expect(2);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 3);
		$('#slideshow').rsfSlideshow('removeSlides', [0,0,0]);
		equal($('#slideshow').data('rsf_slideshow').slides.length, 2);
	});

	module("Slide Markup");

	test("Image Alt & Title", 2, function(){
		stop();
		$('.rs-slideshow').rsfSlideshow({
	      slide_data_selectors: {
	        url: {selector: 'a', attr: 'href'},
	        caption: {selector: 'a', attr: 'title'},
	        link_to: {selector: 'a', attr: 'data-link-to'},
	        effect: {selector: 'a', attr: 'data-effect'},
	        image_title: {selector: 'a', attr: 'data-image-title'},
	        image_alt: {selector: 'a', attr: 'data-image-alt'}
	      }
	    }
		).rsfSlideshow('goToSlide', 2).bind('rsPostTransition', function() {
		 	img = $('.slide-container img');
		 	equal(img.attr('alt'), 'The last image in a slideshow demo');
		 	equal(img.attr('title'), 'This is the last slide');
		 	start();
		});
	});
						   
});