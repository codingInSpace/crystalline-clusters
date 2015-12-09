'use strict';

angular.module('ccApp')
  .directive('ccGui', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
          var gui = new dat.GUI();

          var parameters = {
            radius: 30,
            size: 1,
            rotation: 0.01,
          };
          var radius = gui.add(parameters, 'radius',0).min(30).max(300).step(1).listen();
          var size = gui.add( parameters, 'size' ).min(0.5).max(5).step(0.1).listen();
          var rotation = gui.add(parameters, 'rotation').min(0.001).max(0.050).step(0.001).listen();

        //   element[0].appendChild(gui);
          gui.open();

      }
    };
  });
