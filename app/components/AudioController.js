angular.module('ccApp')
  .controller('AudioController', ['$scope', function ($scope) {

    $scope.dMinor = ["A3", "C3", "D3", "E3", "F3", "G3", "A4", "C4", "D4", "F4", "G4"];
    $scope.dMinorBass = ["C2", "D2", "A2", "C3", "D3"];

    $scope.cDorian = ["A3", "Bb3", "C3", "D3", "Eb3", "F3", "G3", "A4", "Bb4", "C4", "D4", "Eb4"];
    $scope.cDorianBass = ["Bb2", "C2", "Eb2", "G2"];

    $scope.aLydian = ["E3", "Gb4", "A3", "B3", "Db3", "Eb3", "E3", "Gb3", "A4", "B3"];
    $scope.aLydianBass = ["Gb1", "A2", "B2", "E3"];
  }]);
