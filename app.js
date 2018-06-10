var express = require("express"),
    app = express(),
    methodsOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

// configuring app
mongoose.connect("mongodb://localhost/blogApp");
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(express.static("public"));
app.use(methodsOverride("_method"))

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
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err) {
        if(err) {
            console.log("Error found : \n", err);
        } else {
            res.redirect("/blogs");
        }
    });
});

//  SHOW route
app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, blog) {
        if(err) {
            res.redirect("/blogs");
        }
        else {
            res.render("show", {blog: blog});
        }
    });
});

// EDIT route
app.get("/blogs/:id/edit", function(req,res) {
    Blog.findById(req.params.id, function(err, blog) {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: blog});
        }
    });
});

// UPDATE route
app.put("/blogs/:id", function(req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

// DELETE route
app.delete("/blogs/:id", function(req, res) {
    Blog.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect("/blogs");
        }
        else {
            res.redirect("/blogs");
        }
    });
});

// listen
app.listen(3000, function () {
    console.log("Server has started !");
});