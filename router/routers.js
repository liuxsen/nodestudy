/**
 * Created by liuxsen on 2016/12/1.
 */
var formidable = require('formidable');
var util = require('util');
var path = require('path');
var fs = require('fs');
var request = require('request');
var authorConfig = require('../author/config');
var qs = require('querystring');

exports.formupload = function(req,res,next){
    //console.log(req);
    var form = new formidable.IncomingForm();
    var uploadDir = path.normalize(__dirname+'/'+"../avatar");
    form.uploadDir = uploadDir;
    console.log(uploadDir);
    form.parse(req, function(err, fields, files) {
        //res.writeHead(200, {'content-type': 'text/plain'});
        //res.write('received upload:\n\n');
        //(function(){
        //
        //})(files);
        if(!files.userfile){
            res.send('-1');
            return;
        }
        //var oldname = files.userfile.path;
        //console.log('files.userfile.name',files.userfile.name);
        //var newname = files.userfile.name === 'blob' ? 'xml' : files.userfile.name;
        //    newname = oldname + newname;
        //console.log('oldname',oldname);
        //console.log('newname',newname);
        //
        //fs.rename(oldname,newname,function(err){
        //    if(err) console.log(err);
        //})
        for(item in files){
            (function(){
                var oldname = files[item].path;
                var newname = files[item].name === 'blob' ? oldname+'.xml' : oldname+"."+files[item].name.split('.')[1];
                fs.rename(oldname,newname,function(err){
                    if(err) console.log(err);
                    console.log('修改成功');
                })
            })(item);
        }
        console.log(util.inspect({fields: fields, files: files}));
        res.send('2')
    });
};

exports.backurl = function(req,res,next){
    var oldRes = res;
        var code = req.query.code;
        var url = 'https://github.com/login/oauth/access_token?client_id='+authorConfig.client_id+'&client_secret='+authorConfig.Client_Secret+'&code='+req.query.code+'&redirect_uri='+authorConfig.redirect_uri;
       request(url,function(err,res,body){
           var backjson = qs.parse(body);
           console.log(backjson);
           request(
               {
                   url:'https://api.github.com/user?access_token='+backjson.access_token,
                   headers: {
                       'User-Agent': 'request'
                   }
               },function(err,res,body){
                   console.log(JSON.parse(body));
                   //{"login":"liuxsen","id":12598696,"avatar_url":"https://avatars.githubusercontent.com/u/12598696?v=3","gravatar_id":"","url":"https://api.github.com/users/liuxsen","html_url":"https://github.com/liuxsen","followers_url":"https://api.github.com/users/liuxsen/followers","following_url":"https://api.github.com/users/liuxsen/following{/other_user}","gists_url":"https://api.github.com/users/liuxsen/gists{/gist_id}","starred_url":"https://api.github.com/users/liuxsen/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/liuxsen/subscriptions","organizations_url":"https://api.github.com/users/liuxsen/orgs","repos_url":"https://api.github.com/users/liuxsen/repos","events_url":"https://api.github.com/users/liuxsen/events{/privacy}","received_events_url":"https://api.github.com/users/liuxsen/received_events","type":"User","site_admin":false,"name":"刘建辉","company":null,"blog":null,"location":"中国","email":"948771968@qq.com","hireable":null,"bio":null,"public_repos":69,"public_gists":6,"followers":4,"following":1,"created_at":"2015-05-25T16:19:26Z","updated_at":"2016-11-30T09:06:10Z"}
                   var jsonBody = JSON.parse(body);
                   oldRes.render('showuser',{
                       login:jsonBody.login,
                       avatar_url: jsonBody.avatar_url,
                       email: jsonBody.email
                   });
           });
       })
};
