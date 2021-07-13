const express = require ('express');
 const app= express();
 require('dotenv').config();
const Twitter = require('./api/helpers/twitter');
const twitter = new Twitter ();

// app.listen((req,res,next)=>{
//     header:
// })
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
app.get ('/tweets',function(req,res){
    
const query = req.query.q;
const count = req.query.count;
const maxId=req.query.max_id;
const URL = "https://api.twitter.com/1.1/search/tweets.json";
twitter.get(query,count,maxId).then ((response)=>{
res.status(200).send(response.data);
}).catch((error)=>{
res.status(400).send("error");
})
})
app.listen(3000);