const {Company, validateCompanyInput} = require('../models/company')
const asyncHandler = require('express-async-handler')
const nodemailer = require('nodemailer')

const getAllCompanies = asyncHandler(async(req,res)=>{
    
    const companies = await Company.find({})


    return res.status(200).json({companies})
})

const getCompanyByEmail = asyncHandler(async(req,res)=>{


    if(!req.params.email)
    {
        return res.status(400).json({error: "veillez fournir un email valide !"})
    }
    let company = await Company.findOne({email:req.params.email})
    if(!company)
    {
        return res.status(404).json({error: 'entreprise recherchee introuvable !'})
    }

    return res.status(200).json({data:company})
})

const getCompanyByName = asyncHandler(async(req,res)=>{

    if(! req.params.name)
    {
        return res.status(400).json({error: "veillez fournir un nom valide !"})
    }
    let company = await Company.findOne({company:req.params.name})
    if(!company)
    {
        return res.status(404).json({error: 'entreprise recherchee introuvable !'})
    }

    return res.status(200).json({data:company})
})

const getCompanyByWebsite = asyncHandler(async(req,res)=>{

    if(! req.params.website)
    {
        return res.status(400).json({error: "veillez fournir un site web valide !"})
    }
    let company = await Company.findOne({email:req.params.website})
    if(!company)
    {
        return res.status(404).json({error: 'entreprise recherchee introuvable !'})
    }

    return res.status(200).json({data:company})
})

const postMail = asyncHandler(async(req,res)=>{
    
    const {to,object,message} = req.body
    
    let transporter = nodemailer.createTransport({
        host: 'localhost',
        port:1025,
        secure:false
    })


    let mailOptions = {
        from: "no-reply@companyapp.com",
        to:to,
        subject:object,
        text:message
    }

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error)
        {
            throw new Error(error.message)
        }
        
        return res.status(200).json(info.response)
    })
})
const createCompany = asyncHandler(async(req,res)=>{


    const {error} = validateCompanyInput(req.body)

    if(error)
    {
        throw new Error(error.details[0].message)
    }
    let cmpny = await Company.findOne({email:req.body.email})

    if(cmpny) return res.status(400).json({error: "l'entreprise existe deja !"})

    const companyData = new Company({
        company: req.body.company,
        email:req.body.email,
        website:req.body.website,
        phone:req.body.phone,
        domain:req.body.domain,
        ceo:req.body.ceo,
        country:req.body.country
    })
    companyData.save()
    return res.status(201).json({created:true})
})

const updateCompany = asyncHandler(async(req,res)=>{
     
    if(!req.params.email)
    {
        return res.status(400).json({error: "veuillez entrer un email valide"})
    }
   
    const {error} = validateCompanyInput(req.body)
    if(error)
    {
        let errorObject = {errorType: error.name,errorMessage:error.details[0].message}

        throw new Error(errorObject)
    }
    const updateData = await Company.updateMany({email:req.params.email},{$set:{
        company: req.body.company,
        email: req.body.email,
        website:req.body.website,
        phone:req.body.phone,
        domain:req.body.domain,
        ceo:req.body.ceo,
        country:req.body.country,
    }})
    return res.status(202).json({message:updateData})
})

const deleteCompanyByEmail = asyncHandler(async(req,res)=>{

    if(!req.params.email) return res.status(400).json({error : "veuillez entrer un email valide !"})
    
    let data = await Company.deleteOne({email:req.params.email})

    return res.status(200).json({message: data})
})

const deleteAllData = asyncHandler(async(req,res)=>{
    const data = await Company.deleteMany({})
    return res.status(202).json({data: data})
})
module.exports={getAllCompanies,getCompanyByEmail,getCompanyByName,getCompanyByWebsite,createCompany,updateCompany,deleteAllData,deleteCompanyByEmail,postMail}