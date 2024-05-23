const DBAccessMiddleware = (req,res,next)=>{
    req.usersCollection = req.app.get('usersCollection')
    req.postsCollection = req.app.get('postsCollection')
    next()
}

module.exports = DBAccessMiddleware