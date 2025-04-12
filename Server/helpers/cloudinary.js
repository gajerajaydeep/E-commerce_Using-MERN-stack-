const cloudinary = require('cloudinary').v2;

const multer = require('multer');

cloudinary.config({
    cloud_name : 'dwjtwjbbk',
    api_key : '862822624361222',
    api_secret : 'roppbbx9h2dH4fdj1wZdIzLyiNs',
})

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file,{
        resource_type:'auto'
    })

    return result;
}

const upload = multer({storage})
module.exports = {upload , imageUploadUtil};