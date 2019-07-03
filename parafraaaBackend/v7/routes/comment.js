var express = require("express");
var router = express.Router({mergeParams: true});
var Merch = require("../models/items");
var Comm = require("../models/comm");


// Get comment for the specific items

router.get("/new", userLogIn, function(req, res){
    
  Merch.findById(req.params.id, function(err, merch){
      
      if (err) {
          console.log(err)
      } else {
          res.render("usercomment/new", {merch: merch});
      };
      
  });
  
});


// Post the comment to the specific item
router.post("/", userLogIn, function(req, res){
    
    //Find merchandise based on its ID
    Merch.findById(req.params.id, function(err, merch){
        if (err){
            console.log(err);
            res.redirect("/items")
        } else {
            
            // This will create the ID
            Comm.create(req.body.comment, function(err, comment){
                if (err){
                    console.log(err)
                } else {
                    
                    //Add the user ID
                    comment.author.id;
                    comment.author.username = req.user.username;
                    comment.save()
                    
                    //Save the comment
                    merch.itemComm.push(comment)
                    merch.save()
                    res.redirect('/items/' + merch._id);
                    
                };
            });
            
        };
    });
});

//==== This is the Middleware ======

function userLogIn(req, res, next)
{
    if(req.isAuthenticated()){
        return next()
    } else {
        res.redirect("/login")
    }
}

module.exports = router;