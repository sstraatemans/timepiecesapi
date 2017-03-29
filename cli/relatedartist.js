var chalk = require('chalk');
var fs = require('fs');
var clui = require('clui');
var Artist = require('./../server/api/artist/artistModel');

module.exports = function (artists, cb){
  console.log('---------------------------');
  console.log('start related artists');
  console.log('---------------------------');
  
  var i=0;

    setRelated(artists);
    save();


    function setRelated(artists){
      artists.map(function(a) {
        var related = a.related_artists;
        var relatedArray = [];

        if(related){
            related.map(function(r){
              var relatedArtist = artists[r];
              a.relatedArtists.push(relatedArtist.id);
              relatedArtist.relatedArtists.push(a.id);
            });
        }
      });
    }


    function save(){
      if(i === (artists.length-1)){
        return cb(artists);
      }
      var newArtist = artists[i];
      if(newArtist){
        newArtist.save(function(err, a){
          if(err){
            return console.log(chalk.red('✖ ')+err);
          }
          console.log(chalk.green('✔ ')+a.title);
          i++;
          save();
        });
      }else{
        i++;
        save();
      }

    }






    //
    // //loop through all artists and add them to the artistsId array
    // artists.forEach(function(art) {
    //   var related = art.related_artists;
    //   if(related){
    //     var m = related.map(function(r){
    //       var linkedArtist = Artist.findOne({nid: r}).then(function(d){
    //         art.relatedArtists.push(d._id);
    //         art.save();
    //         d.relatedArtists.push(art._id);
    //         d.save();
    //       });
    //     });
    //   }
    // });

};
