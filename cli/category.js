var chalk = require('chalk');
var fs = require('fs');
var clui = require('clui');
var Category = require('./../server/api/chartCategory/chartCategoryModel');

module.exports = function (cb){
  console.log('---------------------------');
  console.log('start categories');
  console.log('---------------------------');

  var json;
  var categories = [];
  //first remove all
  Category.remove({}, function(){
    fs.readFile('./export/category.json', 'utf8', function (err,data) {
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
        return cb(categories);
      }
      var newCategory = new Category(json[i]);
      newCategory.save(function(err, a){
        if(err){
          return console.log(chalk.red('✖ ')+err);
        }
        categories[a.nid]=a;
        i++;
        console.log(chalk.green('✔ ')+a.title);
        save();
      });
    }

    save();

  }


  //convert the default output of the database
  var convertJson = function (json){
    return json.map(function(category){


      //redo the countries
      if(category.countryCodes){
        var countries = category.countryCodes.split(',');
        category.countries = countries;
      }


      return category;
    });
  }

};
