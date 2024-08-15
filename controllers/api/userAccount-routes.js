const router = require('express').Router();
const {User} = require('../../models');

//import models

//create a user and set logged in to true
router.post('/', async (req,res) => {
    try{
        console.log(req.body);
        const response = await User.create(req.body);
        console.log(response);
        req.session.save( () => {
            req.session.loggedIn = true;
            req.session.userName = response.dataValues.username;
            req.session.userId = response.dataValues.id;
            res.status(200).json({message: 'Welcome back!'});
        });
    }catch(err){
        res.status(500).json(err);
    }
});


//validate when user tries to log in set log in to true
router.post('/login', async (req,res) => {
    try{
        const user = await User.findOne({
            where:{
                email: req.body.email
            }
        });
        if(!user){
            res.status(400).json({'message': 'username or password invalid'});
            return;
        }
        if(!user.checkPassword(req.body.password)){
            res.status(400).json({'message': 'username or password invalid'});
            return;
        }
        req.session.save( () => {
            req.session.loggedIn = true;
            req.session.userName = user.dataValues.username;
            req.session.userId = user.dataValues.id;
            res.status(200).json({message: 'Welcome back!'});
        });
    }catch(err){
        res.status(500).json(err);
    }
});
 
//we users log out
router.post('/logout', (req,res) => {
    if(req.session.loggedIn){
        req.session.destroy(()=> res.status(204).end());
    }else{
        res.status(404).end();
    }
});

module.exports = router;