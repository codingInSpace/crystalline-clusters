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

          var material = new THREE.MeshPhongMaterial({color: 0x000000});
        	var geometry = new THREE.OctahedronGeometry(60);

          var mesh = new THREE.Mesh(geometry, material);
          mesh.scale.x = 0.5;
          mesh.scale.y = 1.3;
          mesh.position.set(0, 0, 0);
      		scene.add(mesh);


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
