const mongoose = require('mongoose')

const dbConnect =async()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("connecte a la base de donnee !")
    } catch (error) {
        console.log('erreur:',error.message)
    }
}
 module.exports = {dbConnect} 