describe("Test 'horseTrackErrors' factory", function() {

  var horseTrackErrors;

  beforeEach(function() {
    angular.mock.module('horsetrack');
    inject(function($injector) {
      horseTrackErrors = $injector.get('horseTrackErrors');
    });
  });

  it("Should return predefined error message when calling with code 100", function() {
    var res = horseTrackErrors.getError(100, 'asd');
    expect(res).toEqual("Invalid Command: asd");
  })

});
