var express = require("express");
var router = express.Router();
var Merch = require("../models/items");
var Comm = require("../models/comm");


//Get the main page



router.get("/", function(req, res){
    Merch.find({}, function(err,merch){
        if(err){
            console.log("The page your trying to access is unknown");
        
        
        } 
            res.status(200).render("useritems/index", {merch:merch, userlogin: req.user});
            // res.render("index", {items: items});
        
    });
});





// This will be the routes for adding new item to the DB
router.post("/", isLoggedIn ,function(req, res){
    
    // Create the variable for each data
    var name = req.body.itemTitle;
    var image = req.body.itemImage;
    var desc = req.body.itemDesc;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    
    // Set all data into newItem variable
    var newItem = {itemTitle: name, itemImage: image, itemDesc: desc, userCreate: author}
    
    // Merch. create data ad store inside merch
    Merch.create(newItem, function(err, newItem){
        if (err){
            res.render("useritems/new");
        } 
        
        
            console.log(newItem);
            res.redirect("/items");
        
    });
}); 
 

// The routes to get the sign in page
router.get("/new",isLoggedIn, function(req,res){
    
    res.render("useritems/new")
});


// Show the specific item to the user
router.get("/:id" , function(req, res){
    
    //Find teh item by ID and insert teh comment
    Merch.findById(req.params.id).populate("itemComm").exec(function(err, itemDetails){
        if (err){
            res.redirect("/items")
        } 
        
        
            console.log(itemDetails);
            res.render("useritems/show", {merch: itemDetails})
        
    });
});






// Will get the update form for editing the page
router.get("/:id/edit", auth,  function(req, res){
    
    //Using the specific ID given, edit the details specified by the user
    Merch.findById(req.params.id, function(err, foundMerch){
        if (err){
            
        }
        
        res.render("useritems/edit", {merch: foundMerch})
    
    });
});



// Send the PUT method back to the items with specific ID
router.put("/:id", auth, function(req, res){
    
    Merch.findByIdAndUpdate(req.params.id, req.body.merch, function(err, updateMerch){
        if(err){
            res.redirect("/items");
        } 
        
            res.redirect("/items/" + req.params.id);
        
    });
})





// Delete the button and check if it is the user who post the item

router.delete("/:id", auth, function(req, res){
    Merch.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.send(err);
        } else {
            res.redirect("/items");
        }
    });
});

// Middleware
function isLoggedIn(req, res, next)
{
    if(req.isAuthenticated()){
        return next()
    } else {
        res.redirect("/login")
    }
}


//Funtion for authentication
function auth(req, res, next)
{
     if (req.isAuthenticated()){
        
        Merch.findById(req.params.id, function(err, foundMerch){
        if (err){
            res.redirect("back")
        } else {
            
            if(foundMerch.userCreate.id.equals(req.user._id)){
                next();
            } else {
                res.redirect("back");
            }
            
            
        }
    })
} else {
    res.redirect("back");
}
}


module.exports = router;