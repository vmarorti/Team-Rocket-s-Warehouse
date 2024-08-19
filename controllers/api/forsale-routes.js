const router = require('express').Router();
const {ForSale, Collector} = require('../../models');

//create buyer in buyer table and set buyer in forsale
router.put('/buy', async (req,res) => {
    //check if byer exits in collector table if not create
    try{
        let collector = await Collector.findOne({where:{buyer_id: req.session.user_id}});
        if(!collector){
            collector = await Collector.create({buyer_id: req.session.user_id})
        }
        const addBuyer = await ForSale.update({buyer: collector.dataValues.id},
            {where: {id: req.body.saleid}});                                     
        res.status(200).json(addBuyer);
    }catch(err){
        res.status(500).json(err);
    }
        
});

module.exports = router;