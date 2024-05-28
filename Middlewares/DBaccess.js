const DBAccessMiddleware = (req,res,next)=>{
    req.usersCollection = req.app.get('usersCollection')
    req.postsCollection = req.app.get('postsCollection')
    req.countCollection = req.app.get('countCollection')
    next()
}

module.exports = DBAccessMiddleware