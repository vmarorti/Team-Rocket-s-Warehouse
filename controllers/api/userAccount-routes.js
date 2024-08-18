const router = require('express').Router();
const {User} = require('../../models');

//import models
router.get('/', async (req, res) => {
    try{
        const allUsers = await User.findAll();
        return res.json(allUsers);
    } catch (err) {
        res.json(err)
    }
})

//create a user and set logged in to true
router.post('/', async (req,res) => {
    try{
        console.log(req.body);
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        console.log(newUser);
        req.session.save( () => {
            req.session.loggedIn = true;
            req.session.name = newUser.dataValues.name;
            req.session.user_id = newUser.dataValues.id;
            req.session.email = newUser.dataValues.email;
            res.status(200).json(newUser, {"message": "Welcome New User"});
            // console.log(req.session.loggedIn);
            // console.log(req.session.name);
            // console.log(req.session.user_id);
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
        // if(!user){
        //     res.status(400).json({'message': 'username or password invalid'});
        //     return;
        // }
        if(!user.checkPassword(req.body.password)){
            res.status(400).json({'message': 'username or password invalid'});
            return;
        }
        req.session.save( () => {
            req.session.loggedIn = true;
            req.session.name = user.dataValues.name;
            req.session.user_id = user.dataValues.id;
            req.session.email = user.dataValues.email;
            // console.log(req.session.loggedIn);
            // console.log(req.session.name);
            // console.log(req.session.user_id);
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