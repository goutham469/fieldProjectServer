const exp = require('express')
const postsAPI = exp.Router()
const DBAccessMiddleware = require('../Middlewares/DBaccess')

postsAPI.use(exp.json())




postsAPI.get('/getAllPosts',DBAccessMiddleware,async (req,res)=>{
    console.log("requested")
    let reponseFromDataBase = await req.postsCollection.find().toArray();

    res.send({"status":"success","data":reponseFromDataBase})
})

postsAPI.get('/getPostId',DBAccessMiddleware,async (req,res)=>{

    let responseFromDataBase = await req.countCollection.find().toArray()

    let currentCount = responseFromDataBase[0]
    
    console.log(currentCount)
    currentCount = currentCount.postId;
    console.log(currentCount)

    await req.countCollection.updateOne({"postId":currentCount},{$set:{"postId":currentCount+1}})

    res.send({"status":true,"postCount":currentCount})
})

postsAPI.post('/createNewPost',DBAccessMiddleware,async (req,res)=>{
    console.log(req.body)
    let reponseFromDataBase = await req.postsCollection.insertOne(req.body)

    res.send(reponseFromDataBase)
})



module.exports = postsAPI