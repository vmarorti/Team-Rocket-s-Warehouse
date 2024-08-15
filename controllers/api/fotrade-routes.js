

//set trade to true or false for when user accepts or denies offer (will be null initally)
router.put('', async (req,res) => {
        /*join for trade,trad and posts where posts.id = req.body.id
                                        or
        make sure card partial had data-fortradeid and use that value to find row
        */
        //update row to true or false
        
});

//set pokemon to offer for a trade which also creates a row in buyer and updates buyer in fortrade as well
router.put('', async (req,res) => {
        /*join for trade,trad and posts where posts.id = req.body.id
                                        or
        make sure card partial had data-fortradeid and use that value to find row
        */
        //create row in buyer using req.session.userId
        //set pokemon name
        //set byer in for trade to created row id
        
});

//put card back on the market when user denies current offer and request to post again
router.put('', async (req,res) => {
    //check if for sale or trade
        /*join for trade,trad and posts where posts.id = req.body.id
                                        or
        make sure card partial had data-fortradeid and use that value to find row
        */
        //set pokemon to null
        //set buyer to null
        //set trade to null
        
});