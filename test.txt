var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");

// App configure
mongoose.connect("mongodb://localhost/blogApp");
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set(bodyParser.urlencoded({
    extended: true
}));

// Schema
var blogSchema = new mongoose.Schema({
    name: String,
    image: String,
    body: String,
    created: {
        type: Date,
        default: Date.now
    }
})

//  mongoose model
var Blog = mongoose.model("Blog", blogSchema);

//  RESTful routes

// 
app.get("/", function (req, res) {
    res.redirect("/blogs");
});
//  1.> index route
app.get("/blogs", function (req, res) {
    Blog.find({}, function (err, blogs) {
        if (err) {
            console.log("Error Found \n", err);
        } else {
            res.render("index", {
                blogs: blogs
            });
        }
    });
});

// listen
app.listen(3000, function () {
    console.log("Server has Started !");
});