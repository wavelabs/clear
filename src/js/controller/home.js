'use strict';

app.controller('HomeCtrl', ['$scope', function ($scope) {
  $scope.storie = {
    who: '',
    what: 'Something',
    why: 'I don\'t know',
    description: 'explain this more!'
  };

  console.log($scope.storie);
}]);
