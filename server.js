var port = 1234

  , start = function(app){
      app.listen(port);
      console.log("Started listening to " + port);
    };

exports.start = start;