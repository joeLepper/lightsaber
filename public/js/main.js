//javascript goes here
$(document).ready(function(){
  $('#trigger-6').superScroller([ { triggerWindow : 400
                            , target          : "#target-7"
                            , klass           : "activated" }
                          ]);
                          
  $('#target-6').alternateScroller([ { effect           : "slideRight" }
                          ]);
                          
});