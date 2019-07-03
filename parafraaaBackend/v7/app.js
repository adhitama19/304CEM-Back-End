// Introduce the dependencies
var express = require("express");
var app = express();
var bodyPars = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var serveStatic = require('serve-static');
var Merch = require("./models/items");
var News = require("./models/news");
var dataDB = require("./data");
var Comm = require("./models/comm")

//=============For authentication==============
var passport = require("passport");
var localStrategy = require("passport-local");
var User = require("./models/user");


// ===============Routes========================
var itemsroutes = require("./routes/items");
var commentroutes = require("./routes/comment");
var authroutes = require("./routes/index");
var newsroutes = require("./routes/news");


// Set up the location to create Mongo DB
mongoose.connect("mongodb://localhost/final");

// Application Configuration
app.use(express.static(__dirname + "/public"));
app.use(bodyPars.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(serveStatic('views/'));


// Ask user to log in
app.use(function(req, res, next){
    
    res.locals.userlogin = req.user;
    next();
    
});


// Configure passport
app.use(require("express-session")({
    secret: "adhitama19",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// the routes for items
app.use("/items",itemsroutes);

// The routes for news
app.use("/news", newsroutes);

//The routes for the comment
app.use("/items/:id/comment", commentroutes); 

// The login routes
app.use(authroutes); 




// ========================== Set the connection ===============================

app.listen(process.env.PORT, process.env.IP, function(){
    console.log ("Parafraaa Music App is running on port: " + process.env.IP);
})

