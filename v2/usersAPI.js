const exp = require("express")
const usersAPI = exp.Router()
const DBAccessMiddleware = require('../Middlewares/DBaccess')
const zlib = require('zlib')
const { ObjectId } = require("mongodb")
const Compress = require("../Middlewares/Compress")

usersAPI.get('/',(req,res)=>{
    res.send(`
        <div>
            <h1>Social media platform server , version 2</h1> 
            <b><b>users API </b></b>
        </div
        `)
})

async function getBookMarkPosts(keys,DB)
{
    const objectIds = keys.map(id=>new ObjectId(id))
    console.log(objectIds)

    const query = {"_id":{$in:objectIds}}

    let result = await DB.find(query).toArray()

    return result;
}

usersAPI.post('/all-details',DBAccessMiddleware,async(req,res,next)=>{
    let personalData = await req.usersCollection.find({"userName":req.body.user_name}).toArray()
    personalData = personalData[0]
    // console.log(personalData)

    // let bookmarks = await getBookMarkPosts(personalData.bookmarks,req.usersCollection)
    // console.log(bookmarks)
    // personalData.bookmarks = bookmarks

    // console.log(personalData)

    let postsData = await req.postsCollection.find({"author":req.body.user_name}).toArray();
    let allUsers = await req.usersCollection.find({},{_id:0,password:0,email:0,"friends.chatId":0,data1:0,data2:0,data3:0}).toArray()
    let data = {personalData:personalData,postsData:postsData,allUsers:allUsers}

    data = JSON.stringify(data);
    req.outputData = data;
    
    next() 
},Compress) 

usersAPI.post('/add-to-bookmarks',DBAccessMiddleware,async(req,res)=>{
    let bookmarks = await req.usersCollection.find({"userName":req.body.user_name}).toArray()
    // console.log(bookmarks)

    bookmarks = bookmarks[0].bookmarks
    // console.log(bookmarks) 
    if(bookmarks)
    {
        if(bookmarks.includes(req.body.postId))
        {
            res.send({"status":"success",message:"already there"})
            return;
        }
        else
        {
            let response = await req.usersCollection.updateOne( { "userName": req.body.user_name }, { $push: { "bookmarks": req.body.postId } } )
            res.send({"status":"success","message":"not there added","response":response});
            return;
        }
    }
    else
    {
        let response = await req.usersCollection.updateOne( { "userName": req.body.user_name }, { $push: { "bookmarks": req.body.postId } } )
        res.send({"status":"success","message":"not there added","response":response})
    }
    
})


module.exports = usersAPI