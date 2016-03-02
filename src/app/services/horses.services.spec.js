describe("Test 'horsesService' service", function() {

  var horsesService;

  beforeEach(function() {
    angular.mock.module('horsetrack');
    inject(function($injector) {
      horsesService = $injector.get('horsesService');
    });
  });

  it("Checks that getHorsesList returns array with length = 7", function() {
      let res = horsesService.getHorsesList();
      expect(res.length).toEqual(8);
  });

  it("Checks that setWinningHorse() call set the specified horse number to win", function() {
    var number = 5;
    horsesService.setWinningHorse(number);
    horsesService.horses.forEach(function(entry) {
      if (entry.number === number) {
        expect(entry.didWin).toBe(true);
      } else {
        expect(entry.didWin).toBe(false);
      }
    });
  })

  it("Checks that after reset() call the first horse set to win", function() {
    horsesService.setWinningHorse(6);
    horsesService.reset();
    horsesService.horses.forEach(function(entry) {
      if (entry.number === 1) {
        expect(entry.didWin).toBe(true);
      } else {
        expect(entry.didWin).toBe(false);
      }
    });
  });

  it("Checks that getHorseName() returns the name of the specified horse number", function() {
    var res = horsesService.getHorseName(2);
    expect(res).toEqual('Fort Utopia');
  })
});
