//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "Hi! i am subham welcome to my blog.Football Blog aims to provide you with cutting edge analysis and opinion across the top European leagues, while also separating the fake news from the real stories. Here is analysis of Fifa 19 Game done by My Friend Saket";
const aboutContent = "Football Blog aims to provide you with cutting edge analysis and opinion across the top European leagues, while also separating the fake news from the real stories.This isn’t your average football blog. Rather than regurgitate rumours like the vast majority of sites, we cover a variety of topics – tactics, player profiles, predictions, match previews, in addition to deconstructing topical issues.Our aim is to enlighten our audience with analysis on players and clubs across Europe, rather than giving you the stories you’ve already read.The media industry has become over-saturated in recent years, so we at Football Blog are looking to bring intelligent thought to the table and long-reads on interesting subjects.";
const contactContent = "To get in touch Email me on subham.90971@gmail.com";
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-subham:Leomessi10@cluster0.v4fzd.mongodb.net/blogDB", {useNewUrlParser: true,useUnifiedTopology: true });

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}







app.listen(port, function() {
  console.log("Server started ");
});
