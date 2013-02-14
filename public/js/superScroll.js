(function($){
  jQuery.fn.superScroller = function(options){
    var self = this;
    $(window).scroll(function(){
      for (var j = 0; j < self.length; j++){
          
        var $self = $(self[j])
          , duration = $(window).height()/2
          , end   = $self.offset().top
          , mid   = end - duration
          , start
          , withinIntro
          , withoutAnis
          , withinOutro
          , currentEffect;

        for (var i = 0; i < options.length; i++){

          var onStage = function(staged){
              var position  = 1 -(($(window).scrollTop() - start)/((mid - start)));

              // So, uh, do I need to be animating?
              if (staged){

                // I do. Intro time.
                if(staged === "intro"){
                  currentEffect = options[i].intro;
                }

                // I do. Outro time.
                else if(staged === "outro"){
                  currentEffect = options[i].outro;
                }
              }

              // I don't need to animate, because we're offstage
              else{
                // TODO fix me
                // $self.css("right", "0px");
                position = 1;
              }
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
                  $self.css("left",  -1 * ( window.innerWidth * position )  + "px");
                break;
                case "slideLeft":
                  $self.css("left", window.innerWidth * position + "px");
                break;

                // fades target out as it approaches start
                case "fadeOut":
                    $self.css("opacity", Math.abs(position));
                break;

                // fades target in as it approaches start
                case "fadeIn":
                    $self.css("opacity", 1 - Math.abs(position));
                break;

                // scroll backwards
                case "reverse":
                  console.log(position * window.innerHeight);
                  $self.css("top", position * window.innerHeight);
                break;

                case "defaultIntro":
                  currentEffect = options[i].outro;
                  action(0);
                break;

                case "defaultOutro":
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
              mid = options[i].trigger;
            }
            if (typeof options[i].trigger === "string"){
              var trigString = options[i].trigger;
              if(trigString[trigString.length - 1] === "%"){
                mid = $(document).height() * (parseInt(trigString) / 100);
              } else {
                mid = $(trigString).offset().top + ( $(window).height() / 2 );
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
          
          if (options[i].duration){
            if (typeof options[i].duration === "number"){
              // set some value here
              duration  = options[i].duration / 2;
              start     = mid - duration;
            }
            if (typeof options[i].duration === "string"){
              if(options[i].duration[options[i].duration.length - 1] === "%"){
                
                // set percentage value                
                var percent = (parseInt(options[i].duration) / 100);
                duration    = ($(document).height() * percent) / 2;
                start       = mid - duration;
              } else {
                // Do nothing, keep defaults
                start = mid - duration
              }
            }
          }
          

          end         = mid + duration
          withinIntro = ($(window).scrollTop() > start) && ($(window).scrollTop() < mid);
          withoutAnis = ($(window).scrollTop() < start) || ($(window).scrollTop() > end);
          withinOutro = ($(window).scrollTop() > mid )  && ($(window).scrollTop() < end);

          if (withinIntro){
            onStage("intro");
          }
          else if (withoutAnis){
            onStage(false);
          }
          else if (withinOutro){
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



