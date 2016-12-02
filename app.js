/**
 * Created by liuxsen on 2016/11/30.
 */

var express = require('express');
var routers = require('./router/routers');
var authorConfig = require('./author/config');
var app = express();

app.set('view engine','ejs');
app.set(express.static('public'));
app.set(express.static('avatar'));

var prefix = 'https://github.com/login/oauth/authorize?';
app.get('/',function(req,res,next){
    res.render('showIndex');
});
app.get('/login',function(req,res,next){
    res.redirect(prefix+'client_id='+authorConfig.client_id+'&state='+authorConfig.state+'&redirect_uri='+authorConfig.redirect_uri)
});
//app.post('/login',function(req,res,next){
//    console.log('post','github')
//});
app.get('/login/back',routers.backurl);

app.get('/formupload',function(req,res,next){
    res.render('formupload');
});

app.post('/formupload',routers.formupload);

app.listen(3000,'127.0.0.1');
