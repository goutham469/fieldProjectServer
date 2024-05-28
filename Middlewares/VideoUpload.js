

const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const VideoUploadToCloudinary = async(req,res,next)
{
    console.log(req.body)

    let responseFromCloudinary = await cloudinary.uploader.upload(req.body.video,{
        resource_type:"video",
        public_id:Date.now(),
        overwrite:true
    });
    req.videoURL = responseFromCloudinary.url;

    next();
}

module.exports = VideoUploadToCloudinary;