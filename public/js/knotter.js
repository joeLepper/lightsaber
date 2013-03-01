var knotCnv   = document.getElementById('knot-canvas')
  , knotCtx   = knotCnv.getContext('2d')
  , threads   = 24 //must be an even int
  , columns   = window.innerWidth / (threads + 1)
  , lineWidth = columns * .5 
  , rows      = ((threads / 4) * 3)
  , rowHeight = window.innerHeight / rows
  , threadArr = []
  , oldScrTop = 0
  , curScrTop = 0
  , threadObj = {}

  , buildRow = function(){

  	console.log("@@@@ || ---- BUILD ROW ---- || @@@@");
		console.log(threadArr);

  	skipThread = false;

  	for(var i = 0; i < threads / 2; i++){
  		

  		if(skipThread){
  			skipThread = false;
  		}
  		else{
	  		var cross = randomXToY(0,1);

	  		threadArr[i]
	  		  .cross
	  		  .push(cross);

	  		threadArr[threadArr.length - (i + 1)]
	  		  .cross
	  		  .push(cross * -1);

	  		if(cross != 0 && i !== ( threads / 2 ) - 1){

	  			threadArr[i + 1]
		  		  .cross
		  		  .push(cross * -1);

		  		threadArr[threadArr.length - (i + 2)]
		  		  .cross
		  		  .push(cross);

		  		skipThread = true;
	  		};
  		}
  		console.log("thread: " + i)
  		console.log(threadArr[i].cross.length)
  		console.log("thread: " + parseInt(threadArr.length - (i + 1)))
  		console.log(threadArr[threadArr.length - (i + 1)].cross.length)
  	}
  	for(var j = 0; j < threadArr.length; j++){
 			
	  	threadArr[j].pos.push( [ threadArr[j].pos[threadArr[j].pos.length - 1][0] + ( columns * threadArr[j].cross[threadArr[j].cross.length - 1] )
	  												 , threadArr[j].pos[threadArr[j].pos.length - 1][1] - rowHeight ]);
	  }
  }

  , drawSegment = function(_thrObj, _row){

  		knotCtx.strokeStyle = _thrObj.color;
  		knotCtx.lineWidth   = lineWidth;
  		knotCtx.lineCap     = 'round'

  		knotCtx.beginPath();
	  	knotCtx.moveTo(_thrObj.pos[_row][0], _thrObj.pos[_row][1]);
	  	knotCtx.lineTo(_thrObj.pos[_row + 1][0], _thrObj.pos[_row + 1][1]);
	  	knotCtx.stroke();

	  	if(_thrObj.cross[_row] === -1){
	  		
	  		knotCtx.beginPath();
		  	knotCtx.strokeStyle = '#111133';
		  	knotCtx.lineWidth   = 3;
		  	knotCtx.moveTo( _thrObj.pos[_row][0]     + ( lineWidth * .39 ), _thrObj.pos[_row][1]     - ( lineWidth * .39 ) );
		  	knotCtx.lineTo( _thrObj.pos[_row + 1][0] + ( lineWidth * .39 ), _thrObj.pos[_row + 1][1] - ( lineWidth * .39 ) );
		  	knotCtx.stroke();

	  		knotCtx.beginPath();
		  	knotCtx.strokeStyle = '#111133';
		  	knotCtx.lineWidth   = 1;
		  	knotCtx.moveTo( _thrObj.pos[_row][0]     - ( lineWidth * .85 ), _thrObj.pos[_row][1]     /*+ ( lineWidth * .36 )*/ );
		  	knotCtx.lineTo( _thrObj.pos[_row + 1][0] - ( lineWidth * .36 ), _thrObj.pos[_row + 1][1] + ( lineWidth * .36 ) );
		  	knotCtx.stroke();
	  	}
	  	else if(_thrObj.cross[_row] === 1){
	  		
	  		knotCtx.beginPath();
		  	knotCtx.strokeStyle = '#111133';
		  	knotCtx.lineWidth   = 3;
		  	knotCtx.moveTo(_thrObj.pos[_row][0]     - ( lineWidth * .39 ),     _thrObj.pos[_row][1] - ( lineWidth * .39 ) );
		  	knotCtx.lineTo(_thrObj.pos[_row + 1][0] - ( lineWidth * .39 ), _thrObj.pos[_row + 1][1] - ( lineWidth * .39 ) );
		  	knotCtx.stroke();

	  		knotCtx.beginPath();
		  	knotCtx.strokeStyle = '#111133';
		  	knotCtx.lineWidth   = 1;
		  	knotCtx.moveTo(_thrObj.pos[_row][0]     + ( lineWidth * .85 ),     _thrObj.pos[_row][1] /*+ ( lineWidth * .39 )*/ );
		  	knotCtx.lineTo(_thrObj.pos[_row + 1][0] + ( lineWidth * .39 ), _thrObj.pos[_row + 1][1] + ( lineWidth * .39 ) );
		  	knotCtx.stroke();
	  	}
  }

  , randomXToY = function (minVal,maxVal){
	  var randVal = minVal+(Math.random()*(maxVal-minVal));
	  return Math.round(randVal);
	}

  , scrDraw = function(scrDelta){

  	if(scrDelta > 0){

	  	knotCtx.clearRect (0, 0, knotCnv.width, knotCnv.height);
	  	threadArr.sort(function(a,b){
	  		return a.order - b.order
	  	});

	  	for(var rowIndex = 0; rowIndex < threadArr[0].pos.length - 1; rowIndex++){
	  		var skipThread = false;

	  		// if(rowIndex % 2 === 0){
	  		// 	for(var i = 0; i < threadArr.length; i++){
		  	// 		drawSegment(threadArr[i], rowIndex)
	  		// 	}
	  		// }
	  		// else{
	  		// 	for(var i = threadArr.length - 1; i >= 0; i--){
		  	// 		drawSegment(threadArr[i], rowIndex)
	  		// 	}
	  		// }
	  		$.each(threadArr, function(){
	  			drawSegment(this, rowIndex)
	  		})
	  		$.each(threadArr, function(threadIndex){
	  			if(skipThread){
	  				skipThread = false;
	  			}
	  			else{
		  			if(this.cross[rowIndex] > 0){
		  				var movingThread = threadArr.splice(threadIndex,1);
		  				threadArr.splice(threadIndex + 1, 0, movingThread[0]);
		  				skipThread = true
		  			}
	  			}
	  		})
	  	};

	  	if(threadArr[0].pos[threadArr[0].pos.length - 1][1] > 0){

	  		buildRow()
	  	}


	  	$.each(threadArr, function(){

	  		for(var i = 0; i < this.pos.length; i++){
	  			this.pos[i][1] += scrDelta;
	  		};
	  	});
  	};
  	// console.log(threadArr);
  }

  , setScrDelta = function(scrTop){

  	scrDelta = (scrTop - oldScrTop) * 4;
  	if(scrDelta < 0){
  		scrDelta = 0;
  	}
  	oldScrTop = scrTop;
  	return scrDelta;
  };


$(document).ready(function(){
	console.log(threads / 2);
	for(var i = 0; i < threads / 2; i++){

		threadObj = {};
		threadObj.color = '#'+Math.floor(Math.random()*((16777215 / 24) + ((16777215 / 24)  ))).toString(16);

		while(threadObj.color.length < 7){
			threadObj.color = '#'+Math.floor(Math.random()*((16777215 / 24) + ((16777215 / 24)  ))).toString(16);
		}

		threadArr[i] = threadObj;
		threadArr[(threads - 1) - i] = $.extend(true, {}, threadObj);
	};

	for(var i = 0; i < threadArr.length; i++){

		threadArr[i].pos   = [];
		threadArr[i].cross = [];
		threadArr[i].order = i;

		threadArr[i].pos.push( [ ( columns * (i + 1) ), 0 ] );
	};

	knotCnv.height       = window.innerHeight;
	knotCnv.style.height = window.innerHeight + 'px';

	knotCnv.width        = window.innerWidth;
	knotCnv.style.width  = window.innerWidth + 'px';

	$(window).scroll(function(){
		var scrDelta = setScrDelta($(window).scrollTop());
		scrDraw(scrDelta);
	})
});