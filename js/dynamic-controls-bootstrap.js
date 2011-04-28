/**
*	Bootstrap the javascript
*/

$(document).ready(function () {

	$('.rs-slideshow').rsfSlideshow();
	
	//	Iterate over each slideshow on the page and generate index markup
	$('.rs-slideshow').each(function() {
		var slide_count = $(this).rsfSlideshow('totalSlides');
		var $indexControl = $('<ul class="controls clearfix"></ul>');
		for (var i = 0; i < slide_count; i ++) {
			$indexControl.append('<li><a href="#" class="rs-index" data-control-for="' + $(this).attr('id') + '" data-slide-key="' + i + '">' + (i + 1) + '</a></li>');
		}
		$indexControl.children('li:first').children('a').addClass('rs-active');
		$(this).parent().append($indexControl);
	});
	
	//	Use the API helper method to bind the new index links to the GoToSlide() method
	$('.rs-slideshow').rsfSlideshow('bindIndex');
	
	//	Bind the addition and removal of an "active" class to 
	//	the custom event "rsPreTransition"
	$('.rs-slideshow').bind('rsPreTransition', function() {
		var $rssObj = $(this);
		var settings = $rssObj.data('rsf_slideshow').settings;
		var current_slide_key = $rssObj.rsfSlideshow('currentSlideKey');
		$('.' + settings.index_class + '[data-control-for="' + $rssObj.attr('id') + '"]').removeClass('rs-active');
		$('.' + settings.index_class + '[data-control-for="' + $rssObj.attr('id') + '"][data-slide-key="' + current_slide_key + '"]').addClass('rs-active');
	});
	
});
