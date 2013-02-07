//javascript goes here
$(document).ready(function(){
  $('.target:nth-child(even)').alterScroller([{ outro: "slideRight"}])
  $('.target:nth-child(odd)').alterScroller([{ intro: "fadeOut"}])

    $(window).scroll();
    console.log("ready called");
});