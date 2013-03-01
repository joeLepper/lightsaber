//javascript goes here
$(document).ready(function(){
  // $('.target:nth-child(odd)'  ).superScroller([{intro: "slideLeft", outro: "slideLeft", duration: "25%" },{intro: "fadeIn", outro: "fadeIn", duration: "10%" }]);
  // $('.target:nth-child(even)' ).superScroller([{intro: "slideRight", outro: "slideRight", duration: "25%" },{intro: "fadeIn", outro: "fadeIn", duration: "10%" }]);

  // $('.trigger:nth-child(odd)' ).superScroller([{intro: "slideLeft", outro: "slideLeft", duration: "25%" },{intro: "fadeIn", outro: "fadeIn", duration: "10%" }]);
  // $('.trigger:nth-child(even)').superScroller([{intro: "slideRight", outro: "slideRight", duration: "25%" },{intro: "fadeIn", outro: "fadeIn", duration: "10%" }]);

  // $('.foo:nth-child(odd)' ).superScroller([{intro: "slideLeft", outro: "slideLeft", duration: "25%" },{intro: "fadeIn", outro: "fadeIn", duration: "10%" }]);
  // $('.foo:nth-child(even)').superScroller([{intro: "slideRight", outro: "slideRight", duration: "25%" },{intro: "fadeIn", outro: "fadeIn", duration: "10%" }]);

  // $('#foo-4').superScroller([{intro:'reverse', outro:'reverse', trigger: "#foo-3", duration:'5%'}])
  $('.foo:nth-child(even)').superScroller([{intro:'reverse1', outro: 'reverse', duration: '100%'},{intro: "slideRight", outro: "slideRight", duration: "50%" }])

  $('.target:nth-child(odd)').superScroller([{intro:'reverse', outro: 'reverse', duration: '100%'},{intro: "slideLeft", outro: "slideLeft", duration: "50%" }])
  $('.target:nth-child(even)').superScroller([{intro:'reverse1', outro: 'reverse', duration: '75%'},{intro: "slideRight", outro: "slideRight", duration: "75%" }])

  $('.trigger:nth-child(odd)').superScroller([{intro:'reverse', outro: 'reverse', duration: '50%'},{intro: "slideLeft", outro: "slideLeft", duration: "50%" }])
  $('.trigger:nth-child(even)').superScroller([{intro:'reverse1', outro: 'reverse', duration: '100%'},{intro: "slideRight", outro: "slideRight", duration: "25%" }])

  $('.bar:nth-child(odd)').superScroller([{intro:'reverse', outro: 'reverse', duration: '50%'},{intro: "slideLeft", outro: "slideLeft", duration: "25%" }])
  $('.bar:nth-child(even)').superScroller([{intro:'reverse1', outro: 'reverse', duration: '75%'},{intro: "slideRight", outro: "slideRight", duration: "50%" }])

});