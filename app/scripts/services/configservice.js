'use strict';

/**
 * @ngdoc service
 * @name maxRemoteControlApp.configService
 * @description
 * # configService
 * Service in the maxRemoteControlApp.
 */
angular.module('touchFhemApp')
  .service('configService', function () {
    var this_ = this;
    this.setParent = function(o){
      var n, m, d;
      if(o.groups != undefined){
        for(n in o.groups){
          o.groups[n].parent = o;
          if (o.groups[n].buttons != undefined) {
            for(m in o.groups[n].buttons) {
              o.groups[n].buttons[m].parent = o.groups[n];
              if (o.groups[n].buttons[m].devices != undefined) {
                for (d in o.groups[n].buttons[m].devices) {
                  o.groups[n].buttons[m].devices[d].parent = o.groups[n].buttons[m];
                }
              }
            }
          }
        }
      }
    }

    $.ajax({
      dataType: "json",
      url: 'config.json',
      async: false,
      success: function(data) {
        this_.configuration = data;
        this_.setParent(this_.configuration);
        this_.buttons = this_.configuration.buttons;
        this_.groups = this_.configuration.groups;
        this_.url = this_.configuration.url;
      }
    });

    //this.setParent(this.configuration);

    this.getDevices = function(groupid, buttonid) {
      var button = this.groups[groupid].buttons[buttonid];
      var devices = [];
      var i, key;
      for (i in button.devices) {
        for (key in button.devices[i]) {
          var device = button.devices[i];
          if (button.devices[i][0] === '$') {
            continue;
          }
          for (key in device.parent) {
            if (device[key] === undefined && key !== 'parent') {
              device[key] = device.parent[key];
            }
          }
          if (device.parent.parent !== undefined) {
            for (key in device.parent.parent) {
              if (device[key] === undefined && key !== 'parent') {
                device[key] = device.parent.parent[key];
              }
            }
          }
        }

        devices[devices.length] = device;

      };
      return devices;
    }

  });
