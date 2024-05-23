const exp = require('express')
const postsAPI = exp.Router()
const DBAccessMiddleware = require('../Middlewares/DBaccess')

postsAPI.use(exp.json())




postsAPI.get('/getAllPosts',DBAccessMiddleware,async (req,res)=>{
    console.log("requested")
    let reponseFromDataBase = await req.postsCollection.find().toArray();

    res.send({"status":"success","data":reponseFromDataBase})
})



module.exports = postsAPI