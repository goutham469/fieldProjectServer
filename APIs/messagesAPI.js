const exp = require('express')
const messagesAPI = exp.Router()
const DBAccessMiddleware = require('../Middlewares/DBaccess')

function getCurrentDateAndTime()
{
    let cur_date =new Date();
    let current_date = `${cur_date.getUTCHours()}-${cur_date.getUTCMinutes()}-${cur_date.getUTCSeconds()}:${cur_date.getUTCDate()}-${cur_date.getUTCMonth()}-${cur_date.getUTCFullYear()}:UTC`
    return current_date;
}
function getCurrentDateAndTimeINDIA()
{
    let cur_date =new Date();
    let current_date = `${cur_date.getHours()}-${cur_date.getMinutes()}-${cur_date.getSeconds()}:${cur_date.getDate()}-${cur_date.getMonth()}-${cur_date.getFullYear()}:IST`
    return current_date;
}

messagesAPI.get('/',(req,res)=>{
    res.send(`Hi welcome to messages API, This API is dedicated to server only for messaging purposes, requested at : ${getCurrentDateAndTime()}`)
})

messagesAPI.post('/getMessagesOfSenderToReceiver',DBAccessMiddleware,async (req,res)=>{
    let responseFromDatabase = await req.chatsCollection.find({"chatId":`${req.body.sender}to${req.body.receiver}`}).toArray()

    if(responseFromDatabase)
    {
        responseFromDatabase = responseFromDatabase[0];
        res.send({"status":true,"content":responseFromDatabase.content})
    }
    else
    {
        res.send({"status":false,"message":"ChatId not found"})
    }
})

messagesAPI.post('/sendMessage',DBAccessMiddleware,async (req,res)=>{
    let responseFromDatabase = await req.chatsCollection.updateOne({chatId:`${req.body.sender}to${req.body.receiver}`},
        {
          $push: {
                content:{
                    "message":req.body.message,
                    "time":getCurrentDateAndTimeINDIA(),
                    "sentByMe":true
                }
            }
        }
    )
    await req.chatsCollection.updateOne({chatId:`${req.body.receiver}to${req.body.sender}`},
        {
          $push: {
                content:{
                    "message":req.body.message,
                    "time":getCurrentDateAndTimeINDIA(),
                    "sentByMe":false
                }
            }
        }
    )
    res.send(responseFromDatabase)
    }
)

module.exports = messagesAPI