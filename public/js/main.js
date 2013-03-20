var browserObj = (function(){
	var _bObj = {}

	  , _addVisitors = function(row) {
      var _bVersion = [];

      _bVersion = row[0].split(' ');
      if(_bVersion[0] === "Safari"){
        row[0] = _bVersion[0];
      };

	  	// console.log("//------------- ROW ------------------//")
	  	// console.log(row);
	  	if(!_bObj[row[0]]){
	  		_bObj[row[0]]         = {};
        _bObj[row[0]].browser = row[0];
        _bObj[row[0]].total   = 0;
        _bObj[row[0]].vers    = {};
	  	};

      switch(row[0]){
        case "Internet Explorer":
          if( !_bObj[row[0]].vers[row[1]] ){
            _bObj[row[0]].vers[row[1]] = 0;
          }
          _bObj[row[0]].vers[row[1]] += parseInt(row[3]);
          break;
        default:
          if( !_bObj[row[0]].vers[row[2]] ){
            _bObj[row[0]].vers[row[2]] = 0;
          }
          _bObj[row[0]].vers[row[2]] += parseInt(row[3]);
          break;
      }
	  	_bObj[row[0]].total += parseInt(row[3]);
	  }

	  , _viewObj = function(){
      var bArr = [];
      for( browser in _bObj){
        bArr.push(_bObj[browser]);
      }
      bArr.sort(function(a,b){return b.total - a.total});
	  	return bArr;
	  }

	return { addVisitors : _addVisitors
				 , viewObj     : _viewObj }
})()

  // development
  // , clientId = '810156177674.apps.googleusercontent.com'

  // production
  . clientId = '810156177674-i3qbab1j5q3lme5cvdbrpr1jk6slebci.apps.googleusercontent.com'
  , apiKey   = 'AIzaSyCsTwQ2i-ZWIajBKJpZoOjNbmCZBdJZ_FQ'
  , scopes   = 'https://www.googleapis.com/auth/analytics.readonly'

  , handleClientLoad = function(){
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
      gapi.client.load('analytics', 'v3', makeApiCall);
    }
    else{
      authorizeButton.style.visibility = '';
      authorizeButton.onclick = handleAuthClick;
    }
  }

  , handleAuthUI = function(){
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
        var firstAccountId = results.items[0].id;
        queryWebProperties(firstAccountId);
      }
      else{
        console.log("no accounts found for you, dude.");
      }
    }
    else{
      console.log('There was an error querying accounts' + results.message);
    }
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
          chooseProfile(results);
        }
        else {
          console.log('no webproperties found for this user');
        }
      }
      else {
        console.log('There was an error querying webproperties: ' + results.message);
      }
    }

    , chooseProfile = function(results){
      var authorizeButton = document.getElementById('authorize-button')
        , apiCallButton   = document.getElementById('make-api-call-button')
        , resultsLength   = results.items.length
        , accountId
        , webPropertyId

        , queryProfiles = function() {
          console.log('Querying profiles.');

          gapi
            .client
            .analytics
            .management
            .profiles
            .list( { 'accountId'     : results.items[$('.accounts-form input[name=profile]:checked').val()].accountId
                   , 'webPropertyId' : results.items[$('.accounts-form input[name=profile]:checked').val()].id } )
            .execute(handleProfiles);
        };

      for( var i = 0; i < resultsLength; i++){
        console.log(results.items[i].name);
        $('.accounts-list').append('<li><p><input class="accounts" type="radio" name="profile" value="' + i + '">' + results.items[i].name + '</p></li>');
      }
      authorizeButton.style.visibility = 'hidden';
      apiCallButton.style.visibility = '';
      apiCallButton.onclick = queryProfiles;
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
              , 'start-date' : '2013-01-01'
              , 'end-date'   : '2013-03-15'
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
        for ( var i = 0; i < results.rows.length; i++){
          totalVisits += parseInt(results.rows[i][3]);
          browserObj.addVisitors(results.rows[i]);
        }
        drawMap(totalVisits);
      }
      else {
        console.log('No results found');
      }
    }

    , drawMap = function(totalVisits){
      var vArr       = browserObj.viewObj()
        , mapH       = $('.map').height() // * .85
        , mapW       = $('.map').width() //  * .68
        , lastX      = 0
        , curW       = 0
        , verObj     = {}
        , shapes     = []
        , hue        = 120
        , saturation = 1
        , light      = 0.5
        , j

        , drawRec = function(recObj, cMod){
          // mapCtx.beginPath();
          if (typeof cMod === 'undefined'){
            cMod = 0;
            // mapCtx.fillStyle = 'hsl(' + recObj.hugh + ',' + recObj.satch + ',' + recObj.lite + ')';
          }
          if (cMod){
            var moddedSatch = (parseInt(recObj.satch) + cMod) + '%'
              , moddedLite  = (parseInt(recObj.lite) + cMod) + '%'
            // mapCtx.fillStyle = 'hsl(' + recObj.hugh + ',' + moddedSatch + ',' + moddedLite + ')';
          }
          // mapCtx.fillRect( recObj.x, recObj.y, recObj.w, recObj.h);
          // mapCtx.closePath();
          // mapCtx.stroke();
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
            return a.total - b.total
          })
          return vers;
        }

        , populateColumnRows = function(colArr, cIndex){
          var curY = 0
            , curH = 0;
          for( var i = 0; i < colArr.length; i++){
            console.log((colArr[i].total / vArr[cIndex].total) * mapH); 
            curH = (colArr[i].total / vArr[cIndex].total) * mapH;

            shapes[cIndex][i] = { x     : lastX
                                , w     : curW 
                                , y     : curY
                                , h     : curH 
                                , z     : 200
                                , hugh  : ( hue / 360 )
                                , satch : saturation
                                , lite  : light }
            // drawRec(shapes[cIndex][i]);
            
            constructShape(shapes[cIndex][i]);

            $( '#list-' + cIndex ).append('<li style="color:hsl(' + hue + ',' + saturation + ',' + light + ')"" id="version-' + cIndex + '-' + i + '">' + colArr[i].version + '</li>');
            $('#version-' + cIndex + '-' + i)
              .data('column', cIndex)
              .data('row', i)
              .on('mouseover', function(e){
                handleMouseOver(e);
                highlightShape( $(e.target).data('column'), $(e.target).data('row') );
            })
            // mapCtx.fillStyle = '#999999';
            // mapCtx.fillText(colArr[i].version, lastX, curY);
            curY += curH;
            hue  += 10;
          }
          window.shapes = shapes;
          // debugger;
        }

        , buildColumn = function(cIndex){
          var colArr
            , vers;

          console.log("// --------    " + vArr[cIndex].browser + "    -------- //");

          shapes[cIndex]    = [];
          vers              = [];
          curW              = mapW * (vArr[cIndex].total / totalVisits);

          $('.legend').append('<h2 class="browser-list" id="browser-' + cIndex + '">' + vArr[cIndex].browser + '</h2><ul class="version-list" id="list-' + cIndex +'">');
          $('#browser-' + cIndex)
            .data('column', cIndex)
            .data('row', -1)
            .on('mouseover', function(e){
              handleMouseOver(e);
              highlightShape( $(e.target).data('column'), $(e.target).data('row') );
          })
          colArr = buildColArr(cIndex)
          populateColumnRows(colArr, cIndex);

          $('.legend').append('</ul>')
          lastX += curW;
        }

        , handleMouseOver = function(e){
          $(e.target).off('mouseover');
          $(e.target).on('mouseout', function(e){
            drawAll();
            $(e.target).off('mouseout');
            $(e.target).on('mouseover', function(e){
              handleMouseOver(e);
              highlightShape( $(e.target).data('column'), $(e.target).data('row') );
            })
          });
        }

        , highlightShape = function(column, row){
          console.log(column + ' ' + row)
          // mapCnv.width = mapCnv.width; // erase the canvas
          for ( var k = 0; k < shapes.length; k++ ){
            for ( var l = 0; l < shapes[k].length; l++){
              if ( k === column && ( l === row || row === -1 ) ){
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
          $('.legend').css('height', mapH);
        }
      $('.control-holder').hide();
      animate();

      // buildMapCnv();

      for(j = 0; j < vArr.length; j++){
        buildColumn(j);
      };
    }



