const router = require('express').Router();
//import models

//create a post
router.post('', async (req,res) => {
    //create row in post table useing some of the req body

    //check if its a trade or forsale using something like req.body.table
        //if trade add row fortrade  (USE VALUE req.session.userId TO SET SELLER ID)
            //make sure to make row in trade
        //if for sale add row to forsale
    
        //response
});


//delete post
router.delete('', async (req,res) => {
    //check if for sale or trade
        /*join forsale and posts where posts.id = req.body.id
                                        or
        join for trade,trad and posts where posts.id = req.body.id
        */
        //once found destroy post and correspoing rows on other tables
        
});



 

module.exports = router;