const mongoose = require('mongoose');

const ParcelSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String},
    pick_up_address: {type: String, required: true},   
    drop_off_address: {type: String, required: true},
    pick_up_date: {type: String},   // biker
    delivery_date: {type: String},  // biker
    status: {type: String, enum: ['ready', 'picked', 'delivered']}, // biker
    sender: {type: mongoose.Schema.Types.ObjectId, ref:'Sender', required: true},
    biker: {type: mongoose.Schema.Types.ObjectId, ref:'Biker'},
    biker_name: {type: String},
    date: {type: Date, default: new Date()}

});


const model =  mongoose.model('Parcel', ParcelSchema);


module.exports = model;
