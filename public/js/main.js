//javascript goes here
$(document).ready(function(){
  // super Scroller function, takes a trigger, a target to be modifide, and a class to apply to the target
  var superScroller = function(trigger, target, klass) {
    
    // setting the trigger "window" to +- 20px from the top of the trigger element
    var beginning = trigger - 20;
    var end = trigger + 20;
    
    // checking to see if we are within the window
    if(($(window).scrollTop() > beginning) && ($(window).scrollTop() < end)){
      
      // if yes, applyling the class to the target
      $(target).addClass(klass);
      console.log("Activated!");
    } else{
      
      // if outside of the window, removing the class
      $(target).removeClass(klass);
      console.log("De-Activated!");
    };
  };
  
  $(window).scroll(function(){
    
    // calling the superScroller function on the first two triggers
    superScroller($("#trigger-1").offset().top, "#target-2", "activated");
    superScroller($("#trigger-2").offset().top, "#target-3", "activated");
  });
});
  