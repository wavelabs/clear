'use strict';

app.directive('clearPreview', function () {
  return {
    restrict: 'A',
    scope: {
      storie: '='
    },
    templateUrl: 'views/_clear-preview.html'
  }
});
