'use strict';

/**
 * @ngdoc function
 * @name maxRemoteControlApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the maxRemoteControlApp
 */
var main = angular.module('touchFhemApp');

main.controller('MainCtrl', function ($scope, configService) {

  $scope.configService = configService;
  $scope.groups = configService.groups;
  $scope.url = configService.url;

  $scope.sendCommand = function(groupkey, buttonkey, event) {
    var devices = configService.getDevices(groupkey,buttonkey);
    var data = {};
    var target = event.target;
    $(event.target).addClass('btn-warning').removeClass('btn-default');
    devices.forEach(function(device) {
      data['cmd.' + device.deviceid] = device.cmd;
      data['arg.' + device.deviceid] = device.arg;
      data['room.' + device.deviceid] = device.room;
      data['val.' + device.deviceid] = device.val;
      data['dev.' + device.deviceid] = device.deviceid;
      $.ajax({
        url: $scope.url,
        data: data,
        dataType: 'jsonp',
        type: 'POST',
        error: function(data) {
          if (data.status === 200) {
            $(target).removeClass('btn-warning').addClass('btn-success');
            setTimeout(function(){
              $(target).removeClass('btn-success').addClass('btn-default');
            },2000);
          }
        }
      });
    });
  };
});
