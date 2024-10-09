const router = require('express').Router();
const {User, ForTrade, ForSale, Posts, Collector} = require('../../models');

//set trade to true or false for when user accepts or denies offer (will be null initally)
router.put('/status', async (req,res) => {
        try{    
                const acceptOrdeny = await ForTrade.update({trade: req.body.trade},
                                                        {where: {id: req.body.tradeid}});                                     
                res.status(200).json(acceptOrdeny);
        }catch(err){
                res.status(500).json(err);
        }
        
});

//set pokemon to offer for a trade which also creates a row in buyer and updates buyer in fortrade as well
router.put('/offer', async (req,res) => {
        console.log(req.body) 
        try{    
                let collector = await Collector.findOne({where:{buyer_id: req.session.user_id}});
                if(!collector){
                        collector = await Collector.create({buyer_id: req.session.user_id})
                }
                console.log(collector);
                console.log()
                /*const addBuyer = await ForTrade.update({trade_pokemon: req.body.pokemon, buyer: collector.dataValues.id},
                                                        {where: {item_id: req.body.postid}});  */
                const addBuyer = await ForTrade.update({trade_pokemon: req.body.pokemon, buyer: collector.dataValues.id},
                                                        {where: {card_id: req.body.postid}});                                      
                console.log(addBuyer)                                  
                res.status(200).json(req.body);
        }catch(err){
                res.status(500).json(err);
        }
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

module.exports = router;