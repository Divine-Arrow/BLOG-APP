var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blogApp");
app.set("view engine", ejs);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created:
});

time where resume 6:50


var Blog = new mongoose("Blog", blogSchema);