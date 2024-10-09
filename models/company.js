const mongoose = require('mongoose')
const Joi = require('joi')


const companySchema = new mongoose.Schema({
  company:String,
  telephone:String,
  email:{type:String,unique:true},
  website:String,
  countryHeadquater:String,
  domain:String,
  homeland:String,
  contactName:String,
  contactLocation:String
   
})

const Company = mongoose.model('Company',companySchema)

const validateCompanyInput = (data)=>{
    const companyInputSchema = Joi.object({
     company:Joi.string().max(100).required(),
     telephone:Joi.string().pattern(/[0-9]/).required(),
     email:Joi.string().email().required(),
     website:Joi.string().max(100).required(),
     countryHeadquater:Joi.string().max(100).required(),
     domain:Joi.string().max(100).required(),
     homeland:Joi.string().max(100).required(),
     contactName:Joi.string().max(100).required(),
     contactLocation:Joi.string().max(100).required(),
    })

    return companyInputSchema.validate(data)
}

module.exports = {Company,validateCompanyInput}

