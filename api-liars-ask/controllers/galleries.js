
const formidable = require("formidable");
const cloudinary = require('cloudinary');
const { addslashes } = require("../helper/helper")
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});


module.exports.postUploadImage = (req, res) => {
    let user = req.userPayload;
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, function(err, fields, files) {
        if(files.photo) {
            cloudinary.v2.uploader.upload(files.photo.path, function(error, result) {
                user.galleries = [result.secure_url, ...user.galleries];
                req.imageURL = result.secure_url;
            }).then( () => {
                user.save( (err, result) => {
                    if(err) {
                        return res.status(400).json( {message: "Error occur (post upload)"} )
                    }
                    return res.status(200).json( {message: `Image uploaded`, imageURL: req.imageURL} );
                })
            })
        } else {
            return res.status(400).json( {message: "No file choose"} )
        }
    })
}

// module.exports.getUploadImages = (req, res) => {
//     return res.json( {images: req.userPayload.galleries} );
// }

// module.exports.putDeleteUploadedImage = async (req, res) => {
//     let {img, photoName} = req.body;
//     let user = req.userPayload;
//     await cloudinary.v2.uploader.destroy(photoName);
//     user.galleries = user.galleries.filter( imgURL => imgURL !== img);
//     await user.save( (err, result) => {
//         if(err) return res.status(400).json( {message: "Error occur (delete uploaded photo)"} );
//         return res.status(200).json( {message: "Photo deleted"} );
//     });
// }