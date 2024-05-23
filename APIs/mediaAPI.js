const exp = require('express')
const mediaAPI = exp.Router()
var cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary')
const multer = require('multer')


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure:true
  });


const profileImagecloudinaryStorage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:async (req,file)=>{
        return {
            folder:process.env.CLOUDINARY_FOLDER_SOCIAL_PROFILE_IMAGES,
            public_id:Date.now()
        }
    }
})

const postsImagecloudinaryStorage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:async (req,file)=>{
        return {
            folder:process.env.CLOUDINARY_FOLDER_SOCIAL_POSTS_IMAGES,
            public_id:Date.now()
        }
    }
})

var Profileupload = multer({storage:profileImagecloudinaryStorage})
var Postupload = multer({storage:postsImagecloudinaryStorage})

mediaAPI.post('/uploadPostImage',Postupload.single("photo"),async (req,res)=>{

    console.log(req.file);
    res.send({"status":true,"file":req.file})
})


mediaAPI.use(exp.json())
mediaAPI.use(exp.urlencoded())


module.exports = mediaAPI