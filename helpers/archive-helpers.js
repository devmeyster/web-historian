 var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(){
  //var content;
  // fs.readFile("./../web/archives/sites.txt", function(err, data){
  //   if (err){
  //     console.log(err);
  //   }

  //   content = ""+data;
  //   content = content.split('\n');
  //   console.log(content);

    // return content;
    return fs.createReadStream('./../web/archives/sites.txt');
  //});

};

exports.isUrlInList = function(data,link){
  var content = ""+data;
  content = content.split('\n');
  console.log(content);
  return _.some(content,function(el){
    return el === link;
  });
};

exports.addUrlToList = function(link){
  fs.appendFile('./../web/archives/sites.txt', link+'\n', function(err){
    if(err) console.log(err);
    console.log(link+" has been appended to sites.txt");
  })
};

exports.isURLArchived = function(){
};

exports.downloadUrls = function(){
};
