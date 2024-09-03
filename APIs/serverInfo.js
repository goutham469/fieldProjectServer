const exp = require('express')
const serverInfoAPI = exp.Router()
const path = require('path')


serverInfoAPI.get('/srsdocument',(req,res)=>{
    // console.log(path.join(__dirname))
    res.sendFile(path.join(__dirname,'../assets/specifications.docx'))
})

serverInfoAPI.get('/serverFile',(req,res)=>{
    res.sendFile(path.join(__dirname,'../server.js'))
})

serverInfoAPI.get('/postsAPI',(req,res)=>{
    res.sendFile(path.join(__dirname,'../APIs/postsAPI.js'))
})

serverInfoAPI.get('/usersAPI',(req,res)=>{
    res.sendFile(path.join(__dirname,'../APIs/usersAPI.js'))
})

serverInfoAPI.get('/DBaccess',(req,res)=>{
    res.sendFile(path.join(__dirname,'../Middlewares/DBaccess.js'))
})

serverInfoAPI.get('/packageDotjson',(req,res)=>{
    res.sendFile(path.join(__dirname,'../package.json'))
})

serverInfoAPI.get('/serverInfo',(req,res)=>{
    res.sendFile(path.join(__dirname,'../APIs/serverInfo.js'))
})

module.exports = serverInfoAPI