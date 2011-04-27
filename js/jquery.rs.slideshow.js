/**
* 	Really Simple™ Slideshow jQuery plug-in 1.1
*	---------------------------------------------------------
*	Load slideshow images dynamically, instead of all at once
*	---------------------------------------------------------
*
*	Introduction, Demos, Docs and Downloads:
* 	http://reallysimpleworks.com/slideshow
*
* 	Copyright (c) 2011 Really Simple
*	http://reallysimpleworks.com
*
* 	Licensed under the MIT license:
*	http://www.opensource.org/licenses/mit-license.php
*	Free to use for both commercial and non-commercial.
*/


/**
*	Extra Bite-Sized Docs
*	---------------------
*
*	If embedding slide data in your markup, you can initialise
*	and start a slideshow in one line of code:
*
*	$('#my-slideshow-div').rsfSlideshow();
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
		//	Class to add to slide caption <span>
		slide_caption_class: 'slide-caption',
		//	jQuery selector for the element containing slide data when using markup to pass data.
		//	If this is an ID (starts with '#') the element can be placed anywhere on the page, 
		//	Any other selector is assumed to be a child of the slideshow element.
		data_container: 'ol.slides',
		//	jQuery selector for each slide data element
		slide_data_container: 'li',
		//	Objects containing selection routes for slide attributes
		//	One or both of 'selector' and/or 'attr' must be present
		slide_data_selectors: {
			url: {selector: 'a', attr: 'href'},
			caption: {selector: 'a', attr: 'title'},
			link_to: {selector: 'a', attr: 'data-link-to'},
			effect: {selector: 'a', attr: 'data-effect'}
		}
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
						loaded_imgs: Array(),
						queued: 0,
						callbacks: {}
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
			if (!options.data_container) {
				options.data_container = data.settings.data_container;
			}
			if (options.data_container.charAt(0) === '#') {
				var $cntnr = $(options.data_container);
			}
			else {
				var $cntnr = $(this).children(options.data_container);
			}
			if (!$cntnr.length) {
				return false;
			}
			
			if (!options.slide_data_container) {
				options.slide_data_container = data.settings.slide_data_container;
			}
			var slide_data_selectors = $.extend(true, {}, data.settings.slide_data_selectors);
			if (options.slide_data_selectors) {
				$.extend(true, slide_data_selectors, options.slide_data_selectors);
			}
			options.slide_data_selectors = slide_data_selectors;
			
			var self = this;
			$cntnr.children(options.slide_data_container).each(function() {
				var slide = $(self).rsfSlideshow('_findData', $(this), options.slide_data_selectors);
				$(self).rsfSlideshow('addSlides', slide);
			});
			return this;
		},
		
		
		/**
		*	Private method for iterating through data selectors 
		*	to find data for a single slide
		*/
		
		_findData: function($slideData, slide_data_selectors) {
			var slide = {};
			var slide_attr;
			for (var key in slide_data_selectors) {
				var $slideDataClone = $.extend(true, {}, $slideData);
				if (slide_data_selectors[key].selector) {
					$slideDataClone = $slideDataClone.children(slide_data_selectors[key].selector);
				}
				if (slide_data_selectors[key].attr) {
					slide_attr = $slideDataClone.attr(slide_data_selectors[key].attr);
				}
				else {
					slide_attr = $slideDataClone.text();
				}
				slide[key] = slide_attr;
			}
			return slide;
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
				data.slides.push({url: url});
			}
			else if (slide.url) {
				for (var key in slide) {
					slide[key] = $.trim(slide[key]);	
				}
				data.slides.push(slide);
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
	
		showSlide: function(slide, queue_id) {
			var data = this.data('rsf_slideshow');
			if (!queue_id) {
				data.queued += 1;
				queue_id = data.queued;
				this.rsfSlideshow('_doCallbacks', 'preTransition');
			}
			else if (queue_id != data.queued) {
				return;
			}
			var containerWidth = this.width();
			var containerHeight = this.height();
			this.children('img:first').css('z-index', 0);
			var newImg = new Image();
			newImg.src = slide.url;
			var $this = this;
			
			var whenLoaded = function(img) {
				var width = img.width;
				var height = img.height;
				if (!width || !height) {
					setTimeout(function() {$this.rsfSlideshow('showSlide', slide, queue_id); }, 200);
					return;
				}
				if ($.inArray(slide.url, data.loaded_imgs) < 0) {
					data.loaded_imgs.push(slide.url);
				}
				$this.rsfSlideshow('_doCallbacks', 'imageReady');
				$(img).addClass('rsf-slideshow-image');
				var leftOffset = Math.ceil((containerWidth / 2) - (width / 2));
				var topOffset = Math.ceil((containerHeight / 2) - (height / 2));
				$(img).css({left: leftOffset});
				$(img).css({top: topOffset});
				if (slide.link_to) {
					var $img = $('<a href="' + slide.link_to + '"></a>').append($(img));
				}
				else {
					$img = $(img);
				}
				var $slideEl = $('<div></div>');
				$slideEl.addClass(data.settings.slide_container_class);
				$slideEl.append($img).css('display', 'none');
				if (slide.caption) {
					var $capt = $('<span>' + slide.caption + '</span>');
					$capt.addClass(data.settings.slide_caption_class);
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
				if (newImg.width) {
					whenLoaded(newImg);
				}
				else {
					$(newImg).bind('load', function() {whenLoaded(newImg); });
				}
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
			var $this = this;
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
					$this.rsfSlideshow('_endTransition');
					break;
				case 'fade': 
					$slide.fadeIn(data.settings.transition, function() {
						$this.rsfSlideshow('_endTransition');
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
		*	Anything that needs to be done after a transition ends
		*/
		
		_endTransition: function() {
			var data = this.data('rsf_slideshow');
			this.children('div.' + data.settings.slide_container_class + ':not(:last-child)').remove();
			this.rsfSlideshow('_doCallbacks', 'postTransition');
			if (this.rsfSlideshow('currentSlideKey') == this.rsfSlideshow('totalSlides') - 1) {
				this.rsfSlideshow('_doCallbacks', 'lastSlide');
			}
			else if (this.rsfSlideshow('currentSlideKey') == 0) {
				this.rsfSlideshow('_doCallbacks', 'firstSlide');
			}
		},
		
		
		/**
		*	Perform slide animation
		*/
		
		_doSlide: function($slide, $previousSlide, left_offset, top_offset) {
			var data = this.data('rsf_slideshow');
			var $this = this;
			$slide.css({top: top_offset, left: left_offset});
			$slide.css('display', 'block');
			
			$slide.stop().animate(
				{top: 0, left: 0},
				data.settings.transition, 
				data.settings.easing, 
				function() {
					$this.rsfSlideshow('_endTransition');																	
				}
			);
			
			$previousSlide.stop().animate(
				{top: (0 - top_offset), left: (0 - left_offset)},
				data.settings.transition, 
				data.settings.easing
			);
		},
		
		
		/**
		*	Add a callback to a slideshow event
		*	Supported events:
		*		'preTransition'
		*		'postTransition'
		*		'imageReady'
		*		'lastSlide'
		*		'firstSlide'
		*/
		
		addCallback: function(evnt, callback) {
			var data = this.data('rsf_slideshow');
			var events = Array(
				'preTransition',
				'postTransition',
				'imageReady',
				'lastSlide',
				'firstSlide'
			);
			if ($.inArray(evnt, events) < 0) {
				return false;
			}
			if (!data.callbacks[evnt]) {
				data.callbacks[evnt] = Array();
			}
			data.callbacks[evnt].push(callback);
			return this;
		},
		
		
		/**
		*	Private method for firing callbacks
		*/
		
		_doCallbacks: function(evnt) {
			var data = this.data('rsf_slideshow');
			if (!data.callbacks[evnt] || !data.callbacks[evnt].length) {
				return;
			}
			for (var i = 0, len = data.callbacks[evnt].length; i < len; i ++) {
				data.callbacks[evnt][i](data.slides[data.this_slide]);
			}
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

