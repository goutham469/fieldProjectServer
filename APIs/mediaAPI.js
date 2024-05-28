const exp = require('express')
const mediaAPI = exp.Router()
var cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary')
const multer = require('multer')


mediaAPI.use(exp.json());
mediaAPI.use(exp.urlencoded({ extended: true }));

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

const videoCloudinaryStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      return {
        folder: process.env.CLOUDINARY_FOLDER_SOCIAL_POSTS_VIDEOS, // Ensure this folder exists in your environment variables
        resource_type: 'video',
        public_id: Date.now().toString()
      };
    }
  });

const audioCloudinaryStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      return {
        folder: process.env.CLOUDINARY_FOLDER_SOCIAL_POSTS_AUDIOS, // Ensure this folder exists in your environment variables
        resource_type: 'auto',
        public_id: Date.now().toString()
      };
    }
  });

  const documentCloudinaryStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      return {
        folder: process.env.CLOUDINARY_FOLDER_SOCIAL_POSTS_DOCUMENTS, // Ensure this folder exists in your environment variables
        resource_type: 'auto',
        public_id: Date.now().toString()
      };
    }
  });

var Profileupload = multer({storage:profileImagecloudinaryStorage})
var Postupload = multer({storage:postsImagecloudinaryStorage})
 // Multer configuration for video uploads
const videoUpload = multer({ storage: videoCloudinaryStorage });
const audioUpload = multer({ storage: audioCloudinaryStorage });
const documentUpload = multer({ storage: documentCloudinaryStorage });


mediaAPI.post('/uploadPostImage',Postupload.single("photo"),async (req,res)=>{

    console.log(req.body)

    console.log(req.file);
    res.send({"status":true,"file":req.file})
})


mediaAPI.post('/uploadPostVideo', videoUpload.single("video"), async (req, res) => {
    console.log("Video POST request received");
  
    if (!req.file) {
      return res.status(400).send({ status: false, error: 'No file uploaded' });
    }
  
    console.log("File to be uploaded:", req.file);
  
    res.send({ status: true, file: req.file });
  });

  mediaAPI.post('/uploadPostAudio', audioUpload.single("audio"), async (req, res) => {

    console.log("Audio POST request received");

    if (!req.file) {
      return res.status(400).send({ status: false, error: 'No file uploaded' });
    }
  
    console.log("File to be uploaded:", req.file);
  
    res.send({ status: true, file: req.file });
  });


  mediaAPI.post('/uploadPostDocument', documentUpload.single("document"), async (req, res) => {

    console.log("Document POST request received");

    if (!req.file) {
      return res.status(400).send({ status: false, error: 'No file uploaded' });
    }
  
    console.log("File to be uploaded:", req.file);
  
    res.send({ status: true, name: req.file.originalname,src:req.file.path,size:req.file.size });
  });



  module.exports = mediaAPI


// async function videoElement(videoFile)
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


// mediaAPI.post('/uploadPostVideo',async (req,res)=>{

//     console.log(req.body)

//     console.log("video upload started");
    

//     let responseFromCloudinary = await videoElement(req.body.video);

//     console.log("video upload completed")
//     console.log(responseFromCloudinary)

//     res.send({"status":true,"url":responseFromCloudinary})
// })

// mediaAPI.post('/uploadPostVideo',Postupload.single("video"),async (req,res)=>{

//     console.log("video POST request fetched");

//     console.log("request body",req.body)

//     console.log("file to be uploaded",req.file);

//     res.send({"status":true,"file":req.file})
// })


