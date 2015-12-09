'use strict';

angular.module('ccApp')
  .directive('ccGui', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
          var gui = new dat.GUI();

          var parameters = {
            scale: "D minor"
          };

          var musicScale = gui.add( parameters, 'scale', [ "D minor", "A major" ] ).name('Music scale').listen();

          musicScale.onChange(function(value){
              if (value == "D minor") {
                  scope.scale = "dMinor";
                  scope.$apply();
              }

              else if (value == "A major") {
                  scope.scale = "aMajor";
                  scope.$apply();
              }
          });

          // Hide by default
          gui.open();
      }
    };
  });
