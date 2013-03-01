var	start = function (req,res){
		res.sendfile('public/index.html');
	}

	, knot = function(req,res){
		res.sendfile('public/knotter.html')
	}

exports.start = start;
exports.knot  = knot;