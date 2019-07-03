// Everything inside this page will give all routes
// That is not part of comments, news, and items


var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");




// =====================================
//   This will start the landing page ||
// =====================================

router.get("/", function(req, res){
    res.render("useritems/landing");
});



// =========================
// Register and Login Routes
// =========================

// This will get the register form
router.get("/register", function(req, res){
    res.render("register");
});

// This will create post the input in the register form
// To the DB

router.post("/register", function(req, res){
    req.body.username
    req.body.pass
    
    // Set userReg to User (DB) with its username
    var userReg = new User({username: req.body.username});
    
    // Register the user to the DB make the password as a long hash
    User.register(userReg, req.body.password, function(err, user){
        if (err){
            console.log(err)
            return res.render("register");
        } 
        // Using the local strategy for authentication
        passport.authenticate("local")(req, res, function(){
            res.redirect("/items");
        });
    });
});


// The specified routes for Login

router.get("/login", function(req, res){
    res.render("login")
});

router.post("/login",passport.authenticate("local", {
    successRedirect: "/items",
    failureRedirect: "/login"
}), function(req, res){
    
});

// This route will sign out the user
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/items")
});



// Check if the user is log in
function userLogIn(req, res, next)
{
    // Check if user is logged in and send to the next page if yes
    if(req.isAuthenticated()){
        return next()
    } 
    
    
    //Redirect login page if fails
    else {
        res.redirect("/login")
    }
}


module.exports = router;