const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authentication.split(" ")[1];
        jwt.verify(token,'raghav_garg_first_mean_project_this_can_be_anything');
        next();
    }catch(error){
        res.status(401).json({
            message:'Auth Failed',
        })
    }
};
