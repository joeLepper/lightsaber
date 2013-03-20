var animating = false
  , camera
  , scene
  , renderer
  , controls
  // , geometry
  , material
  , mesh
  , light
  , visitors = [3,7,18,20,11]
  , totalVisitors = 0
  , shapeObjs = []
  , shapeGroup
  , curX = 0
  , curY = 0

  , init3D = function() {

  		shapeGroup = new THREE.Object3D();

      camera = new THREE.PerspectiveCamera( 75, $('.map').width() / $('.map').height(), 1, 10000 );
      camera.position.z = 700;

      scene = new THREE.Scene();

      light = new THREE.DirectionalLight( 0xffffff, 1.5 );
      light.position.set( 0,1,3 );
      scene.add( light );

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize( $('.map').width(), $('.map').height() );

      $('.map').append( renderer.domElement );
      scene.add( shapeGroup );
      camera.lookAt( shapeGroup.position );

      shapeGroup.position.x = -1 * ($('.map').width()  / 2);
      shapeGroup.position.y = ( -1 * ($('.map').height() / 2 ) ) + 70;
      // shapeGroup.rotation.x = Math.PI / 5;
      // shapeGroup.rotation.y = Math.PI / 5;


		}

    , constructShape = function( shapeObj ){
    	var geometry = new THREE.CubeGeometry( shapeObj.w, shapeObj.h, 200 )
    	  , color    = new THREE.Color(0xffffff)
        , material = new THREE.MeshPhongMaterial()

      color.setHSL(shapeObj.hugh,shapeObj.satch,shapeObj.lite);
      material.color = color;
      mesh = new THREE.Mesh( geometry, material );
      mesh.position.x = shapeObj.x + (shapeObj.w/2);
      mesh.position.y = shapeObj.y + (shapeObj.h/2);
      shapeGroup.add( mesh );
    }

    // , drawShape = function( shape ){
      
    //   shapes.push( shape );
    //   scene.add( shape );

    // }

    , animate = function() {
      // note: three.js includes requestAnimationFrame shim
      requestAnimationFrame( animate );

      if(shapeGroup.position.x !== -25){
        if(shapeGroup.position.x > -24.75){
          shapeGroup.position.x -= 1;
        }
        else if(shapeGroup.position.x < -25.25) {
          shapeGroup.position.x += 1;
        }
      }
      if(camera.position.z !== 650){
        if(camera.position.z < 649){
          camera.position.z += 1;
        }
        else if(camera.position.z > 651){
          camera.position.z -= 1;
        }
      }
      if(shapeGroup.rotation.z < .5){
      	shapeGroup.rotation.z += .05;
      }
      if(shapeGroup.rotation.x !== -1){
        if(shapeGroup.rotation.x > -.94){
          shapeGroup.rotation.x -= 0.05;
        }
        else if(shapeGroup.rotation.x < -1){
          shapeGroup.rotation.x += 0.01;
        }
      }
      renderer.render( scene, camera );
    }

 	, hslToHex = function(h,s,l){
 		var foo = colorToHex(hslToRgb(h,s,l))

 		return foo;
 	};

$(document).ready(function(){
	$('.map-container').height(function(){
		return window.innerHeight - $('.page-title').height() - 10
	})
	init3D();
	console.log("INIT")
})
