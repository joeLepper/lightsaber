(function($){

  // extend jQuery
  jQuery.fn.superScroller = function(options){

    // pass this scope to its children
    var self = this;

    // on scroll call the lion's share of the function
    $(window).scroll(function(){

      // for each targeted item
      for (var j = 0; j < self.length; j++){
        
        /* ----------------*
         *
         * init definitions
         *
         * ----------------*/
        // reference to the current target          
        var $self = $(self[j])

          // the default "length" of an intro or an outro
          // animation is equal to half the height of the viewport 
          , duration = $(window).height()/2

          // this is the bottom of the outro animation
          // equal to the top of the element being animated
          // So the animation ends when the top of the element 
          // being animated hits the top of the viewport.
          , end   = $self.offset().top

          // initialize "mid," which is the point at which an
          // element transitions from intro to outro
          // this point should always fall halfway through
          // the viewport, and typically is the moment
          // when the element is in its natural position
          , mid   = end - duration

          // initialize "start" - this is equal to duration * 2
          // and is the highest point of the intro
          // when this point is higher than the top of the viewport 
          // the intro animation begins
          , start

          // evaluates to true when the intro for this element should happen
          , withinIntro

          // evaluates to true when neither the intro nor outro should be happening
          , withoutAnis

          // evaluates to true when the outro for this element should happen
          , withinOutro

          // will equal a string passed in for intro or outro based on the logive of:
          // withinIntro, withinOutro, and withoutAnis
          , currentEffect;

        //step through our options array for this element
        for (var i = 0; i < options.length; i++){
          
          // called to determine what effect to use during down below
          var onStage = function(staged){

              // calculate a value between -1 to 1  
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

                //except I might need to animate out-of-bounds if we're reverse
                if( options[i].outro === 'reverse' || options[i].intro === 'reverse'){
                  
                  //so set currentEffect to "reverse"
                  currentEffect = 'reverse';
                }
                // TODO fix me
                // $self.css("right", "0px");
                position = 1;
              }

              //call action
              action(position);
            }

            // all changes to CSS values happen in here.
            // position: number from -1 to 1
            , action = function(position){

              // custom animations can be handed to this switch statement
              // they should handle a value from -1 to 1
              switch(currentEffect){

                // moves an element from the bottom-right
                // to the top-left
                case "slideRight":
                  $self.css("left",  -1 * ( window.innerWidth * position )  + "px");
                break;

                // moves an element from the bottom-left
                // to the top-right
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
                // this is always called when an intro or outro is reversed

                // NOTE: reverse requires a very small duration to be effective
                // NOTE: reverse CANNOT have itself as a trigger as that would be stupid
                case "reverse":

                  //NOTE: multiplying position * -2 is a hack to make it clear off the screen
                  //      before sticking in place. This may not work in all instances of 
                  //      reverse scrolling. If you experience moodiness or excessive bleeding
                  //      consult your physician.
                  $self.css("top", -2 *(position) * window.innerHeight);
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

          // check if there's a trigger
          if (options[i].trigger){ 

            // set trigger value to a number of pixels                         
            if (typeof options[i].trigger === "number"){
              mid = options[i].trigger;
            }

            //set trigger to a percent or jQuery selector
            if (typeof options[i].trigger === "string"){

              var trigString = options[i].trigger;

              // check if a percent has been passed in
              if(trigString[trigString.length - 1] === "%"){
                mid = $(document).height() * (parseInt(trigString) / 100);
              } 

              //assume this is a jQuery selector
              else {
                if($(trigString) === []){
                  throw new Error("Not a valide jQuery selector for trigger")
                }
                else{
                  mid = $(trigString).offset().top + ( $(window).height() / 2 );
                }
              }
            }
          }
          else {
            // do nothing
          }

          // we want the animation to keep going
          // past its midpoint so assume that the
          // intro is the outro and vice versa
          if(!options[i].intro){ 
            options[i].intro = "defaultIntro"
          };
          if(!options[i].outro){ 
            options[i].outro = "defaultOutro"
          };
          
          // what about the duration of our effect?
          if (options[i].duration){

            // it's a number
            if (typeof options[i].duration === "number"){
              // set to half the duration so that the midpoint falls in the 
              // middle of this window
              duration  = options[i].duration / 2;
              start     = mid - duration;
            }

            // it's a string, so assume a percent or that the string is broke
            if (typeof options[i].duration === "string"){
              if(options[i].duration[options[i].duration.length - 1] === "%"){
                
                // set percentage value                
                var percent = (parseInt(options[i].duration) / 100);
                duration    = ($(document).height() * percent) / 2;
                start       = mid - duration;
              } else {
                // Do nothing, keep defaults
                start = mid - duration
              };
            };
          };

          // now that we've checked user overrides lets determine our animation window
          end         = mid + duration

          // true: during intro window
          withinIntro = ($(window).scrollTop() > start) && ($(window).scrollTop() < mid);

          // true: outside the animation window
          withoutAnis = ($(window).scrollTop() < start) || ($(window).scrollTop() > end);

          // true: during outro window
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
      };
    });
  };

  // DO EEEEEEET
  $(document).ready(function(){
    $(window).scroll();
  });

})(jQuery);



