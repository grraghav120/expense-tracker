const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authentication.split(" ")[1];
        jwt.verify(token,process.env.JWT_KEY);
        // req.userData={id:localStorage.getItem('Id').split(' ')[1]};
        next();
    }catch(error){
        res.status(401).json({
            message:'Auth Failed',
        })
    }
};
