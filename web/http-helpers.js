var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};
exports.sendResponse = function(res, data, statusCode){
  statusCode = statusCode || 200;
  res.writeHead(statusCode, exports.headers);
  res.end(data);
};
exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  fs.readFile(asset,function(err, contents){
    exports.sendResponse(res, contents)
    //res.write(contents);
    res.end();
  });
};

exports.getPath = function(file){
  if(file === '/'){
    file = file;
  } else if(file === "/public/index.html" || file === "/public/styles.css" || file === "/public/loading.html"){
    file = './../web'+ file; //'../package.json'
  }else{
    file = './../web/archives/sites'+file;
  }
  return file;
}

// As you progress, keep thinking about what helper functions you can put here!
