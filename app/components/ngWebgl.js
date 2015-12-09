'use strict';

angular.module('ccApp')
  .directive('ngWebgl', function () {
    return {
      restrict: 'A',
      scope: {
        'width': '=',
        'height': '=',
        'fillcontainer': '=',
      },
      link: function postLink(scope, element, attrs) {

        var camera, scene, renderer,
          shadowMesh, icosahedron, light,
          mouseX = 0, mouseY = 0,
          contW = (scope.fillcontainer) ?
            element[0].clientWidth : scope.width,
          contH = scope.height,
          windowHalfX = contW / 2,
          windowHalfY = contH / 2,
          materials = {};

        var amountCrystals = 18;
        var crystalMeshes = [];


        scope.init = function () {

          // Camera
          camera = new THREE.PerspectiveCamera( 20, contW / contH, 1, 10000 );
          camera.position.z = 1800;

          // Scene
          scene = new THREE.Scene();

          // Ligthing
          light = new THREE.DirectionalLight( 0xffffff );
          light.position.set( 0, 0, 1 );
          scene.add( light );

          // color selection
          var colors = ['#990099', '#ff4dc3', '#ff4da6', '#bb33ff', '#6600ff'];

        	var commonGeometry = new THREE.OctahedronGeometry(60);

          // Glow
          var glowGeometry = new THREE.OctahedronGeometry(75);
          var glowMaterial = new THREE.ShaderMaterial({
              uniforms: {},
            	vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
            	fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
            	side: THREE.BackSide,
            	blending: THREE.AdditiveBlending,
            	transparent: true
          });

          for (var i = 0; i < amountCrystals; ++i) {
            var color = colors[Math.floor(Math.random()*colors.length)];
            var material = new THREE.MeshPhongMaterial({
              color: color,
              emissive: new THREE.Color("rgb(30, 30, 30)"),
              transparent: true,
              opacity: 0.96
            });

            crystalMeshes[i] = new THREE.Mesh(commonGeometry, material);

            // Add glow to crystal
            var glow = new THREE.Mesh(glowGeometry, glowMaterial);
            glow.receiveShadow = false;
            glow.castShadow = false;
            crystalMeshes[i].add(glow);

            crystalMeshes[i].rotation.z = Math.random() * (0.4 - -0.4) - 0.4;

            var xPos = 0, yPos = 0, zPos = 0;

            while(Math.abs(xPos) <= 200 && Math.abs(zPos) <= 200) {
          		xPos = Math.random() * (300 - -300) - 300;
          		zPos = Math.random() * (400 - -400) - 400;
            }

            yPos = Math.random() * (100 - -100) - 100;

        		crystalMeshes[i].position.set(xPos, yPos, zPos);

            var stretch = Math.random() * (1.7 - 0.9) + 0.9;
        		crystalMeshes[i].scale.set(0.7, stretch, 0.7);

            // Assign pos or neg value to be used as rotation direction in render loop, less calculation
            crystalMeshes[i].direction = Math.random() < 0.5 ? -1 : 1;

            scene.add(crystalMeshes[i]);
          }

          renderer = new THREE.WebGLRenderer( { antialias: true } );
          renderer.setClearColor( 0xffffff );
          renderer.setSize( contW, contH );

          // element is provided by the angular directive
          element[0].appendChild( renderer.domElement );

          document.addEventListener( 'mousemove', scope.onDocumentMouseMove, false );
          window.addEventListener( 'resize', scope.onWindowResize, false );

        };

        scope.onWindowResize = function () {
          scope.resizeCanvas();
        };

        scope.onDocumentMouseMove = function ( event ) {
          mouseX = ( event.clientX - windowHalfX );
          mouseY = ( event.clientY - windowHalfY );
        };

        scope.resizeCanvas = function () {
          contW = (scope.fillcontainer) ?
            element[0].clientWidth : scope.width;
          contH = scope.height;

          windowHalfX = contW / 2;
          windowHalfY = contH / 2;

          camera.aspect = contW / contH;
          camera.updateProjectionMatrix();

          renderer.setSize( contW, contH );

        };

        scope.animate = function () {
          requestAnimationFrame( scope.animate );
          scope.render();

        };

        scope.render = function () {
          camera.position.x += ( mouseX - camera.position.x ) * 0.05;
          // camera.position.y += ( - mouseY - camera.position.y ) * 0.05;

          camera.lookAt( scene.position );
          renderer.render( scene, camera );

          // Rotate each crystal
      		for (var i=0; i < amountCrystals; ++i) {
      			var rotation = Math.random() * (0.01 - 0.0005) + 0.0005;
      			var direction = crystalMeshes[i].direction;
      			crystalMeshes[i].rotation.y -= rotation * direction;
      			// crystalMeshes[i].rotation.z -= 0.0005 * direction;
      		}

        };

        scope.$watch('fillcontainer + width + height', function () {
          scope.resizeCanvas();
        });

        // Run
        scope.init();
        scope.animate();

      }
    };
  });
