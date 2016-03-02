describe("Test 'inventoryService' service", function() {

  var inventoryService;

  beforeEach(function () {
    angular.mock.module('horsetrack');
    inject(function ($injector) {
      inventoryService = $injector.get('inventoryService');
    });
  });

  it('Should return the list of all currencies', function() {
    var list = inventoryService.getInventoryList();
    list.forEach(function(entry, index) {
      if (index > 0) {
        expect(entry.indexOf('$')).not.toEqual(-1);
      } else { // Title
        expect(entry.indexOf('$')).toBe(-1);
      }
    });
  });

  it('Should restore quantity of al denominations to 10 after restock() has been called', function() {
    var list;
    inventoryService.restock();
    list = inventoryService.getInventoryList();
    list.forEach(function(entry, index) {
      if (index > 0) {
        expect(entry.indexOf(',10')).not.toEqual(-1);
      } else { // Title
        expect(entry.indexOf(',10')).toBe(-1);
      }
    });
  });

  it('Should call getInventoryList() and checks that the length of the return value is 6', function() {
    var res = inventoryService.getInventoryList();
    expect(res.length).toEqual(6);
  });

  it('Checks that dispenseCash() returns an array of length 5 if there is enough cash to dispense', function() {
    var res = inventoryService.dispenseCash(54);
    expect(res.length).toEqual(5);
  });

});
