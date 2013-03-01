var express    = require('express')
  , app        = express()
  , server     = require('./server')
  , reqHandle  = require('./request')

app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res){
  console.log("Service!");
	reqHandle.start(req,res);
});
app.get('/knotter', function(req,res){
	console.log('knotting')
	reqHandle.knot(req,res);
});

server.start(app);