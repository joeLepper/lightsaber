(function($){
	jQuery.fn.superScroller = function(options){
    var self = this;
    $(window).scroll(function(){
      for (var j = 0; j < self.length; j++){

        var $self       = $(self[j])
          , end         = $self.offset().top - $(window).height()/2;

        for (var i = 0; i < options.length; i++){
          // I feel like this should trigger just like for the target. 
          // Right now this is set to finish when the trigger element hits the top of the screen. 
          // Shouldn't it work like the target though and 
          // finish when the trigger hits the middle of the screen? DMC- 2/2/13
          if (options[i].trigger){                          // check if there's a trigger
            if (typeof options[i].trigger === "number"){
              end = options[i].trigger;
            }
            if (typeof options[i].trigger === "string"){
              var trigString = options[i].trigger;
              if(trigString[trigString.length - 1] === "%"){
                end = $(document).height() * (parseInt(trigString) / 100);
              } else {
                end = $(trigString).offset().top;
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
                $self.css("left", "-" + window.innerWidth * position + "px");
              } 
              else if(aboveWindow){
                $self.css("left", "-" + window.innerWidth + "px");
              }
              else if(belowWindow){
                $self.css("left", "0px");
              };
              break;
              
            // fades target in when trigger reaches top of window (no positioning)
            case "fadeIn":
              if(inWindow){
                var opacity  = (($(window).scrollTop() - start)/((end - start)));
                $self.css("opacity", opacity);
              } 
              else if(aboveWindow){
                $self.css("opacity", "0.0");
              }
              else if(belowWindow){
                $self.css("opacity", "1.0");
              };
              break;

            // fades target out when trigger reaches top of window (no positioning)
            case "fadeOut":
              if(inWindow){
                var opacity  = 1 - (($(window).scrollTop() - start)/((end - start)));
                $self.css("opacity", opacity);
              } 
              else if(aboveWindow){
                $self.css("opacity", "1.0");
              }
              else if(belowWindow){
                $self.css("opacity", "0.0");
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

$(document).ready(function(){
  $(window).scroll();
});

(function($){
  jQuery.fn.alterScroller = function(options){
    var self = this;
    console.log(self);
    $(window).scroll(function(){
      for (var j = 0; j < self.length; j++){

        var $self = $(self[j])
          , downStage   = $self.offset().top - $(window).height()/2
          , centerStage
          , upStage
          , inWindow
          , aboveWindow
          , belowWindow

        for (var i = 0; i < options.length; i++){

          var onStage = function(staged){

            var topVal
              , botVal
              , position;

              // So, uh, do I need to be animating?
              if (staged){

                // I do. Intro time.
                if(staged === "intro"){
                  position  = 1 -(($(window).scrollTop() - centerStage)/((downStage - centerStage)));
                  // $self.css("right", window.innerWidth * position + "px");
                }

                // I do. Outro time.
                else if(staged === "outro"){
                  // position  = (($(window).scrollTop() - ( centerStage + $(window).height() / 2 )) / ((centerStage - upStage)));

                  position  = 1 -(($(window).scrollTop() - centerStage)/((downStage - centerStage)));

                  // $self.css("right", window.innerWidth * position + "px");
                }
              }

              // I don't need to animate, because we're offstage
              else{
                $self.css("right", "-" + window.innerWidth + "px");
              }
              action(position);
            }

            , action = function(position){
              switch(options[i].effect){
                case "slideRight":
                  // console.log("right")
                  $self.css("right", window.innerWidth * position + "px");
                break;
                case "slideLeft":
                  // console.log("left")
                  $self.css("left", window.innerWidth * position + "px");
                break;
                case "fadeIn":
                  console.log(position);
                  if( Math.abs(position) > 0  && Math.abs(position) < 1){
                    $self.css("opacity", Math.abs(position));
                  }
                break;
                case "fadeOut":
                  // console.log("fade");
                  if( 1 - Math.abs(position) > 0  && 1 - Math.abs(position) < 1){
                    $self.css("opacity", 1 - Math.abs(position));
                  }
                break;


              };
            }

          // I feel like this should trigger just like for the target. 
          // Right now this is set to finish when the trigger element hits the top of the screen. 
          // Shouldn't it work like the target though and 
          // finish when the trigger hits the middle of the screen? DMC- 2/2/13
          if (options[i].trigger){                          // check if there's a trigger
            if (typeof options[i].trigger === "number"){
              downStage = options[i].trigger;
            }
            if (typeof options[i].trigger === "string"){
              var trigString = options[i].trigger;
              if(trigString[trigString.length - 1] === "%"){
                downStage = $(document).height() * (parseInt(trigString) / 100);
              } else {
                downStage = $(trigString).offset().top + ( $(window).height() / 2 );
              }
            }
          }
          else {
            // do nothing
          }

          centerStage = downStage - $(window).height() / 2;
          upStage     = downStage - $(window).height();
          inWindow    = ($(window).scrollTop() > centerStage) && ($(window).scrollTop() < downStage);
          aboveWindow = ($(window).scrollTop() < centerStage);
          belowWindow = ($(window).scrollTop() > downStage);

          if (inWindow){
            onStage("intro");
          }
          else if (aboveWindow){
            onStage(false);
          }
          else if (belowWindow){
            onStage("outro");
          };
          
        //   // Which effect are we doing?
        //   switch(options[i].effect){
        //     case "slideRight":
        //       if(inWindow){
        //         var position  = 1 -(($(window).scrollTop() - start)/((end - start)));
        //         $self.css("right", "-" + window.innerWidth * position + "px");
        //       } 
        //       else if(aboveWindow){
        //         $self.css("right", "-" + window.innerWidth + "px");
        //       }
        //       else if(belowWindow){
        //         $self.css("right", "0px");
        //       };
        //       break;

        //     case "slideLeft":
        //       if(inWindow){
        //         var position  = 1 -(($(window).scrollTop() - start)/((end - start)));
        //         $self.css("left", "-" + window.innerWidth * position + "px");
        //       } 
        //       else if(aboveWindow){
        //         $self.css("left", "-" + window.innerWidth + "px");
        //       }
        //       else if(belowWindow){
        //         $self.css("left", "0px");
        //       };
        //       break;
              
        //     // fades target in when trigger reaches top of window (no positioning)
        //     case "fadeIn":
        //       if(inWindow){
        //         var opacity  = (($(window).scrollTop() - start)/((end - start)));
        //         $self.css("opacity", opacity);
        //       } 
        //       else if(aboveWindow){
        //         $self.css("opacity", "0.0");
        //       }
        //       else if(belowWindow){
        //         $self.css("opacity", "1.0");
        //       };
        //       break;
              
        //     // fades target out when trigger reaches top of window (no positioning)
        //     case "fadeOut":
        //       if(inWindow){
        //         var opacity  = 1 - (($(window).scrollTop() - start)/((end - start)));
        //         $self.css("opacity", opacity);
        //       } 
        //       else if(aboveWindow){
        //         $self.css("opacity", "1.0");
        //       }
        //       else if(belowWindow){
        //         $self.css("opacity", "0.0");
        //       };
        //       break;
        //     default:
        //       console.log("nothing to do!");
        //   };
        };
      }
    });
  };
})(jQuery);

$(document).ready(function(){
  $(window).scroll();
});