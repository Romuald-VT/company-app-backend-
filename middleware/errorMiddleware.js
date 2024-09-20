
const errorHandler = (err,req,res) =>
{
    let statusCode = req.statusCode ? req.statusCode : 500
    res.status(statusCode)
    return res.json({error:err.message})
}


const notFoundHandler = (req,res)=>{
    
    return res.status(404).json({error:`${req.path} not found`})
}

module.exports = {errorHandler,notFoundHandler} 