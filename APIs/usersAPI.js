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

    // console.log(req.body)
    
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
    let responseFromDatabase = await req.usersCollection.find({email:req.body.email},{_id:0,password:0,state:0,city:0,gender:0,email:0}).toArray();
    
    if(responseFromDatabase.length == 0)
    {
        res.send({"message":"no_userName_associated"})
    }
    else
    {
        let users_associated = []
        responseFromDatabase.forEach(x=>{users_associated.push({"username":x.userName,"profilePicture":x.profilePicture})})
        if(users_associated.length == 0)
        {
            res.send({"message":"no_userName_associated"})
        }
        else
        {
            // console.log(users_associated)
            res.send({"message":"userName_associated","usersAssociated":users_associated})
        }
    }
})

usersAPI.post('/getNonFriends', DBAccessMiddleware, async (req, res) => {
    try {
        // Fetch the user data from the database
        let responseFromDatabase = await req.usersCollection.find({"userName": req.body.userName}).toArray();
        if (responseFromDatabase.length === 0) {
            return res.status(404).send({error: "User not found"});
        }

        let user = responseFromDatabase[0];
        let friendsOfUserName =[]
        user.friends.forEach(x=>{
            friendsOfUserName.push(x.userName)
        })

        // Fetch all users from the database
        let allUsers = await req.usersCollection.find({}).toArray();

        // Filter out friends from all users to get non-friends
        let nonFriends = allUsers.filter(user => !friendsOfUserName.includes(user.userName) && user.userName !== req.body.userName)
                                  .map(user => user);

        res.send(nonFriends);
    } catch (error) {
        console.error(error);
        res.status(500).send({error: "An error occurred while fetching non-friends"});
    }
});

usersAPI.post('/getPersonalData',DBAccessMiddleware,async(req,res)=>{
    let responseFromDatabase = await req.usersCollection.find({"userName":req.body.user_name}).toArray()
    responseFromDatabase = responseFromDatabase[0]

    let responseFromDatabase2 = await req.postsCollection.find({"author":req.body.user_name}).toArray();

    res.send({status:true,"personalData":responseFromDatabase,"postsData":responseFromDatabase2})
})

usersAPI.post('/updateProfilePic',DBAccessMiddleware,async (req,res)=>{
    let responseFromDatabase = await req.usersCollection.updateOne({userName:req.body.userName},{$set:{"profilePicture":req.body.url}})
    res.send(responseFromDatabase)
})
 


module.exports = usersAPI;
