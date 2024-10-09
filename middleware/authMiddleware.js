const jwt = require('jsonwebtoken')
const { User } = require('../models/user')

const authHandler = async(req,res,next)=>
{
    
    let token = req.headers.authorization
    if(!token) return res.status(401).json({error: "acces non authorise !"})
    
    try{
        let decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select('-password')
    next()
    }
    catch(err)
    {
        res.status(401).json({message:"action non permise !"})
    }
}

module.exports = {authHandler} 