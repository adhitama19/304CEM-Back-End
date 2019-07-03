// Introduce the module
var express = require("express");
var app = express();
var bodyPars = require("body-parser");
var mongoose = require("mongoose");

// Set up the location to create Mongo DB
mongoose.connect("mongodb://localhost/parafraaa_Music");

// Application Configuration
app.use(express.static("public"));
app.use(bodyPars.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Create the DB type
var itemTosell = new mongoose.Schema({
    itemTitle: String,
    itemImage: String,
    itemDesc: String,
    itemCreated: {type: Date, default: Date.now}
});

var musicItem = mongoose.model("musicItem", itemTosell);

// Index routes
app.get("/", function(req, res){
    res.render("landing");
});


app.get("/items", function(req, res){
    musicItem.find({}, function(err,items){
        if(err){
            console.log("The page your trying to access is unknown");
        
        
        } else {
            res.render("index", {items: items});
        }
    });
});




 //================== create routes ================================
 
 
app.post("/items", function(req, res){
    musicItem.create(req.body.item, function(err, newItem){
        if (err){
            res.render("new");
        } else {
            res.redirect("/items");
        }
    });
}); 
 

app.get("/items/new", function(req,res){
    
    res.render("new")
});

app.get("/items/:id" , function(req, res){
    musicItem.findById(req.params.id, function(err, itemDetails){
        if (err){
            res.redirect("/items")
        } else {
            res.render("show", {items: itemDetails})
        }
    });
});





// Set the connection
app.listen(process.env.PORT, process.env.IP, function(){
    console.log ("Parafraaa Music App is running on port: " + process.env.IP);
})

