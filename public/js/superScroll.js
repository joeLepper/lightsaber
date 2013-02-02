(function($){
	jQuery.fn.alternateScroller = function(options){
    console.log(this);
    var self = this;
    $(window).scroll(function(){
      for (var j = 0; j < self.length; j++){

        var $self       = $(self[j])
          , end         = $self.offset().top - $(window).height()/2;

        for (var i = 0; i < options.length; i++){
          if (options[i].trigger){                          // check if there's a trigger
            if (typeof options[i].trigger === "number"){
              console.log("number");
              end = options[i].trigger;
            }
            if (typeof options[i].trigger === "string"){
              var trigString = options[i].trigger;
              console.log("string");
              if(trigString[trigString.length - 1] === "%"){
                end = $(document).height() * (parseInt(trigString) / 100);
                console.log('percentage' + end);
              } else {
                end = $(trigString).offset().top;
                console.log('end in selector ' + $(trigString).offset());
              }
            }
          } else {

          }

          var start       = end - $(window).height()/2
            , inWindow    = ($(window).scrollTop() > start) && ($(window).scrollTop() < end)
            , aboveWindow = ($(window).scrollTop() < start)
            , belowWindow = ($(window).scrollTop() > end);

          
          // Which effect are we doing?
          switch(options[i].effect){
            case "slideRight":
              if(inWindow){
                var position  = 1 -(($(window).scrollTop() - start)/((end - start)));
                console.log("position: " + window.innerWidth * position);
                $self.css("right", "-" + window.innerWidth * position + "px");
              } 
              else if(aboveWindow){
                $self.css("right", "-" + window.innerWidth + "px");
              }
              else if(belowWindow){
                $self.css("right", "0px");
              };
              break;

            case "slideLeft":
              if(inWindow){
                var position  = 1 -(($(window).scrollTop() - start)/((end - start)));
                console.log("position: " + window.innerWidth * position);
                $self.css("left", "-" + window.innerWidth * position + "px");
              } 
              else if(aboveWindow){
                $self.css("left", "-" + window.innerWidth + "px");
              }
              else if(belowWindow){
                $self.css("left", "0px");
              };
              break;

            default:
              console.log("nothing to do!");
          };
        };
      }
    });
	};
})(jQuery);

  // // super Scroller function, takes a trigger, a target to be modifide, and a class to apply to the target
  // var superScroller = function(_scrollElements) {
    
  //   console.log(window.innerHeight)

  //   for ( var i = 0; i < _scrollElements.length; i++){
      
  //     //consume the object
  //     consumeScrollers(_scrollElements[i])
  //   };
  // }

  //   , consumeScrollers = function(_scrollElement){
  //       // setting the trigger "window" to the top 
  //       // of the trigger element + duration
  //       var trigger   = _scrollElement.trigger
  //         , trigVal   = $(trigger).offset().top
  //         , duration  = window.innerHeight //_scrollElements[i].duration
  //         , end       = trigVal + duration
  //         , target    = _scrollElement.target
  //         , klass     = _scrollElement.klass
        
  //       // checking to see if we are within the window
  //       if(($(window).scrollTop() > trigVal) && ($(window).scrollTop() < end)){

  //         // if yes, applyling the class to the target
  //         $(target).addClass(klass);
  //         console.log(target + " Activated!");
  //       } else{
          
  //         // if outside of the window, removing the class
  //         $(target).removeClass(klass);
  //         console.log(target + " De-Activated!");
  //       };
  //   }

  //   // building an array of objects which contain all the 
  //   // info for each scrollable object
  //   , scrollElements =  [ { trigger  : "body"
  //                         , duration : 75
  //                         , target   : "#target-1"
  //                         , klass    : "activated" } 

  //                       , { trigger  : "#trigger-1"
  //                         , duration : 75
  //                         , target   : "#target-2"
  //                         , klass    : "activated" }

  //                       , { trigger  : "#trigger-2"
  //                         , duration : 75
  //                         , target   : "#target-3"
  //                         , klass    : "activated" } 

  //                       , { trigger  : "#trigger-3"
  //                         , duration : 75
  //                         , target   : "#target-4"
  //                         , klass    : "activated" } 
                        
  //                       , { trigger  : "#trigger-4"
  //                         , duration : 75
  //                         , target   : "#target-5"
  //                         , klass    : "activated" } 
                        
  //                       , { trigger  : "#trigger-5"
  //                         , duration : 75
  //                         , target   : "#target-6"
  //                         , klass    : "activated" } 
                        
  //                       , { trigger  : "#trigger-6"
  //                         , duration : 75
  //                         , target   : "#target-7"
  //                         , klass    : "activated" } 
                        
  //                       , { trigger  : "#trigger-7"
  //                         , duration : 75
  //                         , target   : "#target-8"
  //                         , klass    : "activated" } 
                        
  //                       , { trigger  : "#trigger-8"
  //                         , duration : 75
  //                         , target   : "#target-9"
  //                         , klass    : "activated" } 
                        
  //                       , { trigger  : "#trigger-10"
  //                         , duration : 75
  //                         , target   : "#target-11"
  //                         , klass    : "activated" } 
                        
  //                       , { trigger  : "#trigger-11"
  //                         , duration : 75
  //                         , target   : "#target-12"
  //                         , klass    : "activated" } 
                        
  //                       , { trigger  : "#trigger-12"
  //                         , duration : 75
  //                         , target   : "#target-13"
  //                         , klass    : "activated" } 
                        
  //                       , { trigger  : "#trigger-13"
  //                         , duration : 75
  //                         , target   : "#target-14"
  //                         , klass    : "activated" } 
  //   ]
  
  // $(window).scroll(function(){
  //   console.log('scrollTop() ' + $(window).scrollTop());
  //   // calling the superScroller function on the array
  //   superScroller(scrollElements);
  // });


