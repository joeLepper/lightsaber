//javascript goes here
$(document).ready(function(){
  $('.target:nth-child(even)').superScroller([{ intro: "slideLeft", outro: "slideRight"}, {intro: "fadeIn",outro: "fadeIn"}]);
  $('.target:nth-child(odd)').superScroller([{ intro: "slideRight", outro: "slideRight"}, {outro: "fadeIn"}]);
  $('.trigger:nth-child(even)').superScroller([{ outro: "slideLeft", intro: "slideLeft"}, {outro: "fadeIn"}]);
  $('.trigger:nth-child(odd)').superScroller([{ intro: "slideRight", outro: "slideLeft"}, {intro: "fadeIn"}]);
});