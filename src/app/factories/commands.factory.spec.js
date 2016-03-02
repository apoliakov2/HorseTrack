describe("Test 'commandsService' service", function() {

  var commands, inventoryService, horsesService;

  beforeEach(function() {
    angular.mock.module('horsetrack');

    inventoryService = {
        restock: jasmine.createSpy('restock'),
        dispenseCash: jasmine.createSpy('dispenseCash')
    };

    horsesService = {
        setWinningHorse: jasmine.createSpy('setWinningHorse'),
        setHorseWagedOn: jasmine.createSpy('setHorseWagedOn')
    };


    angular.mock.module(function($provide) {
      $provide.service('inventoryService', function () {
        return inventoryService;
      });
      $provide.service('horsesService', function() {
        return horsesService;
      });
    });

    inject(function($injector) {
      commands = $injector.get('commandsService');
    });
  });

  it ('Should call "restock" function of inventoryService when type "r"', function() {
    commands.executeCommand('r');
    expect(inventoryService.restock).toHaveBeenCalled();
  });

  it ('Should call "restock" function of inventoryService when type "R"', function() {
    commands.executeCommand('R');
    expect(inventoryService.restock).toHaveBeenCalled();
  });

  it ('Should NOT call "restock" function of inventoryService when type "f"', function() {
    commands.executeCommand('f');
    expect(inventoryService.restock).not.toHaveBeenCalled();
  });

  it('Should call "setWinningHorse" function of horsesService when type "w 2"', function() {
    commands.executeCommand('w 2');
    expect(horsesService.setWinningHorse).toHaveBeenCalled();
  });

  it('Should call "setHorseWagedOn" horsesService when type "1 32"', function() {
    commands.executeCommand('1 32');
    expect(horsesService.setHorseWagedOn).toHaveBeenCalled();
  });

  it('Should return -1 when typq "q"', function() {
    var res = commands.executeCommand('q');
    expect(res).toEqual(-1);
  });

  it('Should return -1 when typq "Q"', function() {
    var res = commands.executeCommand('Q');
    expect(res).toEqual(-1);
  });

})
