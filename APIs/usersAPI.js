const exp = require('express');
const usersAPI = exp.Router();
const DBAccessMiddleware = require('../Middlewares/DBaccess');

usersAPI.use(exp.json())

usersAPI.get('/', (req, res) => {
    res.send('hi');
});

usersAPI.post('/createUser', DBAccessMiddleware, async (req, res) => {
    // console.log(req.body);
    let userData = req.body
    userData.userName = userData.userName.toLowerCase()
    // console.log(userData)

    let responseFromDatabase = await req.usersCollection.insertOne(userData);
    res.send(responseFromDatabase);
});

usersAPI.get('/getAllUsers', DBAccessMiddleware, async (req, res) => {
    // console.log(req.usersCollection);

    let responseFromDatabase = await req.usersCollection.find().toArray();
    res.send(responseFromDatabase);
});

usersAPI.post('/checkUserName', DBAccessMiddleware, async (req, res) => {
    
    let response = await req.usersCollection.find({"userName":req.body.userName.toLowerCase()}).toArray()
    if(response.length == 0)
    {
        res.send({"status":true,"existence":"not_exists"})
    }
    else
    {
        res.send({"status":true,"existence":"exists"})
    }
});

usersAPI.post('/getPassword',DBAccessMiddleware,async (req,res)=>{

    let responseFromDatabase = await req.usersCollection.find({"userName":req.body.userName.toLowerCase()}).toArray()
    res.send({"password":responseFromDatabase[0].password})
})

usersAPI.post('/checkLoginCredentials',DBAccessMiddleware,async (req,res)=>{
    let responseFromDatabase = await req.usersCollection.find({"userName":req.body.userName.toLowerCase()}).toArray()

    if(responseFromDatabase.length == 0)
    {
        res.send({message:"user_name_not_exist"})
    }
    else
    {
        if(req.body.password == responseFromDatabase[0].password)
        {
            res.send({message:"login_success"})
        }
        else
        {
            res.send({message:"invalid_password"})
        }
    }
})

usersAPI.post('/getUserNameByEmailID',DBAccessMiddleware,async (req,res)=>{
    let responseFromDatabase = await req.usersCollection.find({"email":req.body.email}).toArray();
    
    if(responseFromDatabase.length == 0)
    {
        res.send({"message":"no_userName_associated"})
    }
    else
    {
        let users_associated = []
        responseFromDatabase.forEach(x=>{users_associated.push(x.userName)})
        if(users_associated.length == 0)
        {
            res.send({"message":"no_userName_associated"})
        }
        else
        {
            res.send({"message":"userName_associated","usersAssociated":users_associated})
        }
    }
})



module.exports = usersAPI;
