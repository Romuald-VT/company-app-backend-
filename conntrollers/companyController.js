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
        text:message,
        html:"<b>"+message+"</b>"
    }

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error)
        {
            throw new Error(error.message)
        }
        
        return res.status(200).json(info.response)
    })
})

async function sendEmail(recipient,subject,pullMessage) {

    const transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 1025,
        secure: false,
        
    });
    const mailOptions = {
        from: 'no-reply@companyapp.com',
        to: recipient.email,
        subject:subject,
        message:pullMessage,
        html:'<p>'+pullMessage+'</p>'
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email envoyé à ${recipient.email}: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error(`Erreur lors de l'envoi à ${recipient.email}:`, error);
        throw error;
    }
}

const broadCastEmail= asyncHandler(async(req,res)=>{
    
    let recipients = []
    console.log(req.body)
    if(!req.body.to || !req.body.subject || !req.body.message)
    {
        return res.status(400).json({message:"format de mails invalide !"})
    }
    const mail = req.body.to.split(",")

    for(let i=0;i<mail.length;i++)
    {
        let data = await Company.findOne({email:mail[i]}).select({id:1,email:1})
        recipients.push(data)
    }
    
   
    try{
    const emailPromises = recipients.map(recipient => sendEmail(recipient,req.body.object,req.body.message));
    const results = await Promise.all(emailPromises);
    
    return res.status(200).json({message:"email envoyes avec succes !"});
    }
    catch (error) {
    throw new Error(error)
}

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
        company:req.body.company,
        telephone:req.body.telephone,
        email:req.body.email,
        website:req.body.website,
        countryHeadquater:req.body.countryHeadquater,
        domain:req.body.domain,
        homeland:req.body.homeland,
        contactName:req.body.contactName,
        contactLocation:req.body.contactLocation
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
        company:req.body.company,
        telephone:req.body.telephone,
        email:req.body.email,
        website:req.body.website,
        countryHeadquater:req.body.countryHeadquater,
        domain:req.body.domain,
        homeland:req.body.homeland,
        contactName:req.body.contactName,
        contactLocation:req.body.contactLocation
    }})
    return res.status(202).json({message:updateData})
})



const deleteCompanyByEmail = asyncHandler(async(req,res)=>{

    if(!req.params.email) return res.status(400).json({error : "veuillez entrer un email valide !"})
    
    let data = await Company.deleteOne({email:req.params.email})

    return res.status(200).json({message: data})
})

const multipleRemove = asyncHandler(async(req,res)=>{

    let dataSuppressed = []
    if(!req.body.mailList)
    {
        throw new Error('veuillez selectionner des emails')
    }
    const list = req.body.mailList.split(',')
    for(let i=0;i<list.length;i++)
    {
        let data = await Company.deleteOne({email:list[i]})
        dataSuppressed.push(data)
    }

    return res.status(202).json({acknolegement:dataSuppressed})
    
})

const deleteAllData = asyncHandler(async(req,res)=>{
    const data = await Company.deleteMany()
    return res.status(202).json({ data})
})
module.exports={getAllCompanies,getCompanyByEmail,getCompanyByName,createCompany,broadCastEmail,updateCompany,deleteAllData,deleteCompanyByEmail,
    multipleRemove,postMail}