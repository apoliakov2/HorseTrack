describe('Test "horsesService" service', function() {

  var horsesService;

  beforeEach(function() {
    angular.mock.module('horsetrack');
    inject(function($injector) {
      horsesService = $injector.get('horsesService');
    });
  });

  it('Checks that getHorsesList returns array with length = 7', function() {
      var res = horsesService.getHorsesList();
      expect(res.length).toEqual(8);
  });

  it('Checks that setWinningHorse() call set the specified horse number to win', function() {
    var number = 5,
        horsesList = [];
    horsesService.setWinningHorse(number);
    horsesList = horsesService.getHorsesList();
    horsesList.forEach(function(entry) {
      if (entry.charAt(0) == number) {
        expect(entry.indexOf('Yes')).not.toBe(-1);
      }
    });
  })

  it('Checks that after reset() call the first horse set to win', function() {
    var horsesList = [];
    horsesService.setWinningHorse(6);
    horsesService.reset();
    horsesList = horsesService.getHorsesList();
    horsesList.forEach(function(entry, index) {
      if (entry.charAt(0) === '1') {
        expect(entry.indexOf('Yes')).not.toBe(-1);
      } else {
        expect(entry.indexOf('Yes')).toBe(-1);
      }
    });
  });

  it('Checks that getHorseName() returns the name of the specified horse number', function() {
    var res = horsesService.getHorseName(2);
    expect(res).toEqual('Fort Utopia');
  })
});
