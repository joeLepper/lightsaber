//javascript goes here
$(document).ready(function(){
  $('.target:nth-child(even)').superScroller([/*{ intro: "slideLeft", outro: "slideRight"}, */{intro: "fadeIn", outro: "fadeIn"}]);
  $('.target:nth-child(odd)').superScroller([/*{ intro: "slideRight", outro: "slideRight"}, */{intro: "fadeIn", outro: "fadeIn"}]);
  $('.trigger:nth-child(even)').superScroller([/*{ outro: "slideLeft", intro: "slideLeft"}, */{intro: "fadeIn", outro: "fadeIn"}]);
  $('.trigger:nth-child(odd)').superScroller([/*{ intro: "slideRight", outro: "slideLeft"}, */{intro: "fadeIn", outro: "fadeIn"}]);
});