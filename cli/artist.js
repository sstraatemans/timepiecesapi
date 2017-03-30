var chalk = require('chalk');
var fs = require('fs');
var clui = require('clui');
var Artist = require('./../server/api/artist/artistModel');

module.exports = function (artistIds, cb){
  console.log('---------------------------');
  console.log('start artists');
  console.log('---------------------------');

  var json;
  //first remove all
  Artist.remove({}, function(){
    fs.readFile('./export/artist.json', 'utf8', function (err,data) {
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
      if(i === (json.length-1)){
        return cb(artistIds);
      }
      var newArtist = new Artist(json[i]);
      newArtist.save(function(err, a){
        if(err){
          return console.log(chalk.red('✖ ')+err);
        }
        artistIds[a.nid]=a;
        i++;
        console.log(chalk.green('✔ ')+a.title);
        save();
      });
    }

    save();

  }


  //convert the default output of the database
  var convertJson = function (json){
    return json.map(function(artist){
      var name = {
        firstName: artist.firstName,
        middleName: artist.middleName,
        lastName: artist.lastName
      };
      artist.name = name;
      delete artist.firstName;
      delete artist.middleName;
      delete artist.lastName;

      //redo the memberships
      if(artist.memberships){
        var memberships = artist.memberships.split('**');
        artist.memberships = memberships;
      }

      //redo the alias
      if(artist.alias){
        var alias = artist.alias.split(', ');
        artist.alias = alias;
      }

      //redo the alias
      if(artist.genre){
        var genre = artist.genre.split(', ');
        artist.genre = genre;
      }

      //redo the related artists.
      if(artist.related_artists){
        var related_artists = artist.related_artists.split(',');
        artist.related_artists = related_artists;
      }

      return artist;
    });
  }

};
