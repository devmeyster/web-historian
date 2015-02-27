var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require("http");
var https = require("https");

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

exports.readListOfUrls = function(path){
  path = path || './../web/archives/sites.txt';
  //var content;
  // fs.readFile("./../web/archives/sites.txt", function(err, data){
  //   if (err){
  //     console.log(err);
  //   }

  //   content = ""+data;
  //   content = content.split('\n');
  //   console.log(content);

    // return content;
    return fs.createReadStream(path);
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

exports.isURLArchived = function(file){
  return fs.existsSync(file);
};

exports.downloadUrls = function(path, url){

  console.log(path);
  fs.mkdirSync(path);
  // var file = fs.openSync(path+"/index.html", "w");
  // fs.closeSync(file);

  var file = fs.createWriteStream(path+"/index.html");
  var urlHttps = 'https://'+url.slice(1);
  var urlHttp = 'http://'+url.slice(1);

  console.log(url);
  // make http request
  http.get(urlHttp, function(res) {
      // pipe response into file
      res.pipe(file);
      // once done
      file.on('finish', function(err) {
          // close write stream
        console.log(err)
        file.close(function(err) {
            console.log(err)
          });
      });
    });
};
