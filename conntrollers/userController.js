const {User, validateUserInput, validateLogin} = require('../models/user')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')


const createUser = asyncHandler(async(req,res)=>{
    
    const {error} = validateUserInput(req.body)
    if(error)
    {
        
        throw new Error(error.details[0].message)
    }
    let salt = await bcrypt.genSalt(10)
    let hashedPassword = await bcrypt.hash(req.body.password,salt)

    const user = new User({
        username:req.body.username,
        email: req.body.email,
        password: hashedPassword
    })
    
    await user.save()
    return res.status(201).json({message: user})
})

const login = asyncHandler(async(req,res)=>{
    
    const {error} = validateLogin(req.body)
    if(error)
    {
        
        throw new Error(error.details[0].message)
    }
    let user = await User.findOne({username: req.body.username})
    if(! user) return res.status(400).json({error :" utilisateur introuvable !"})
    
    let isSamePassword = await bcrypt.compare(req.body.password,user.password)
    
    if(!isSamePassword)
    {
        return res.status(400).json({error: "utilisateur et/ou mot de passe incorrect"})
    }
    let token = user.generateToken()
    return res.status(200).json({token})
})

module.exports ={login,createUser}