//javascript goes here
$(document).ready(function(){
  $('.target:nth-child(even)').alterScroller([{ intro: "fadeOut", outro: "slideLeft"}])
  // $('.target:nth-child(odd)').alterScroller([{ intro: "fadeOut"}])

    $(window).scroll();
    console.log("ready called");
});