const express = require('express')
const cors = require('cors')
const {dbConnect} = require('./db')
const {userRouter} = require('./routes/userRoute')
const {companyRouter} = require('./routes/companyRoute')
const {errorHandler,notFoundHandler} = require('./middleware/errorMiddleware')
const { authHandler } = require('./middleware/authMiddleware')


const app = express()
const port = process.env.SERVER_PORT || 4004
dbConnect()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())


app.use('/api/companies',authHandler,companyRouter)
app.use('/api/users',userRouter)
app.use('*',notFoundHandler)
app.use(errorHandler)

app.listen(port,()=>{console.log(`le serveur s'execute sur le port ${port}`)})