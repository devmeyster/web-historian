var path = require('path');
var urlLib = require('url');
var archive = require('../helpers/archive-helpers');
var helper= require('./http-helpers.js');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var url = urlLib.parse(req.url).pathname;
  var query = urlLib.parse(req.url, true).query;
  var homePagePath = '/public/index.html';
  url = helper.getPath(url);

  console.log(url)
  console.log(archive.isURLArchived(url))
  if(req.method === 'GET'){
    if(url === '/'){
      res.statusCode = 302;
      res.setHeader("Location", homePagePath);
      res.end();

      //helper.sendResponse(res, 'What Web Site Would You Like ? <br><input type="text" name="fname"><br><input type="submit" value="Submit"></form>');
      //res.end(url);
    }else if(archive.isURLArchived(url)){
      // var link = helper.getPath(url);
      helper.serveAssets(res, url);

    } else {
      // redirect to the 404 page
      // console.log(archive.isURLArchived(url));
      helper.sendResponse(res, "404 Page Not Found", 404);
      res.end();
    }
  }else if (req.method === 'POST'){
        var reqURL = '';
        req.on('data', function (data) {
            // Extract Submit Value and finding Server side location
            reqURL += data + "";
            reqURL = '/' + reqURL.split('=')[1];
            //Check if File is there.
            console.log('reqURL = ' + reqURL);
            if(archive.isURLArchived(helper.getPath(reqURL))){

              //FIX THIS BECAUSE NOT ALL SITES RUN ON INDEX.HTML
              reqURL+='/index.html';
              res.statusCode = 302;
              res.setHeader("Location", reqURL);
              res.end();

            } else {
              archive.readListOfUrls().on('data',function(data){
                if(!archive.isUrlInList(data,reqURL)){
                  archive.addUrlToList(reqURL);
                }
              });
              //redirect to the loading page
              res.statusCode = 302;
              res.setHeader("Location", '/public/loading.html');
              res.end();

            }
        });
  }else{
    helper.sendResponse(res, "Bad Request", 400);
    res.end();
  }
};


/*
    else{
      if(query["request"] === 'true'){
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
*/
      // sendResponse(res, 'What Web Site Would You Like ? <br><input type="text" name="fname"><br><input type="submit" value="Submit"></form>');
      //check the sites.txt file and display if it is found
      //if results is undefined show 404
      // if(/*does sites.txt have the file*/){
      //   //respond with the file
      // }else{
      //   //respond with 404 status
      // }
      //res.end();
//     }

//   }
// };
    // res.end(archive.paths.list);
/*

----GET--------
if(pathname === /){
  take them to the home page
}else {
  if(site is archived){
    redirect to that page
  }else{
    redirect to the 404 page
  }
}
-----POST--------
if(site is archived){
  redirect to that page
}else{
  add url if not on the list
  redirect to the loading.html
}


 */
