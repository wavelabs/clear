'use strict';

app.directive('clearForm', function () {
  return {
    restrict: 'A',
    scope: {
      storie: '='
    },
    templateUrl: 'views/_clear-form.html'
  }
});
