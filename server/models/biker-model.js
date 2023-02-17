const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const BikerSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    image: {type: String}
   
});


BikerSchema.methods.generate_jwt_token = function () {
    
    return jwt.sign({id: this._id}, '123456', {expiresIn: '7d', algorithm: 'HS512'});
        
        /*  privateKEY, {expiresIn:'7d', algorith: 'RSA2048'}); */
    }

const model =  mongoose.model('Biker', BikerSchema);


module.exports = model;