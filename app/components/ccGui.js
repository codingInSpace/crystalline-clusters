'use strict';

angular.module('ccApp')
  .directive('ccGui', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
          var gui = new dat.GUI();

          var parameters = {
            state: true,
            scale: "D minor"
          };

          var state = gui.add( parameters, 'state' ).name('Music On/Off').listen();
          var musicScale = gui.add( parameters, 'scale', [ "D minor", "C dorian", "A lydian" ] ).name('Music scale').listen();

          state.onChange(function(value){
              scope.isplaying = value;
              scope.$apply();
          });

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

          gui.open();
      }
    };
  });
