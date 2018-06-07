var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

// configuring app
mongoose.connect("mongodb://localhost/blogApp");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.set("view engine", "ejs");

// mongoose conf
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {
        type: Date,
        default: Date.now
    }
});

var Blog = mongoose.model("Blog", blogSchema);

//  RESTful route
app.get("/", function(req, res) {
    res.redirect("/blogs");
});

// Index route
app.get("/blogs", function (req, res) {
    Blog.find({}, function (err, blogs) {
        if (err) {
            console.log("Something is WRONG : \n", err);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

// NEW route
app.get("/blogs/new", function(req, res){
    res.render("new");
});

// CREATE route
app.post("/blogs", function(req, res) {
    Blog.create(req.body.blog, function(err, createdData) {
        if(err) {
            console.log("Error found : \n", err);
        } else {
            res.redirect("/blogs");
        }
    });
});

// listen
app.listen(3000, function () {
    console.log("Server has started !");
});