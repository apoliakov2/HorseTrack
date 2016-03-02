describe("Test 'MainController' controller", function() {

  var $scope;

  beforeEach(function() {
    angular.mock.module('horsetrack');
  });

  beforeEach(inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $controller('MainController', {$scope: $scope});
  }));

  it("Checks if init() and quitApp() functions are defined", function() {
    expect($scope.init).not.toBeUndefined();
    expect($scope.quitApp).not.toBeUndefined();
  });

  it("calls init() function that calls horsesService.reset() and initializes scope model", function() {
    $scope.init();

    expect($scope.output).not.toBeUndefined();
    expect($scope.caret).not.toBeUndefined();
    expect($scope.input).not.toBeUndefined();

    expect($scope.cursorHidden).not.toBeUndefined();
    expect($scope.cursorInterval).not.toBeUndefined();
    expect($scope.isInitialized).not.toBeUndefined();
  });

  it("calls quitApp() and checks that main variables in scope are empty", function() {
    $scope.quitApp();
    expect($scope.output).toEqual('');
    expect($scope.input).toEqual('');
    expect($scope.caret).toEqual('');
    expect($scope.isInitialized).toBe(false);
  });
});

