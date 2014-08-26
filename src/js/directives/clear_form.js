'use strict';

app.controller('ClearFormCtrl', ['$scope', function ($scope) {
  var whoBlood = new Bloodhound({
    datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.value); },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: [
      { value: 'Admin'},
      { value: 'Guest'},
      { value: 'User'},
      { value: 'Logged In User' }
    ]
  });

  whoBlood.initialize();

  $scope.config = { highlight: true };

  $scope.whoData = {
    source: whoBlood.ttAdapter()
  };
}])
.directive('clearForm', function () {
  return {
    restrict: 'A',
    scope: {
      storie: '='
    },
    templateUrl: 'views/_clear-form.html'
  };
});
