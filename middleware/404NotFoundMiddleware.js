
const notFoundHandler = (req,res)=>{
    
    return res.status(404).json({error:`${req.path} not found`})
}
module.exports = {notFoundHandler} 