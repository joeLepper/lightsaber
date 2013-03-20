'use strict';


// Declare app level module which depends on filters, and services
var browserPie = angular.module('browserPie', []);

browserPie.directive('browsermap', function() {
  return function(){
  	alert('map!')
  }
});

browserPie.directive('browserlegend', function(){
	return function(){
		alert('legend!')
	}
})

var authCtrl = function ($scope) {

	var clientId = '810156177674.apps.googleusercontent.com'
  , apiKey   = 'AIzaSyCsTwQ2i-ZWIajBKJpZoOjNbmCZBdJZ_FQ'
  , scopes   = 'https://www.googleapis.com/auth/analytics.readonly'

  , handleClientLoad = function(){
  	console.log("called");
  	console.log(gapi);
  	if(typeof gapi.client === 'undefined'){
  		window.setTimeout(handleClientLoad,1)
  	}
  	else{
  		setKey(apiKey);
  	};
  }

  , setKey = function(key){
  	gapi.client.setApiKey(key);
  	window.setTimeout(checkAuth,1);
  }

  , checkAuth = function(){
  	gapi.auth.authorize( { client_id : clientId 
  											 , scope     : scopes
  											 , immediate : true 
  											 }
  										 , handleAuthResult );
  }

  , handleAuthResult = function(authResult){
  	console.log(authResult);
  	var authorizeButton = document.getElementById('authorize-button');
  	if (authResult && !authResult.error){
  		gapi.client.load('analytics', 'v3', handleAuthUI);
  	}
  	else{
  		authorizeButton.style.visibility = '';
  		authorizeButton.onclick = handleAuthClick;
  	}
  }

  , handleAuthUI = function(){
  	var authorizeButton = document.getElementById('authorize-button')
  	  , apiCallButton   = document.getElementById('make-api-call-button');

		authorizeButton.style.visibility = 'hidden';
		apiCallButton.style.visibility = '';
		apiCallButton.onclick = makeApiCall();
  }

  , makeApiCall = function(e){
  	console.log(e);
  	console.log("make")
  	queryAccounts();
  }

  , handleAuthClick = function(){
  	gapi.auth.authorize( { client_id : clientId 
  											 , scope     : scopes
  											 , immediate : false 
  											 }
  										 , handleAuthResult );
  	return false;
  }

  , queryAccounts = function(){
  	console.log('Querying accounts');
  	gapi.client.analytics.management.accounts.list().execute(handleAccounts);
  }

  , handleAccounts = function(results){
  	if(!results.code){
  		if(results && results.items && results.items.length){
  			console.log(results);
  			chooseAccount(results);
  		}
  		else{
  			console.log("no accounts found for you, dude.");
  		}
  	}
  	else{
  		console.log('There was an error querying accounts' + results.message);
  	}
  }

  , chooseAccount = function(results){
    var firstAccountId = results.items[0].id;
    queryWebProperties(firstAccountId);
  }

	, queryWebProperties = function(accountId) {
	  	console.log('Querying Webproperties.');
	  	gapi
	  	  .client
	  	  .analytics
	  	  .management
	  	  .webproperties
	  	  .list({'accountId':accountId})
	  	  .execute(handleWebProperties);
	  }

	  , handleWebProperties = function(results){
	  	console.log('Handling web properties');
	    console.log(results);
	  	if(!results.code){
	  		if (results && results.items && results.items.length){
	  			var firstAccountId = results.items[0].accountId
	  			  , firstWebPropertyId = results.items[0].id;

	  			queryProfiles(firstAccountId, firstWebPropertyId);
	  		}
	  		else {
	  			console.log('no webproperties found for this user');
	  		}
	  	}
	  	else {
	  		console.log('There was an error querying webproperties: ' + results.message);
	  	}
	  }

	  , queryProfiles = function( accountId, webpropertyId) {
	  	console.log('Querying profiles.');

	  	gapi
	  	  .client
	  	  .analytics
	  	  .management
	  	  .profiles
	  	  .list( { 'accountId'     : accountId
	  					 , 'webPropertyId' : webpropertyId } )
	  	  .execute(handleProfiles);
	  }

	  , handleProfiles = function (results) {
	  	if(!results.code) {
	  		console.log('Handling profile');
	      console.log(results);
	  		if (results && results.items && results.items.length) {
	  			var firstprofileId = results.items[0].id;

	  			queryCoreReportingApi(firstprofileId);
	  		}
	  		else {
	  			console.log('No profiles found for this user');
	  		};
	  	};
	  }

	  , queryCoreReportingApi = function(profileId){
	  	console.log('Querying Core Reporting API.');

	  	gapi
	  	  .client
	  	  .analytics
	  	  .data
	  	  .ga
	  	  .get( { 'ids'        : 'ga:' + profileId
	  	  	    , 'start-date' : '2013-01-03'
	  	  	    , 'end-date'   : '2013-03-03'
	  	  	    , 'metrics'    : 'ga:visits' 
	  	  	    , 'dimensions' : 'ga:browser, ga:browserVersion, ga:operatingSystem'
	  	  			} ).execute(handleCoreReportingResults);
	  }

	  , handleCoreReportingResults = function(results) {
	  	if(results.error) {
	  		console.log("There was an error querying core reporting API: " + results.error);
	  	}
	  	else {
	  		printResults(results);
	  	}
	  }

	  , printResults = function(results) {
	  	var totalVisits = 0;
	  	console.log('Printing results')

	  	if(results.rows && results.rows.length) {
	  		console.log('Full results: ');
	  		console.log(results);
	  		console.log('Profile Name: ', results.profileInfo.profileName);
	  		$('.results-table').append("<tr><th>" 
	  																	+ results.columnHeaders[0].name + '</th><th>' 
	  																	+ results.columnHeaders[1].name + '</th><th>'  
	  																	+ results.columnHeaders[2].name + '</th><th>'  
	  																	+ results.columnHeaders[3].name + '</th></tr>' )
	  		for ( var i = 0; i < results.rows.length; i++){
	  			totalVisits += parseInt(results.rows[i][3]);
					$('.results-table').append('<tr><td>'
																			 + results.rows[i][0] + '</td><td>'
																			 + results.rows[i][1] + '</td><td>'
																			 + results.rows[i][2] + '</td><td>'
																			 + results.rows[i][3] + '</td></tr>')
					// console.log(typeof parseInt(results.rows[i][3]));
					// console.log(parseInt(results.rows[i][3]));
					browserObj.addVisitors(results.rows[i]);
	  		}
	  		drawMap(totalVisits);
	  	}
	  	else {
	  		console.log('No results found');
	  	}
	  }

	  , drawMap = function(totalVisits){
	  	var mapCnv     = document.getElementById('visualize')
			  , mapCtx     = mapCnv.getContext('2d')
			  , vArr       = browserObj.viewObj()
			  , mapH       = window.innerHeight * .85
			  , mapW       = window.innerWidth  * .68
			  , lastX      = 0
			  , curW       = 0
	      , verObj     = {}
	      , shapes     = []
	      , hue        = 120
	      , saturation = '50%'
	      , light      = '50%'
	      , j

			  , drawRec = function(recObj, cMod){
	        mapCtx.beginPath();
	        if (typeof cMod === 'undefined'){
	          cMod = 0;
	          mapCtx.fillStyle = 'hsl(' + recObj.hugh + ',' + recObj.satch + ',' + recObj.lite + ')';
	        }
	        if (cMod){
	          var moddedSatch = (parseInt(recObj.satch) + cMod) + '%'
	            , moddedLite  = (parseInt(recObj.lite) + cMod) + '%'
	          mapCtx.fillStyle = 'hsl(' + recObj.hugh + ',' + moddedSatch + ',' + moddedLite + ')';
	        }
					mapCtx.fillRect( recObj.x, recObj.y, recObj.w, recObj.h);
					mapCtx.closePath();
					mapCtx.stroke();
			  }

	      , buildMapCnv = function(){
	        mapCnv.height = mapH;
	        mapCnv.width = mapW;
	        mapCnv.style.height = mapH + 'px';
	        mapCnv.style.width = mapW + 'px';
	        mapCtx.font = "20px Arial";
	      }

	      , buildColArr = function(cIndex){
	        var vers = [];
	        for( var version in vArr[cIndex].vers ){
	          verObj = { version : version 
	                   , total   : vArr[cIndex].vers[version]}
	          vers.push(verObj);
	        };
	        vers.sort(function(a,b){
	          return b.total - a.total
	        })
	        return vers;
	      }

	      , populateColumnRows = function(colArr, cIndex){
	        var curY = 0
	          , curH = 0;
	        for( var i = 0; i < colArr.length; i++){
	          $( '#list-' + cIndex ).append('<li id="version-' + cIndex + '-' + i + '">' + colArr[i].version + '</li>');
	          console.log((colArr[i].total / vArr[cIndex].total) * mapH ); 
	          curH = (colArr[i].total / vArr[cIndex].total) * mapH;

	          shapes[cIndex][i] = { x : lastX
	                              , y : curY
	                              , w : curW 
	                              , h : curH 
	                              , hugh  : hue
	                              , satch : saturation
	                              , lite  : light }
	          drawRec(shapes[cIndex][i]);
	          $('#version-' + cIndex + '-' + i)
	            .data('column', cIndex)
	            .data('row', i)
	            .on('mouseover', function(e){
	              highlightShape(e);
	          })
	          mapCtx.fillStyle = '#999999';
	          mapCtx.fillText(colArr[i].version, lastX, curY);
	          curY += curH;
	          hue += 10;
	        }
	      }

	      , buildColumn = function(cIndex){
	        var colArr
	          , vers;

	        console.log("// --------    " + vArr[cIndex].browser + "    -------- //");

	        shapes[cIndex]    = [];
	        vers              = [];
	        curW              = mapW * (vArr[cIndex].total / totalVisits);
	        // shapes[cIndex][0] = { x : lastX
	        //                     , y     : 0
	        //                     , w     : curW 
	        //                     , h     : mapH 
	        //                     , color : 'hsl(' + hue + ', 50%, 50%)' };

	        $('.browserlegend').append('<h2 id="browser-' + cIndex + '">' + vArr[cIndex].browser + '</h2><ul id="list-' + cIndex +'">');
	        // $('#browser-' + cIndex)
	        //   .data('column', cIndex)
	        //   .data('row', 0)
	        //   .on('mouseover', function(e){
	        //     highlightShape(e);
	        // })
	        colArr = buildColArr(cIndex)
	        populateColumnRows(colArr, cIndex);

	        $('.legend').append('</ul>')
	        lastX += curW;
	      }

	      , highlightShape = function(e){
	        $(e.target).off('mouseover');
	        $(e.target).on('mouseout', function(e){
	          drawAll();
	          $(e.target).off('mouseout');
	          $(e.target).on('mouseover', function(e){
	            highlightShape(e);
	          })
	        });
	        mapCnv.width = mapCnv.width;
	        for ( var k = 0; k < shapes.length; k++ ){
	          for ( var l = 0; l < shapes[k].length; l++){
	            if ( k === $(e.target).data('column') && l === $(e.target).data('row')){
	              drawRec(shapes[k][l], 20);
	            }
	            else{
	              drawRec(shapes[k][l], -20);
	            };
	          };
	        };
	      }

	      , drawAll = function(){
	        for ( var k = 0; k < shapes.length; k++ ){
	          for ( var l = 0; l < shapes[k].length; l++){
	            drawRec(shapes[k][l]);
	          };
	        };
	      }

	    buildMapCnv();

			for(j = 0; j < vArr.length; j++){
	      buildColumn(j);
			};
	  }
  handleClientLoad();

	// makeApiCall()
}
// MyCtrl2.$inject = [];
