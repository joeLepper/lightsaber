(function($){
  jQuery.fn.alterScroller = function(options){
    var self = this;
    $(window).scroll(function(){
      for (var j = 0; j < self.length; j++){

        var $self = $(self[j])
          , downStage   = $self.offset().top - $(window).height()/2
          , centerStage
          , upStage
          , inWindow
          , aboveWindow
          , belowWindow
          , currentEffect;

        for (var i = 0; i < options.length; i++){

          var onStage = function(staged){
              var position  = 1 -(($(window).scrollTop() - centerStage)/((downStage - centerStage)));

              // So, uh, do I need to be animating?
              if (staged){

                // I do. Intro time.
                if(staged === "intro"){
                  // console.log("intro")
                  currentEffect = options[i].intro;
                }

                // I do. Outro time.
                else if(staged === "outro"){
                  // console.log("outro")
                  currentEffect = options[i].outro;
                }
              }

              // I don't need to animate, because we're offstage
              else{
                // TODO fix me
                // $self.css("right", "0px");
                // console.log("nothing to do!")
                position = 1;
              }
              // console.log(position);
              action(position);
            }

            , action = function(position){
              switch(currentEffect){
                /* Currently our "slide" transitions use a hard-wired value of window.innerWidth
                 * which "just works," but isn't terribly pleasing visually. I'd like to see us
                 * come up with a way to have the animation know where the element is positioned
                 * horizontally and react accordingly, thus as a default the element will always
                 * start and end its slide in a corner of the browser, as opposed to some arbitrary
                 * position dependent upon the elements horizontal positioning.
                 *
                 * I suppose this'll also affect the speed of the animation.
                 * 
                 * JL - 2.6.13
                 */

                case "slideRight":
                  // console.log("left: " + ( -1 * ( window.innerWidth * position ) ) + "px")
                  $self.css("left",  -1 * ( window.innerWidth * position )  + "px");
                break;
                case "slideLeft":
                  // console.log("left: " + ( window.innerWidth * position ) + "px")
                  $self.css("left", window.innerWidth * position + "px");
                break;

                // fades target out as it approaches centerStage
                case "fadeOut":
                  // console.log(position);
                  // if( Math.abs(position) > 0  && Math.abs(position) < 1){
                    $self.css("opacity", Math.abs(position));
                  // }
                break;

                // fades target in as it approaches centerStage
                case "fadeIn":
                  // console.log("fade");
                  // if( 1 - Math.abs(position) > 0  && 1 - Math.abs(position) < 1){
                    $self.css("opacity", 1 - Math.abs(position));
                  // }
                break;

                // scroll backwards
                case "reverse":
                  console.log("reverse");
                  console.log(position * window.innerHeight);
                  $self.css("top", position * window.innerHeight);
                break;

                case "defaultIntro":
                  console.log("I'm the default, bitches.");
                  currentEffect = options[i].outro;
                  action(0);
                break;

                case "defaultOutro":
                  console.log("I'm the default, bitches.");
                  currentEffect = options[i].intro;
                  action(0);
                break;
              };
            }

          // I feel like this should trigger just like for the target. 
          // Right now this is set to finish when the trigger element hits the top of the screen. 
          // Shouldn't it work like the target though and 
          // finish when the trigger hits the middle of the screen? DMC- 2/2/13

          // check if there's a trigger
          if (options[i].trigger){                          
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

          if(!options[i].intro){ 
            options[i].intro = "defaultIntro"
          };
          if(!options[i].outro){ 
            options[i].outro = "defaultOutro"
          };


          /* Right now I'd like to start focusing on this "duration" variable
           * Currently we have it hardwired to equal half the height of the window
           *
           * $(window).height() / 2;
           *
           * I would like to see us have it check for a "duration" argument that can
           * be a number of pixels, or percent of the body height. In the absence of
           * such an argument it should default to the above value.
           *
           * JL - 2.6.13
           */

           console.log('downstage ' + downStage);

          centerStage = downStage - $(window).height() / 2;

          console.log('centerstage: ' + centerStage);

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
        };
      }
    });
  };

  $(document).ready(function(){
    $(window).scroll();
  });

})(jQuery);



