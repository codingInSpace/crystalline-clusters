'use strict';

angular.module('ccApp')
  .directive('resetCamera', function () {
    return {
      replace: false,
      link: function(scope, element, attributes){
        element.addClass('reset-camera-button');
      },
      templateUrl: "app/components/resetCamera/resetCamera.html"
    }
  });
