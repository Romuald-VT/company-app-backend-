const express = require('express')
const {getAllCompanies,
    getCompanyByEmail,
    getCompanyByName,
    createCompany,
    updateCompany,
    deleteAllData,
    deleteCompanyByEmail,
    broadCastEmail,
    postMail,
    multipleRemove} = require('../conntrollers/companyController')

const {authHandler} = require('../middleware/authMiddleware')

const companyRouter = express.Router()

companyRouter.get("/all",getAllCompanies)
companyRouter.get('/:email',getCompanyByEmail)
companyRouter.get('/:name',getCompanyByName)
companyRouter.post('/add',createCompany)
companyRouter.post('/remove',multipleRemove)
companyRouter.post("/mail",postMail)
companyRouter.post('/broadCast',broadCastEmail)
companyRouter.put('/:email',updateCompany)
companyRouter.delete('/:email',deleteCompanyByEmail)
companyRouter.delete("/all",deleteAllData)

module.exports ={companyRouter} 