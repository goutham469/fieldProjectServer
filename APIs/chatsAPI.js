const exp = require('express')
const chatsAPI = exp.Router()
const DBAccessMiddleware = require('../Middlewares/DBaccess')

function getCurrentDateAndTime()
{
    let cur_date =new Date();
    let current_date = `${cur_date.getUTCHours()}-${cur_date.getUTCMinutes()}-${cur_date.getUTCSeconds()}:${cur_date.getUTCDate()}-${cur_date.getUTCMonth()}-${cur_date.getUTCFullYear()}:UTC`
    return current_date;
}

chatsAPI.get('/',(req,res)=>{
    res.send(`welcome to chats API ,response at ${getCurrentDateAndTime()}`)
})

chatsAPI.post('/getFriends',DBAccessMiddleware,async (req,res)=>{

    let responseFromDatabase = await req.usersCollection.find({userName:req.body.userName}).toArray();

    if(responseFromDatabase)
    {
        if(responseFromDatabase.length >= 1)
        {
            console.log(responseFromDatabase)
            res.send({"status":true,"friends":responseFromDatabase[0].friends})
        }
        else
        {
            res.send({"status":false,"message":"multiple user names found, cannot send data at this moment"})
        }
    }
    else
    {
        res.send({"status":false,"message":"username not found in DB"})
    }
})

chatsAPI.post('/checkInFriendsList',DBAccessMiddleware,async (req,res)=>{

    let responseFromDatabase = await req.usersCollection.find({userName:req.body.userName}).toArray();
    if(responseFromDatabase)
    {
        if(responseFromDatabase.length == 1)
        {
            responseFromDatabase = responseFromDatabase[0]
            let status = false;
            responseFromDatabase.friends.forEach(x=>{if(x.userName == req.body.friendUserName){status=true;}})
            if(status == true)
            {
                res.send({"status":true,"message":"includes"})
            }
            else
            {
                res.send({"status":true,"message":"not_includes"})
            }
        }
        else
        {
            res.send({"status":false,"message":"multiple user names found, cannot send data at this moment"})
        }
    }
    else
    {
        res.send({"status":false,"message":"username not found in DB"})
    }
})

chatsAPI.post('/addFriend',DBAccessMiddleware,async(req,res)=>{
    let newFriend = req.body.friendUserName;
    // console.log(newFriend)

    let responseFromDatabase = await req.usersCollection.updateOne(
        { userName: req.body.userName },
        {
          $push: {
            friends: {
              userName: newFriend,
              chatId:`${req.body.userName}to${newFriend}`
            }
          }
        }
      )
    await req.chatsCollection.insertOne({
        chatId:`${req.body.userName}to${newFriend}`,
        DateCreated:getCurrentDateAndTime(),
        content:[],
        FromUser:req.body.userName,
        toUser:req.body.friendUserName
    })
    res.send(responseFromDatabase)
})



module.exports = chatsAPI