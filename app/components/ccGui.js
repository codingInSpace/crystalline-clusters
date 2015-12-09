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

          var musicScale = gui.add( parameters, 'scale', [ "D minor", "C dorian", "A lydian" ] ).name('Music scale').listen();

          musicScale.onChange(function(value){
              if (value == "D minor") {
                  scope.scale = "dMinor";
                  scope.$apply();
              }

              else if (value == "C dorian") {
                  scope.scale = "cDorian";
                  scope.$apply();
              }

              else if (value == "A lydian") {
                  scope.scale = "aLydian";
                  scope.$apply();
              }
          });

          // Hide by default
          gui.open();
      }
    };
  });
