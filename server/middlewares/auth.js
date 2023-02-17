const jwt = require('jsonwebtoken');



const check_user = (req, res, next) => {
    let token = req.headers['x-auth']; 
    if(token) {
        jwt.verify(token, '123456', (err, decoded)=>{
           if(err){
            return res.status(401).json({success: false, message: 'invalid token'});
             //  next();
           }
               req.user_id = decoded.id;
            next();
        });
    }
    else {
        return res.status(403).json({success: false, message: 'token not provided'});
       // req.decoded = null;
       // next();
    }
};



module.exports = check_user;