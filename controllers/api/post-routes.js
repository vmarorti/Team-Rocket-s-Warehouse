const router = require('express').Router();
const {User, ForTrade, ForSale, Posts, Collector} = require('../../models');
//import models

//create a post
router.post('/', async (req,res) => {
    try{
        const post = await Posts.create(req.body);
        if(req.body.table == 'Sale'){
            const sale = await ForSale.create(
                {
                    seller_id: req.session.user_id,
                    item_id: post.dataValues.id
                }
            )
            res.status(200).json(sale);
        }else{
            const trade = await ForTrade.create(
                {
                    seller_id: req.session.user_id,
                    card_id: post.dataValues.id
                }
            )
            res.status(200).json(trade);
        }
    }catch(err){
        res.status(400).json(err);
    }
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