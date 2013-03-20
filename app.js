var express    = require('express')
  , app        = express()
  , server     = require('./server')
  , reqHandle  = require('./request')

app.use(express.static(__dirname + '/public'));

app.configure(function(){
  app.use(express.bodyParser());
});

app.get('/', function(req,res){
  
  console.log("Service!");
	reqHandle.start(req,res);
});
app.get('/webgl', function(req,res){
  
  console.log("3D!!!!");
	reqHandle.webgl(req,res);
});

server.start(app);