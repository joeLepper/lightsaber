var start = function (req,res){
		
    res.sendfile('public/index.html');
	}
  , webgl = function (req,res){
		
    res.sendfile('public/webgl.html');
	}

exports.start = start;
exports.webgl = webgl;