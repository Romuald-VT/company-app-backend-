const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
    username:{type:String,max:100},
    email:{type:String,unique:true},
    password:{type:String}
})

userSchema.methods.generateToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:'1h'})
}

const User = mongoose.model("User",userSchema)

const validateUserInput = (data)=>{
    const userInputSchema = Joi.object({
        username: Joi.string().min(3).max(100).required(),
        email:Joi.string().email().required(),
        password:Joi.string().pattern(/[a-zA-Z0-9]/)
    })
    return userInputSchema.validate(data)
}

const validateLogin = (data)=>{
    const loginSchema = Joi.object({
        username: Joi.string().min(3).max(100).required(),
        password:Joi.string().pattern(/^[a-zA-Z0-9]/)
    })
    
    return loginSchema.validate(data)
}

module.exports={User,validateUserInput,validateLogin}