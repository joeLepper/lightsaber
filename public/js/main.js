//javascript goes here
$(document).ready(function(){

  // $(".trigger").css({opacity:0});

  // $('#target-7').superScroller([{ effect:  "slideRight" }]);
  // $('#target-10').superScroller([{ effect:  "fadeIn", trigger: "#trigger-9" },{effect: "slideLeft"}]);
  // $('#target-12').superScroller([{ effect:  "fadeOut", trigger: "#trigger-11" }]);

  $('.target:nth-child(even)').alterScroller([{ effect: "slideLeft"}])
  $('.target:nth-child(odd)').alterScroller([{ effect: "slideRight"}])

  $('.trigger:nth-child(even)').alterScroller([{ effect: "fadeIn"}])
  $('.trigger:nth-child(odd)').alterScroller([{ effect: "fadeOut"}])

});

// { intro:   "foo"
// , trigger: "bar" 
// , length:  "20%"}
// { outro:   "foo"
// , trigger: "bar" 
// , length:  "20%"}