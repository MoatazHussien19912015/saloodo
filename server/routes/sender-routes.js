const router = require('express').Router();
const _ = require('lodash');
const middleware = require('./../middlewares/auth');
const Sender = require('./../models/sender-model');
const Parcel = require('./../models/parcel-model');

const joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        username: joi.string().alphanum().max(30).min(3).trim().required(),
        password: joi.string().min(6).max(20).required(),
        image: joi.string().allow('').uri()}); 

        const {error, value} = schema.validate({email: req.body.email, username: req.body.username, password: req.body.password, image: req.body.image});
    if (error) {
        return res.status(400).json({success: false, message: error.details[0].message});
    }
    try {
        const sender = await Sender.find({email: req.body.email});
        if (sender.length) {
            return res.status(404).json({success: false, message: 'email is already used'});
        }
            const pass = bcrypt.hashSync(req.body.password, 10);
            req.body.password = pass;
            req.body['image'] = req.body.image? req.body.image: 'https://cdn-icons-png.flaticon.com/512/53/53060.png';
            const new_sender = new Sender(req.body);
            
                const saved_sender = await new_sender.save();
                return res.status(200).json({success: true,  token: saved_sender.generate_jwt_token()});
            
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({success: false, message: 'server error'});
    }
});


router.post('/login', async (req, res) => {

    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).max(20).required(),
    });

        const {error, value} = schema.validate({ email: req.body.email, password: req.body.password});
    if (error) {
        return res.status(400).json({success: false, message: error.details[0].message});
    }
    try {
        const sender = await Sender.findOne({email: req.body.email});
        if(!sender) {
            return res.status(404).json({success: false, message: 'wrong email or password'});
        }
        const check_password = bcrypt.compareSync(req.body.password, sender.password);
        if(check_password) { 
            return res.status(200).json({success: true, token: sender.generate_jwt_token() });
        }
        else {
            return res.status(404).json({success: false, message: 'wrong email or password'});
        }
    }
    catch(err) { console.log(err);
        return res.status(500).json({success: false, message: 'server error'});
    }
});


router.get('/profile', middleware, async (req, res) => {
    try {
        const sender = await Sender.findById(req.user_id);
        if(!sender) {
            return res.status(404).json({success: false, message: 'wrong email or password'});
        }
       
            const parcels = await Parcel.find({sender: req.user_id});
                return res.status(200).json({success: true, sender: _.pick(sender, ['email', 'username', 'image']), 
                    token: sender.generate_jwt_token(), parcels });
            
    }
    catch(err) {
        return res.status(500).json({success: false, message: 'server error'});
    }
});








module.exports = router;