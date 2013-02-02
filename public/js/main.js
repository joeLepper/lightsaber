//javascript goes here
$(document).ready(function(){

  $('.target:nth-of-type(odd)').alternateScroller([{ effect:  "slideRight" }]);
  $('.target:nth-of-type(even)').alternateScroller([{ effect:  "slideLeft" }]);


});