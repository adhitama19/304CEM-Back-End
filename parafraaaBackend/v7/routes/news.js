var express = require("express");
var router = express.Router();
var Comm = require("../models/comm");
var News = require("../models/news");


//Get all data to the main page

router.get("/", function(req, res){
    
    
    News.find({}, function(err,news){
        if(err){
            console.log("The page your trying to access is unknown");
        
        
        } 
            res.status(200).render("usernews/newsIndex", {news:news, userlogin: req.user});
           
            
            // res.render("index", {items: items});
        
    });
});





router.post("/", islogIn, function(req, res){
    
    var title = req.body.newsTitle;
    var image = req.body.newsImage;
    var info = req.body.newsDesc;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    // req.body.merch
    var newNews = {
                    newsTitle: title, 
                    newsImage: image, 
                    newsDesc: info, 
                    userCreate: author
        
    }
    
    
    News.create(newNews, function(err, newNews){
        if (err){
            res.send("Sorry cannot add the item");
        } else {
            console.log(newNews);
            res.redirect("/news");
        }
    });
}); 
 


router.get("/addnews", islogIn , function(req,res){
    
    res.render("usernews/addnews");
    
});


//Show the item added to the DB
router.get("/:id" , function(req, res){
    

    
    News.findById(req.params.id, function(err, newsDetails){
        if (err){
            res.redirect("/items")
        } 
            console.log(newsDetails);
            
            res.render("usernews/shownews", {news: newsDetails})
        
    });
});

// Get update form
router.get("/:id/edit", function(req, res){
    
    
    News.findById(req.params.id, function(err, foundNews){
        if (err){
            
        }
        res.render("usernews/editnews", {news: foundNews})
    
    });
});



// routes to add the submitted data
router.put("/:id", function(req, res){
    

    News.findByIdAndUpdate(req.params.id, req.body.news, function(err, updateNews){
        if(err){
            res.redirect("/");
        } else {
            res.redirect("/news/" + req.params.id);
        }
    } )
})





// Delete the item

router.delete("/:id", auth, function(req, res){
    
    News.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.send(err);
        } else {
            res.redirect("/news");
        }
    });
});

// Middleware
function islogIn(req, res, next)

{
    if(req.isAuthenticated()){
        return next()
    } else {
        res.redirect("/login")
    }
}


function auth(req, res, next)
{

     if (req.isAuthenticated()){
        
        News.findById(req.params.id, function(err, foundNews){
        if (err){
            res.redirect("back")
        } else {
            
            if(foundNews.userCreate.id.equals(req.user._id)){
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