const express = require('express')
const {getAllCompanies,
    getCompanyByEmail,
    getCompanyByName,
    getCompanyByWebsite,
    createCompany,
    updateCompany,
    deleteAllData,
    deleteCompanyByEmail,
    postMail} = require('../conntrollers/companyController')

const {authHandler} = require('../middleware/authMiddleware')

const companyRouter = express.Router()

companyRouter.get("/all",getAllCompanies)
companyRouter.get('/:email',getCompanyByEmail)
companyRouter.get('/:name',getCompanyByName)
companyRouter.get('/:website',getCompanyByWebsite)
companyRouter.post('/add',createCompany)
companyRouter.post("/mail",postMail)
companyRouter.put('/:email',updateCompany)
companyRouter.delete('/:email',deleteCompanyByEmail)
companyRouter.delete("/all",deleteAllData)

module.exports ={companyRouter} 