# TouchFhem

This JavaScript webapp allows to control a [FHEM](http://fhem.de/fhem.html) instance via a simple configurable touch interface. It is even possible to display it on a very small 320x240 pixel display, e.g. on a raspberry pi. In my case I tested it only with the MAX! heating controllers, but it should work with more devices controlled by FHEM.

## Requirements

Installed latest node.js and npm and running fhem.

## Build & deploy

Run `grunt` for building and `grunt serve` for preview. After `grunt` you can copy the content of the dist folder to your own web server.

## Configuration

In app/config.json lies an example configuration file. It starts with the configuration of the URL to the fhem web interface and is followed by the configuration of the different configuration sets. E.g.:

```
{
  "url": "http://127.0.0.1:8083/fhem?room=MAX&cmd=jsonlist2&XHR=1",
  "groups":
  [
    {
      "groupname": "Room x",
      "buttons": [
        {
          "name": "19°C",
          "cmd": "set",
          "arg": "desiredTemperature",
          "room": "MAX",
          "val": "19.0",
          "devices": [
          {"deviceid": "dev1"},
          {"deviceid": "dev2"}
          ]
        },{
          "name": "off",
          "cmd": "set",
          "arg": "desiredTemperature",
          "room": "MAX",
          "val": "off",
          "devices": [
          {"deviceid": "dev1"},
          {"deviceid": "dev2"}          ]
        }
      ]
    },
    {
      ...
    }
  ]
}
```

In this example you have a group with two buttons, each button controlls two devices. You can set the desiredTemperature to 19 degrees and off. As `arg` it is allowed to set anything the fhem web interface would accept, too.
