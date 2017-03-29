var chalk = require('chalk');
var fs = require('fs');
var clui = require('clui');
var Album = require('./../server/api/album/albumModel');

module.exports = function (cb){
  var tracks = [];
  console.log('---------------------------');
  console.log('start tracks');
  console.log('---------------------------');

  var json;
    fs.readFile('./export/track.json', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      json  = JSON.parse(data);
      json = convertJson(json);
      toDataBase(json);

      cb(tracks);
    });




  var toDataBase = function(json){
    if(!json){
      console.log(chalk.red('No data found'));
      process.exit(1);
    }


    json.map(function(t){
      var albumId = t.albumId;
      if(!tracks[albumId]){
        tracks[albumId] = [];
      }
      delete t.albumId;
      tracks[albumId].push(t);
    });


  }


  //convert the default output of the database
  var convertJson = function (json){
    return json.map(function(track){




      return track;
    });
  }

};
