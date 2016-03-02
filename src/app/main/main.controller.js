export function mainController($scope, $interval, $log, $document, inputService, horsesService) {
  'ngInject';

  $scope.init = function () {
    horsesService.reset();
    $scope.output = inputService.getInitialInput();
    $scope.caret = '_';
    $scope.input = '';

    $scope.cursorHidden = false;
    $scope.cursorInterval = $interval(function () {
      $scope.cursorHidden = !$scope.cursorHidden;
    }, 500);


    // Catch Backspace clicks
    $document.on('keydown', function(e) {
      $scope.isInitialized = false;
      if(e.which === 8) {
        $log.debug('Backspace clicked');
        let retValue = inputService.parseInput(event);
        e.preventDefault();
        if (angular.isDefined(retValue) && angular.isDefined(retValue.input)) {
          $scope.input = retValue.input;
        }
      }
      $scope.isInitialized = true;
    });

    $scope.isInitialized = true;
  };

  $scope.onKeyPress = function (event) {
    $log.debug('onKeyPress key code: ' + event.which);
    let retValue = inputService.parseInput(event);

    if (angular.isDefined(retValue) && angular.isDefined(retValue.input) && angular.isDefined(retValue.output)) {
      $scope.input = retValue.input;
      if (angular.isDefined(retValue.output) && retValue.output.length > 0) {
        $scope.output = $scope.output.concat(retValue.output);
      }
    }
  };

  // Quit the app - remove cursor, set all strings to ''
  $scope.quitApp = function () {
    $interval.cancel($scope.cursorInterval);
    $scope.output = $scope.input = $scope.caret = '';
    $scope.isInitialized = false;
  };

  $scope.init();
};
