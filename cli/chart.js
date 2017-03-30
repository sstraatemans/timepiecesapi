var chalk = require('chalk');
var fs = require('fs');
var clui = require('clui');
var Chart = require('./../server/api/chart/chartModel');
var Album = require('./../server/api/album/albumModel');

module.exports = function (categories, cb){
  console.log('---------------------------');
  console.log('start chart');
  console.log('---------------------------');
  var albums = [];
  var json;
  //first remove all
  Chart.remove({}, function(){
    fs.readFile('./export/chart.json', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }

      Album.find({}).then(function(a) {
        a.map(function(album){
          albums[album.nid] = album;
        })

        json  = JSON.parse(data);
        json = convertJson(json);
        toDataBase(json);
      });


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
        return cb(categories);
      }
      var newChart = new Chart(json[i]);
      newChart.save(function(err, a){
        if(err){
          return console.log(chalk.red('✖ ')+err);
        }
        i++;
        console.log(chalk.green('✔ ')+a.title);
        save();
      });
    }

    save();

  }


  //convert the default output of the database
  var convertJson = function (json){
    return json.map(function(chart){


      //get the category
      if(chart.categoryId){
        var category = categories[chart.categoryId];
        if(category){
          chart.category = category;
        }
      }


      //set all the albums
      var newAlbumArray = [];
      var delta = 0;
      if(chart.tracks){
        var albumIds = chart.tracks.split(',');
        albumIds.map(function(a){
          newAlbumArray.push(
            albums[a]
          );

          delta++;
        });
        chart.albums = newAlbumArray;
      }

      return chart;
    });
  }

};
