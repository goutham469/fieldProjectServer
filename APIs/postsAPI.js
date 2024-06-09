const exp = require('express')
const postsAPI = exp.Router()
const DBAccessMiddleware = require('../Middlewares/DBaccess')
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb')

postsAPI.use(exp.json())
postsAPI.use(bodyParser.urlencoded({ extended: true }))

postsAPI.get('/getAllPosts',DBAccessMiddleware,async (req,res)=>{
    // console.log("requested")
    let reponseFromDataBase = await req.postsCollection.find().toArray();

    res.send({"status":"success","data":reponseFromDataBase})
})

postsAPI.get('/getPostId',DBAccessMiddleware,async (req,res)=>{

    let responseFromDataBase = await req.countCollection.find().toArray()
    let currentCount = responseFromDataBase[0]

    // console.log(currentCount)
    currentCount = currentCount.postId;
    console.log(currentCount)

    await req.countCollection.updateOne({"postId":currentCount},{$set:{"postId":currentCount+1}})

    res.send({"status":true,"postCount":currentCount})
})

postsAPI.post('/createNewPost',DBAccessMiddleware,async (req,res)=>{

    console.log(req.body)
    let reponseFromDataBase = await req.postsCollection.insertOne(req.body)

    res.send({"reponseFromDataBase":reponseFromDataBase})
})

postsAPI.post('/deletePost',DBAccessMiddleware,async (req,res)=>{
    let responseFromDataBase = await req.postsCollection.deleteOne({"_id":new ObjectId(req.body.postId)})
    console.log(responseFromDataBase)

    res.send(responseFromDataBase)
})


module.exports = postsAPI