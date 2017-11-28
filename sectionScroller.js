/*
 * Section Scroller
 * 
 * Licensed under the MIT license
 *
 * Copyright (c) 2017 Rishabh Rajgarhia | https://github.com/rishabh-rajgarhia
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

;(function ($, window, document) {
	"use strict";

	var $window = $(window);
	var $document = $(document);

	// default options
	var defaults = {
		scrollerButton: "#section-scroller-button",
		scrollerButtonRotateClass: "rotate",
		scrollType: "swing",
		scrollDuration: 1000,
		offset: 0,
		fixedNavbar: null,

		// callbacks
		onScrollStart: function () {},
		onScrollEnd: function () {}
	};

	var SectionScroller = function (elements, options) {
		this.elements = elements;

		// options
		this.options = $.extend({}, defaults, options);

		// scroller button
		this.scrollerButton = $(this.options.scrollerButton);

		// class added to the scroller button(to rotate the scroller button direction, etc.) when the last section or the bottom of page is reached
		this.scrollerButtonRotateClass = this.options.scrollerButtonRotateClass;

		// animation duration in milliseconds
		this.scrollDuration = this.options.scrollDuration;

		// animation type - swing or linear. To extend use jquery easing
		this.scrollType = this.options.scrollType;

		// custom offset top
		this.offset = this.options.offset;

		// in case of fixed navbar - useful in responsive websites where height of fixed navbar changes in different screen sizes
		this.fixedNavbar = this.options.fixedNavbar;

		// index of the destination element - starting with 0 by default
		this.scrollToElementIndex = 0;

		// offet top of all the elements
		this.elementOffsetTops = [];

		// offset provided in the data attribute(data-scroll-offset) if any
		this.dataScrollOffsets = [];

		this._defaults = defaults;

		this.init();
	}

	SectionScroller.prototype = {

		constructor: SectionScroller,

		init: function () {
			var that = this;

			this.scrollerButton.on("click", function (event) {
				that.scrollToNextElement(that);
				event.preventDefault();
			});

			this.scrollerButtonRotateClassHandler(this);

			$window.scroll(function () {
				that.scrollerButtonRotateClassHandler(that)
			});
		},

		scrollToNextElement: function (that) {
			var index = 0;
			var offsetAdjustment = that.offset + getFixedNavbarHeight(that.fixedNavbar);

			while (index < that.elements.length && Math.round($window.scrollTop()) >= Math.round($(that.elements[index]).offset().top - offsetAdjustment))
				index++;

			if (index >= that.elements.length || checkBottom())
				index = 0;

			that.scrollToElementIndex = index;

			// callback function on start of the scrollling
			that.options.onScrollStart.call(that);

			$('html, body').stop().animate({
				scrollTop: Math.round($(that.elements[index]).offset().top - offsetAdjustment) + Math.round(Number($(that.elements[index]).data("scroll-offset")) ? Number($(that.elements[index]).data("scroll-offset")) : 0)
			}, that.scrollDuration, that.scrollType).promise().done(function () {
				that.options.onScrollEnd.call(that); // callback function on end of the scrolling
			});

		},

		scrollerButtonRotateClassHandler: function (that) {
			var offsetAdjustment = that.offset + getFixedNavbarHeight(that.fixedNavbar);

			if (checkBottom())
				addClass(that.scrollerButton, that.scrollerButtonRotateClass);
			else if (Math.round($window.scrollTop()) >= Math.round($(that.elements[that.elements.length - 1]).offset().top - offsetAdjustment))
				addClass(that.scrollerButton, that.scrollerButtonRotateClass);
			else
				removeClass(that.scrollerButton, that.scrollerButtonRotateClass);
		}
	};

	// check if the page has reached the bottom
	function checkBottom() {
		return parseInt($window.scrollTop() + $window.height()) === parseInt($document.height()) ? true : false;
	}

	function getFixedNavbarHeight(fixedNavbar) {
		return fixedNavbar === null ? 0 : typeof fixedNavbar === "string" && $(fixedNavbar).length > 0 ? $(fixedNavbar).outerHeight() : console.log("Section Scroller Error: Wrong fixedNavbar option provided!");
	}

	function addClass(element, classToBeAdded) {
		if (!element.hasClass(classToBeAdded))
			element.addClass(classToBeAdded);
	}

	function removeClass(element, classToBeRemoved) {
		if (element.hasClass(classToBeRemoved))
			element.removeClass(classToBeRemoved);
	}

	$.fn.sectionScroller = function (options) {
		if (!$.data(this, "plugin_" + "sectionScroller")) {
			$.data(this, "plugin_" + "sectionScroller",
				new SectionScroller(this, options));
		}

		return this;
	};

})(jQuery, window, document);
