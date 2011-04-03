/**
* 	RSF Slideshow jQuery plug-in 1.0
*	---------------------------------------
*	A Really Simple jQuery Slideshow Plugin
*	---------------------------------------
*
*	Introduction, Demos and Docs:
* 	http://reallysimpleworks.com/slideshow
*
* 	Copyright (c) 2011 Really Simple
*	http://reallysimpleworks.com
*
* 	Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*
*	Feel free to do whatever you like with this code:
*	Use it to sure up that crooked table;
*	Use it to flavour curry sauce;
*	Use it as an underwater adhesive;
*	Etc.
*/


/**
*	Extra Bite-Sized Docs
*	---------------------
*
*	If embedding slide data in your markup, you can initialise
*	and start a slideshow in one line of code:
*
*	$('#my-slideshow-div').rsfSlideshow().rsfSlideshow('startShow');
*
*	If you're getting slide data from elsewhere and want to 
*	manually add slides to the slideshow:
*
*	var slides = Array(
*		{url: 'http://mydomain.com/images/1.png', caption: 'This is slide number 1'},
*		{url: 'http://mydomain.com/images/2.png', caption: 'This is slide number 2'},
*		{url: '/images/3.png', caption: 'This is slide number 3'},
*	);
*	$('#my-slideshow-div').rsfSlideshow({slides: slides});
*
*	For more complete docs, visit:
*	http://reallysimpleworks.com/slideshow
*/





(function( $ ){
		
	
	var defaults = {
		//	Duration of the interval between each slide in seconds
		interval: 5,
		//	Duration of the transition effect in milliseconds
		transition: 1000,
		//	The transition effect.
		effect: 'fade',
		//	Easing for slide effects (use the easing jQuery plugin for more options)
		easing: 'swing',
		//	If true, the slideshow will loop
		loop: true,
		//	Start slideshow automatically on initialisation
		autostart: true,
		//	Slides to add to the slideshow
		slides: Array(),
		//	Class of the div containing the slide image and caption
		slide_container_class: 'slide-container',
		//	jQuery selector for the element containing slide data when using markup to pass data.
		//	If this is an ID (starts with '#') the element can be placed anywhere on the page, 
		//	Any other selector is assumed to be a child of the slideshow element.
		//	anywhere on the page
		data_container_selector: '.slides',
		//	jQuery selector for each slide data element
		slide_data_selector: 'div.slide',
		//	jQuery selector for each URL data element
		url_data_selector: 'span.url',
		//	jQuery selector for each caption data element
		caption_data_selector: 'span.caption',
		//	jQuery selector for each link URL data element
		link_url_data_selector: 'span.link_url',
		//	jQuery selector for each effect data element
		effect_data_selector: 'span.effect'
	};
		
		
	var methods = {
		
		
		/**
		*	The 'options' object can be used to override any of the
		*	default parameters in the 'defaults' object above
		*/
		
		init: function(options) {	
			return this.each(function() {
				var $this = $(this),
					data = $this.data('rsf_slideshow'),
					slides = Array(),
					this_slide = 0,
					effect_iterator = {
						this_effect: -1,
						direction: 1
					}
					
				if (!data) {
					var settings = $.extend(true, {}, defaults);
					if (typeof options === 'object') {
						$.extend(true, settings, options);
					};
					$(this).data('rsf_slideshow', {
						slides: slides,
						this_slide: this_slide,
						effect_iterator: effect_iterator,
						settings: settings,
						interval_id: false,
						loaded_imgs: Array()
					});	
				}
				
				
				$(this).rsfSlideshow('getSlidesFromMarkup');
				
				if (settings.slides.length) {
					$(this).rsfSlideshow('addSlides', settings.slides);
					settings.slides = Array();
				}
				
				if ($(this).data('rsf_slideshow').settings.autostart) {
					$(this).rsfSlideshow('startShow');
				}
			});
		},
		
		
		/**
		*	Add slide data to the slideshow
		*	slides is either a slide object, or an array of slide objects
		*	A slide object has one to three elements:
		*		url: the URL of the image to load
		*		(optional) caption: caption text for the slide
		*		(optional) link_url: a URL to link the image to when clicked
		*/
		
		addSlides: function(slides) {
			if (slides instanceof Array) {
				for (var i = 0, len = slides.length; i < len; i ++) {
					this.rsfSlideshow('_addSlide', slides[i]);
				}
			}
			else {
				this.rsfSlideshow('_addSlide', slides);
			}
			return this;
		},
		
		
		/**
		*	Start the slideshow
		*	interval is the duration for which each slide is
		*	shown in seconds
		*/
		
		startShow: function(interval) {
			var self = this;
			var data = this.data('rsf_slideshow');
			if (!interval) {
				interval = data.settings.interval;
			}
			this.rsfSlideshow('stopShow');
			data.interval_id = setInterval(function() {self.rsfSlideshow('nextSlide'); }, interval * 1000);
			return this;
		},
		
		
		/**
		*	Stop the slideshow
		*/
		
		stopShow: function() {
			var data = this.data('rsf_slideshow');
			if (data.interval_id) {
				clearInterval(data.interval_id);
				data.interval_id = false;
			}
			return this;
		},
		
		
		/**
		*	Return the array key of the current slide
		*	The first slide's key is 0.
		*/
		
		currentSlideKey: function() {
			var data = this.data('rsf_slideshow');
			return data.this_slide;
		},
		
		
		/**
		*	Return the total number of slides currently in the slideshow
		*/
		
		totalSlides: function() {
			var data = this.data('rsf_slideshow');
			return data.slides.length;
		},
		
		
		/**
		*	Find slide data in the markup and add to the slides array
		*/
		
		getSlidesFromMarkup: function(options) {
			var data = this.data('rsf_slideshow');
			if (!options) {
				options = {};
			}
			//	Find the containing element
			if (!options.container) {
				options.container = data.settings.data_container_selector;
			}
			if (options.container.charAt(0) === '#') {
				var $cntnr = $(options.container);
			}
			else {
				var $cntnr = $(this).children(options.container);
			}
			if (!$cntnr.length) {
				return false;
			}
			
			if (!options.slide_selector) {
				options.slide_selector = data.settings.slide_data_selector;
			}
			if (!options.url_selector) {
				options.url_selector = data.settings.url_data_selector;
			}
			if (!options.caption_selector) {
				options.caption_selector = data.settings.caption_data_selector;
			}
			if (!options.link_url_selector) {
				options.link_url_selector = data.settings.link_url_data_selector;
			}
			if (!options.effect_selector) {
				options.effect_selector = data.settings.effect_data_selector;
			}
			
			var self = this;
			$cntnr.children(options.slide_selector).each(function() {
				slide = {
					url: $(this).children(options.url_selector).text(),
					caption: $(this).children(options.caption_selector).text(),
					link_url: $(this).children(options.link_url_selector).text(),
					effect: $(this).children(options.effect_selector).text()
				};
				$(self).rsfSlideshow('addSlides', slide);
			});
			
			return this;
		},
		
		
		/**
		*	Private method for adding a single slide object
		*	to the slides array. This should not be used directly
		*	as the addSlides() method should be used instead.
		*/
		
		_addSlide: function(slide) {
			var data = this.data('rsf_slideshow');
			if ((typeof slide) == 'string') {
				url = $.trim(slide);
				data.slides.push({url: url, caption: false, link_url: false});
			}
			else if (slide.url) {
				if (!slide.caption) {
					slide.caption = false;	
				}
				if (!slide.link_url) {
					slide.link_url = false;	
				}
				slide.url = $.trim(slide.url);
				slide.link_url = $.trim(slide.link_url);
				data.slides.push({url: slide.url, caption: slide.caption, link_url: slide.link_url});
			}
		},
		
		
		/**
		*	Load and transition into the next slide
		*/
		
		nextSlide: function() {
			var data = this.data('rsf_slideshow');
			data.this_slide ++;
			if (data.this_slide >= data.slides.length) {

				if (data.settings.loop) {
					data.this_slide = 0;
				}
				else {
					data.this_slide = data.slides.length - 1;
					this.rsfSlideshow('stopShow');
					return this;
				}
			}
			this.rsfSlideshow('showSlide', data.slides[data.this_slide]);
			return this;
		},
		
		
		/**
		*	Load and transition into the previous slide
		*/
		
		previousSlide: function() {
			var data = this.data('rsf_slideshow');
			data.this_slide --;
			if (data.this_slide < 0) {
				if (data.settings.loop) {
					data.this_slide = data.slides.length - 1;
				}
				else {
					data.this_slide = 0;
					this.rsfSlideshow('stopShow');
					return this;
				}
			}
			this.rsfSlideshow('showSlide', data.slides[data.this_slide]);
			return this;
		},
		
		
		/**
		*	Load and transition into the slide with the provided key
		*/
		
		goToSlide: function(key) {
			var data = this.data('rsf_slideshow');
			if (typeof data.slides[key] === 'object') {
				data.this_slide = key;
				this.rsfSlideshow('showSlide', data.slides[data.this_slide]);
			}
			return this;
		},
		
		
		/**
		*	Load and transition into the provided
		*	slide object
		*/
	
		showSlide: function(slide) {
			var data = this.data('rsf_slideshow');
			var containerWidth = this.width();
			var containerHeight = this.height();
			this.children('img:first').css('z-index', 0);
			var newImg = new Image();
			newImg.src = slide.url;
			var $this = this;
			
			var whenLoaded = function(img) {
				if ($.inArray(slide.url, data.loaded_imgs) < 0) {
					data.loaded_imgs.push(slide.url);
				}
				//var img = this;
				$(img).addClass('rsf-slideshow-image');
				//	Set borders and offsets
				var width = img.width;
				var height = img.height;
				var leftOffset = Math.ceil((containerWidth / 2) - (width / 2));
				var topOffset = Math.ceil((containerHeight / 2) - (height / 2));
				$(img).css({left: leftOffset});
				$(img).css({top: topOffset});
				if (slide.link_url) {
					var $img = $('<a href="' + slide.link_url + '"></a>').append($(img));
				}
				else {
					$img = $(img);
				}
				var $slideEl = $('<div class="slide-container"></div>').append($img).css('display', 'none');
				if (slide.caption) {
					var $capt = $('<span>' + slide.caption + '</span>').addClass('slide-caption');
					$capt.appendTo($slideEl);
				}
				var effect = data.settings.effect;
				if (slide.effect) {
					effect = slide.effect;
				}
				$slideEl.appendTo($this);
				$this.rsfSlideshow('transitionWith', $slideEl, effect);
				return true;
			};
			
			if ($.inArray(slide.url, data.loaded_imgs) < 0) {
				newImg.src = '';
				$(newImg).bind('load', function() {whenLoaded(newImg); });
				newImg.src = slide.url;
			}
			else {
				whenLoaded(newImg);
			}
			
			return this;
		},
		
		
		/**
		*	Transition effects
		*/
		
		transitionWith: function($slide, effect) {
			var data = this.data('rsf_slideshow');
			var $previousSlide 
				= this.children('div.' + data.settings.slide_container_class + ':first');
			
			var effect_iteration = 'random';
			if (typeof effect === 'object' && effect.iteration && effect.effects) {
				effect_iteration = effect.iteration;
				effect = effect.effects;
			}
			
			if (effect instanceof Array) {
				switch (effect_iteration) {
					case 'loop':
						data.effect_iterator.this_effect ++;
						if (data.effect_iterator.this_effect > effect.length - 1) {
							data.effect_iterator.this_effect = 0;
						}
						break;
					case 'backAndForth':
						data.effect_iterator.this_effect += data.effect_iterator.direction;
						if (data.effect_iterator.this_effect < 0) {
							data.effect_iterator.this_effect = 1;
							data.effect_iterator.direction = data.effect_iterator.direction * -1;
						}
						if (data.effect_iterator.this_effect > effect.length - 1) {
							data.effect_iterator.this_effect = effect.length - 2;
							data.effect_iterator.direction = data.effect_iterator.direction * -1;
						}
						break;
					default:
						data.effect_iterator.this_effect = Math.floor(Math.random() * effect.length);
						break;
				}
				effect = effect[data.effect_iterator.this_effect];
			}
		
			switch (effect) {
				case 'none': 
					$slide.css('display', 'block');
					$previousSlide.remove();
					break;
				case 'fade': 
					$slide.fadeIn(data.settings.transition, function() {
						$previousSlide.remove();
					});
					break;
				case 'slideLeft': 
					var left_offset = $slide.outerWidth();
					this.rsfSlideshow('_doSlide', $slide, $previousSlide, left_offset, 0);
					break;
				case 'slideRight': 
					var left_offset = (0 - $slide.outerWidth());
					this.rsfSlideshow('_doSlide', $slide, $previousSlide, left_offset, 0);
					break;
				case 'slideUp': 
					var top_offset = $slide.outerHeight();
					this.rsfSlideshow('_doSlide', $slide, $previousSlide, 0, top_offset);
					break;
				case 'slideDown': 
					var top_offset = (0 - $slide.outerHeight());
					this.rsfSlideshow('_doSlide', $slide, $previousSlide, 0, top_offset);
					break;
			}
		},
		
		
		/**
		*	Perform slide animation
		*/
		
		_doSlide: function($slide, $previousSlide, left_offset, top_offset) {
			
			var data = this.data('rsf_slideshow');
			$slide.css({top: top_offset, left: left_offset});
			$slide.css('display', 'block');
			
			$slide.stop().animate(
				{top: 0, left: 0},
				data.settings.transition, 
				data.settings.easing, 
				function() {
					$previousSlide.remove();																	
				}
			);
			
			$previousSlide.stop().animate(
				{top: (0 - top_offset), left: (0 - left_offset)},
				data.settings.transition, 
				data.settings.easing
			);
		}
		
	};
	
	
  $.fn.rsfSlideshow = function(method) {
	if (!this.length) {
		return this;
	}
	// Method calling logic
	if ( methods[method] ) {
		return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	} 
	else if ( typeof method === 'object' || ! method ) {
		return methods.init.apply( this, arguments );
	} 
	else {
		$.error( 'Method ' +  method + ' does not exist on jQuery.rsfSlidehow' );
	}   

  };
  
  
})( jQuery );

