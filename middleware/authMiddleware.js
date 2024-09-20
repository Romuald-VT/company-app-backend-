const jwt = require('jsonwebtoken')
const { User } = require('../models/user')

const authHandler = async(req,res,next)=>
{
    let token = req.header('x-token-bearer')
    if(!token) return res.status(401).json({error: "acces non authorise !"})
    
    try{
        let decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select('-password')
    next()
    }
    catch(err)
    {
        console.log(err.message)
        res.status(401)
        throw new Error('action non permise')
    }
}

module.exports = {authHandler} 