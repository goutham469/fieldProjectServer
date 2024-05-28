require("dotenv").config()

const cloudinary = require("cloudinary").v2;

console.log(process.env.CLOUDINARY_API_KEY)

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const videoFile = "./sampleVideo.mp4"

async function videoElement()
{
    try
    {
        const result = await cloudinary.uploader.upload(videoFile,
            {resource_type:"video",
                public_id:"trailVideoUpload",
                overwrite:true
            })

        result = await result.json()
        console.log("> Result :",result)
    }
    catch(err)
    {
        console.log(err)
    }
}

videoElement()


const imageFile = './image.png'
async function imageElement()
{
    try
    {
    
        const result = await cloudinary.uploader.upload(file,{resource_type:"image"})
        console.log("> Result :",result)
    }
    catch(err)
    {
        console.log(err)
    }
}