var chalk = require('chalk');
var fs = require('fs');
var clui = require('clui');
var Album = require('./../server/api/album/albumModel');

module.exports = function (artists, tracks, cb){
  console.log(tracks.length);
  var albums = [];
  console.log('---------------------------');
  console.log('start albums');
  console.log('---------------------------');

  var json;
  //first remove all
  Album.remove({}, function(){
    fs.readFile('./export/album.json', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      json  = JSON.parse(data);
      json = convertJson(json);
      toDataBase(json);
    });
  });



  var toDataBase = function(json){
    if(!json){
      console.log(chalk.red('No data found'));
      process.exit(1);
    }


    var i=0;
    function save(){
      if(i === (json.length)){
        return cb(albums);
      }

      var album = json[i];
      var newAlbum = new Album(album);
      newAlbum.save(function(err, a){
        if(err){
          return console.log(chalk.red('✖ ')+err);
        }
        albums[a.nid]=a;
        i++;
        console.log(chalk.green('✔ ')+a.title);
        save();
      });
    }

    save();

  }


  //convert the default output of the database
  var convertJson = function (json){
    return json.map(function(album){

      //redo the alias
      if(album.genre){
        var genre = album.genre.split(', ');
        album.genre = genre;
      }

      //get the artist
      if(album.artistId){
        var artist = artists[album.artistId];
        if(artist){
          album.artist = artist.id;
        }
      }

      if(tracks[album.nid]){
        album.tracks = tracks[album.nid];
      }

      return album;
    });
  }

};
