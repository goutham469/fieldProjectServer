const exp = require('express')
const cors = require('cors')
const app = exp()
const path = require('path')
const mclient = require('mongodb').MongoClient
require('dotenv').config()

const usersAPI = require('./APIs/usersAPI')
const postsAPI = require('./APIs/postsAPI')
const serverInfoAPI = require('./APIs/serverInfo')
const mediaAPI = require('./APIs/mediaAPI')

app.use(exp.json())
app.use(cors())

console.log(process.env.MONGODB_CONNECTION_URL)

mclient.connect(`${process.env.MONGODB_CONNECTION_URL}`).then(client=>{
    const DB = client.db('social')
    const usersCollection = DB.collection('users')
    const postsCollection = DB.collection('posts')
    
    app.set('usersCollection',usersCollection)
    app.set('postsCollection',postsCollection)

    console.log("mongo DB connection successfull")
})

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'about.html'))
})




app.use('/users',usersAPI)
app.use('/posts',postsAPI)
app.use('/serverInfo',serverInfoAPI)
app.use('/media',mediaAPI)



app.listen(process.env.SERVER_PORT,()=>{console.log(`server running on port ${process.env.SERVER_PORT}...`)})
