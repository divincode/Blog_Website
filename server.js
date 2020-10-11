//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Click compose to compose anything you like...";
const aboutContent = "This a website created by me ,its a fun project its on the line of reddit without any authentication.. cna grow further...";
const contactContent = "Vinay Devadiga - 9821540400";
const posts=[];
class entry {
  constructor(Title, Para) {
    this.Title = Title;
    this.Para = Para;
  }
}

function finder(titles,posts)
{
    var i;
    for(i=0;i<posts.length;i++)
    {
      if(titles===posts[i].Title)
      {
        return posts[i];
        break;
      }
    }
}
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res)
{
  res.render(__dirname+"/views/home",{home_content:homeStartingContent,posts:posts});
});

app.get("/contact",function(req,res)
{
  res.render(__dirname+"/views/contact",{contact_content:contactContent});
});

app.get("/about",function(req,res)
{
  res.render(__dirname+"/views/about",{about_content:aboutContent});
});

app.get("/compose",function(req,res)
{
  res.render(__dirname+"/views/compose",{});
});

app.post("/compose",function(req,res)
{

  let entry1=new entry(req.body.postTitle,req.body.postPara);

  posts.push(entry1);
  res.redirect("/");

});

app.get("/posts/:title",function(req,res)
{
  var titles=req.params.title;
  var entrypost=finder(titles,posts)
  res.render(__dirname+"/views/post",{entrypost:entrypost});
})


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
