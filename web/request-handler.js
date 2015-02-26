var path = require('path');
var urlLib = require('url');
var archive = require('../helpers/archive-helpers');
var helper= require('./http-helpers.js');
var fs = require('fs');
// require more modules/folders here!

var sendResponse = function(res, data, statusCode){
  statusCode = statusCode || 200;
  res.writeHead(statusCode, helper.headers);
  res.end(data);
};

exports.handleRequest = function (req, res) {

  if(req.method === 'GET'){
    var url = urlLib.parse(req.url).pathname;
    var query = urlLib.parse(req.url, true).query;
    //console.log(query);
    if(url === '/'){
      sendResponse(res, 'What Web Site Would You Like ? <br><input type="text" name="fname"><br><input type="submit" value="Submit"></form>');
      res.end(url);
    }else if(query["request"] === 'true'){
      //check the sites.txt file and display if it is found
      //if it is not
      //write to the txt file and redirect to loading.html
      console.log(query);
      res.end();
    }
    else{
      console.log("in the else statement");
      archive.readListOfUrls().on('data',function(data){
        if(!archive.isUrlInList(data, url)){
          archive.addUrlToList(url);
        }

          //redirect them to the loading.html
          res.end();
      });

      // sendResponse(res, 'What Web Site Would You Like ? <br><input type="text" name="fname"><br><input type="submit" value="Submit"></form>');
      //check the sites.txt file and display if it is found
      //if results is undefined show 404
      // if(/*does sites.txt have the file*/){
      //   //respond with the file
      // }else{
      //   //respond with 404 status
      // }
      //res.end();
    }

  }
};
    // res.end(archive.paths.list);
