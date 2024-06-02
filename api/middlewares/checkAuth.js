const checkAuth =  (req,res,next) =>{
    console.log(req.header);
    next()
};
module.exports = checkAuth;