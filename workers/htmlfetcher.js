// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var archive = require('../helpers/archive-helpers');
var helper= require('../web/http-helpers.js');
var fs = require('fs');
var _ = require('underscore');

archive.readListOfUrls().on('data',function(data){
  var content = ""+data;
  content = content.split('\n');
  _.each(content, function(url){
    if(!archive.isURLArchived(helper.getPath(url))){
      //console.log(url + ": IS NOT");
      var path = "../web/archives/sites" + url;
      archive.downloadUrls(path, url);
    }
  });
});


//1. cron starting the process
//2. check list
//3. verify item on list is no archived
//if the dir exists
//create dir then fetch
//4. if not archived then download the file



