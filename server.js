const exp = require('express')
const cors = require('cors')
const app = exp()
const path = require('path')
const mclient = require('mongodb').MongoClient
require('dotenv').config()

const cloudinary = require("cloudinary").v2

const usersAPI = require('./APIs/usersAPI')
const postsAPI = require('./APIs/postsAPI')
const serverInfoAPI = require('./APIs/serverInfo')
const mediaAPI = require('./APIs/mediaAPI')
const chatsAPI = require('./APIs/chatsAPI')
const messagesAPI = require('./APIs/messagesAPI')

const usersAPI2 = require('./v2/usersAPI')

app.use(exp.json())
app.use(cors())

console.log(process.env.MONGODB_CONNECTION_URL)

mclient.connect(`${process.env.MONGODB_CONNECTION_URL}`).then(client=>{
    const DB = client.db('social')
    const usersCollection = DB.collection('users')
    const postsCollection = DB.collection('posts')
    const countCollection = DB.collection('count')
    const chatsCollection = DB.collection('chats')
    
    app.set('usersCollection',usersCollection)
    app.set('postsCollection',postsCollection)
    app.set('countCollection',countCollection)
    app.set('chatsCollection',chatsCollection)

    console.log("mongo DB connection successfull")
})

// console.log(process.env.CLOUDINARY_API_KEY)

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure:true
  });

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'about.html'))
})

// const videoFile = path.join(__dirname,'./sampleVideo.mp4')
// const imageFile = path.join(__dirname,'./image.png')


// async function videoElement()
// {
//     console.log("upload started")
//     try
//     {
//         const result = await cloudinary.uploader.upload(videoFile,
//             {resource_type:"video",
//                 public_id:"trailVideoUpload",
//                 overwrite:true
//             })
//         console.log("upload complted , waitinng for result from CLOUD")

        
//         console.log("> Result :",result)

//         return result.url
//     }
//     catch(err)
//     {
//         console.log(err)
//     }
//     // console.log("upload completed successfully")
// }
// async function imageElement()
// {
//     try
//     {
        
//         const result = await cloudinary.uploader.upload(imageFile,{resource_type:"image"})
//         console.log("> Result :",result)
//         return result.url;
//     }
//     catch(err)
//     {
//         console.log(err)
//     }
// }

// videoElement();

app.get('/firstRender',async (req,res)=>{
    res.send({"status":true})
})

// app.get('/image',async (req,res)=>{
//     console.log(req.params)
//     let result1 = await imageElement()
//     res.send({"status":true,"url":result1})
// })


// app.get('/video',async (req,res)=>{
//     console.log(req.params)
//     let result1 = await videoElement()
//     res.send({"status":true,"url":result1})
// })

// videoElement()


app.use('/users',usersAPI)
app.use('/posts',postsAPI)
app.use('/serverInfo',serverInfoAPI)
app.use('/media',mediaAPI)
app.use('/chats',chatsAPI)
app.use('/messages',messagesAPI)

app.use('/v2/users',usersAPI2)

app.get('*',(req,res)=>res.send("<h1>Route not found</h1>"))



app.listen(process.env.SERVER_PORT,()=>{console.log(`server running on port ${process.env.SERVER_PORT}...`)})
