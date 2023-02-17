const router = require('express').Router();
const _ = require('lodash');
const middleware = require('./../middlewares/auth');
const Sender = require('./../models/sender-model');
const Parcel = require('./../models/parcel-model');
const Biker = require('./../models/biker-model');

const joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');


// by sender
router.post('/add-parcel', middleware, async (req, res) => {

    const schema = joi.object({
        name: joi.string().required(),
        description: joi.string().required(),
        image: joi.string().allow(''),
        pick_up_address: joi.string().required(),
        drop_off_address: joi.string().required(),

    });

    const { error, value } = schema.validate({
        name: req.body.name, description: req.body.description,
        image: req.body.image, pick_up_address: req.body.pick_up_address, drop_off_address: req.body.drop_off_address
    });
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }
    try {
        const sender = await Sender.findById(req.user_id);
        if (!sender) {
            return res.status(404).json({ success: false, message: 'wrong username or password' });
        }
        req.body.sender = req.user_id;
        req.body.status = 'ready';
        const new_parcel = new Parcel(req.body);

        const saved_parcel = await new_parcel.save();
        return res.status(200).json({ success: true, parcel: saved_parcel });

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: 'server error' });
    }
});



// by biker
router.patch('/pick-parcel/:parcel_id', middleware, async (req, res) => {
    const todayDate = new Date().toISOString().substring(0, 10);

    const schema = joi.object({
        pick_up_date: joi.date().iso().min(todayDate).required(),
        delivery_date: joi.date().min(joi.ref('pick_up_date')).required()

    });

    const { error, value } = schema.validate({ pick_up_date: req.body.pick_up_date, delivery_date: req.body.delivery_date });
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }
    try {
        const biker = await Biker.findById(req.user_id);
        if (!biker) {
            return res.status(404).json({ success: false, message: 'wrong username or password' });
        }
        const parcel = await Parcel.findById(req.params.parcel_id);
        if (!parcel) {
            return res.status(404).json({ success: false, message: 'no parcel with the following id' });
        }
        if (parcel.biker) {
            return res.status(400).json({ success: false, message: 'parcel already assigned to a biker, please try another one' });
        }
        parcel.biker = req.user_id;
        parcel.biker_name = biker.username;
        parcel.pick_up_date = req.body.pick_up_date;
        parcel.delivery_date = req.body.delivery_date;
        parcel.status = 'picked';

        const saved_parcel = await parcel.save();


        return res.status(200).json({ success: true, parcel: saved_parcel });

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: 'server error' });
    }
});

router.get('/deliver-parcel/:parcel_id', middleware, async (req, res) => {
    try {
        const biker = await Biker.findById(req.user_id);
        if (!biker) {
            return res.status(404).json({ success: false, message: 'wrong username or password' });
        }
        const parcel = await Parcel.findById(req.params.parcel_id);
        if (!parcel) {
            return res.status(404).json({ success: false, message: 'no parcel with the following id' });
        }

        if (parcel.status == 'picked')
            parcel.status = 'delivered';
        const saved_parcel = await parcel.save();

        return res.status(200).json({ success: true, parcel: saved_parcel });

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: 'server error' });
    }
});

// get undelivered parcels
router.get('/get-new-parcels', middleware, async (req, res) => {
    try {
        const biker = await Biker.findById(req.user_id);
        if (!biker) {
            return res.status(404).json({ success: false, message: 'wrong username or password' });
        }
        const parcels = await Parcel.find({ status: 'ready' });

        return res.status(200).json({ success: true, parcels });

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: 'server error' });
    }
});

module.exports = router;
