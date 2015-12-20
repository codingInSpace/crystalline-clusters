angular.module('ccApp')
  .controller('WebglController', ['$scope', function ($scope) {

    $scope.canvasWidth = 400;
    $scope.canvasHeight = 400;
    $scope.dofillcontainer = true;
    // $scope.cameraGotReset = false;

    $scope.resetCamera = function () {
        $scope.$broadcast('resetCamera', {});
    }

  }]);
