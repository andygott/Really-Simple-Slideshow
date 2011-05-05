
/**
*	QUnit tests
*/

$(document).ready(function() {
	
	
	/**
	*	getSlideData
	*/
	
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
						   
});