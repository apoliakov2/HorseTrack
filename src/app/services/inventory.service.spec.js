describe("Test 'inventoryService' service", function() {

  var inventoryService;

  beforeEach(function () {
    angular.mock.module('horsetrack');
    inject(function ($injector) {
      inventoryService = $injector.get('inventoryService');
    });
  });

  it("Should restore quantity of al denominations to 10 after restock() has been called", function() {
    inventoryService.restock();
    inventoryService.cash.forEach(function(entry) {
      expect(entry.quant).toEqual(10);
    });
  });

  it("Should call getInventoryList() and checks that the length of the return value is 6", function() {
    var res = inventoryService.getInventoryList();
    expect(res.length).toEqual(6);
  });

  it("Checks that dispenseCash() returns an array of length 5 if there is enough cash to dispense", function() {
    var res = inventoryService.dispenseCash(54);
    expect(res.length).toEqual(5);
  });

});
