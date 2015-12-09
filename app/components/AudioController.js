angular.module('ccApp')
  .controller('AudioController', ['$scope', function ($scope) {

    $scope.dMinor = ["A3", "C3", "D3", "E3", "F3", "G3", "A4", "C4", "D4", "F4", "G4"];
    $scope.dMinorBass = ["C2", "D2", "A2", "C3", "D3"];

    $scope.aMajor = ["A3", "B3", "Db3", "E3", "Gb3", "A4"];
    $scope.aMajorBass = ["A2", "E2", "A3"];
  }]);
