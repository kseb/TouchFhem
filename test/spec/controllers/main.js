'use strict';

describe('Controller: MainCtrl', function () {

  beforeEach(module('touchFhemApp'));

  var MainCtrl, scope;

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

   it('test', function() {
     // TODO: Tests!
   });

});
