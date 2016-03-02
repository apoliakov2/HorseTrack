describe('Test "inputService" service', function() {

  var inputService, commandsService;

  beforeEach(function() {
    angular.mock.module('horsetrack');

    commandsService = {
      executeCommand: jasmine.createSpy('executeCommand')
    };

    angular.mock.module(function($provide) {
      $provide.factory('commandsService', function() {
        return commandsService;
      });
    });

    inject(function($injector) {
      inputService = $injector.get('inputService');
    });
  });

  it ('Should call executeCommand() function of commands Factory', function() {
    inputService.parseInput({which: 56});
    inputService.parseInput({which: 13});
    expect(commandsService.executeCommand).toHaveBeenCalled();
  });

});

