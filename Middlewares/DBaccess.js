const DBAccessMiddleware = (req,res,next)=>{
    req.usersCollection = req.app.get('usersCollection')
    next()
}

module.exports = DBAccessMiddleware