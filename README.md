# Section Scroller

A jQuery plugin for smooth scrolling to next section on click of a button!

### [Demo](https://rishabh-rajgarhia.github.io/Section-Scroller/demo/demo.html)


## Usage


#### Install using NPM (optional)
```
npm install section-scroller
```

#### Include

```html
<head>
  <!-- Include CSS for section scroller button -->
  
  <!-- This following line is optional. Required when using scrollType effects other than "linear" or "swing". -->
  <script src="jquery.easings.min.js"></script>
  
  <script src="sectionscroller.min.js"></script>
</head>
```
`Tip:` For section scroller button styling, you can use the _scrollerButtonSampleCSS.css_ provided or you can use custom style as per your requirements.


#### HTML
```html
<div class="section-scroll">Content...</div>
<div class="section-scroll">Content...</div>
<div class="section-scroll">Content...</div>
...
<div id="section-scroller-button">
    <i class="caret"></i>
</div>
```
`Tip:` For section scroller button, you can use `carret` class (CSS in _scrollerButtonSampleCSS.css_). You can also easily replace it with icons from [Font Awesome](http://fontawesome.io/icons/) or any other vendor.


#### jQuery
```javascript
$(document).ready(function () {
    $(".section-scroll").sectionScroller({
        // Options
        scrollerButton: "#section-scroller-button"
    });
});
```

## Options

This is the default configuration:

```javascript
$(".section-scroll").sectionScroller({
    scrollerButton: "#section-scroller-button",
    scrollerButtonRotateClass: "rotate",
    scrollType: "swing",
    scrollDuration: 1000,
    offset: 0,
    fixedNavbar: null,
    onScrollStart: function () {},
    onScrollEnd: function () {}
});
```
`".section-scroll"` is the CSS selector for sections of the page.

| Options                   | Default                    | Description  |
| ------------------------- |----------------------------|--------------|
| scrollerButton            | "#section-scroller-button" | CSS selector for element on clicking of which, scrolling to the next section will happen. |
| scrollerButtonRotateClass | "rotate"                   | Class added to the scroller button(to rotate the scroller button direction, etc.) when the last section or the bottom of page is reached. |
| scrollType                | "swing"                    | Animation / Easing while section scrolling. Can easily be extended using [jQuery Easing Plugin](http://gsgd.co.uk/sandbox/jquery/easing/). |
| scrollDuration            | 1000                       |  Duration of the section scroll. |
| offset                    | 0                          |  Offset (pixels) from the top for all sections, e.g., `offset: 10`. For setting offset for individual sections, see below. |
| fixedNavbar               | null                       |  CSS Selector for fixed top navbar if any. Useful in responsive websites where height of fixed navbar changes in different screen sizes, e.g., `fixedNavbar: ".navbar-fixed-top"`.  |
| onScrollStart             | Callback Function          |  Callback function fired on start of the section scrollling. |
| onScrollEnd               | Callback Function          |  Callback function fired on start of the section scrollling. |

For setting offset for individual sections, use `data-scroll-offset` HTML Data Attribute as shown below:

```html
<div class="section-scroll" data-scroll-offset="30">Content...</div>
```
**Extra Options Available Inside Callbacks**

`this.scrollToElementIndex` (Number) - index of the destination section - starting with 0 by default.  
`this.elementOffsetTops` (Array) - offet top of all the sections.  
`this.dataScrollOffsets` (Array) - offset provided in the HTML Data Attribute(data-scroll-offset) if any.  


## License

This project is licensed under the MIT License (http://opensource.org/licenses/MIT).
