const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Joi = require('joi')


const companySchema = new mongoose.Schema({
   company:{type:String},
   email:{type:String,unique:true},
   website:{type:String,unique:true},
   phone:{type:String,max: 100,min: 9},
   domain:{type:String},
   ceo:{type:String},
   country:{type:String}
})

const Company = mongoose.model('Company',companySchema)

const validateCompanyInput = (data)=>{
    const companyInputSchema = Joi.object({
      company: Joi.string().max(100),
      email:Joi.string().email(),
      website: Joi.string().max(100),
      phone: Joi.string().max(100).pattern(/^[0-9]/),
      domain: Joi.string().max(100),
      ceo: Joi.string().max(100),
      country: Joi.string().max(100),
    })

    return companyInputSchema.validate(data)
}

module.exports = {Company,validateCompanyInput}

