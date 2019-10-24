const formidable = require("formidable");
const cloudinary = require('cloudinary');
const { addslashes } = require("../helper/helper")
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});

module.exports.getUsers = (req, res) => {
    // let query = "SELECT email, fullname, photo, id, created_at FROM users";
    let query = "CALL getAllUsers()";
    con.query(query, (err, users, fl) => {
        if(err) return res.status(400).json( {message: "Error occur"} );
        return res.status(200).json(users[0]);
    });
}

module.exports.getInfoLoggedUser = (req, res) => {
    console.log(req.payload)
    if(req.payload._id === req.userPayload.id) {
        req.userPayload.hashed_password = undefined;
        req.userPayload.salt = undefined;
        return res.json( req.userPayload )
    } else {
        return res.status(404).json( {message: 404} );
    }
}

module.exports.requrestRelatedUserId = async (req, res, next, id) => {
    try {
        // let query = `SELECT * FROM users WHERE id=${id}`;
        let query = `CALL getUserById(${Number(id)})`;
        console.log(query)
        con.query(query, (err, user) => {
            console.log(user[0][0])
            if(err || user.length === 0) {
                return res.status(404).json( {message: 404} );
            } else {
                req.userPayload = user[0][0];
                next();
            }
        })
    } catch (err) {
        return res.status(404).json( {message: 404} );
    }
}

module.exports.updateStoryUser = (req, res) => {
    let user = req.userPayload;
    let { bioUpdate, fquotes } = req.body;

    let query = `UPDATE users SET bio='${addslashes(bioUpdate)}', quotes='${addslashes(fquotes)}' WHERE id=${user.id}`;
    con.query(query, (err, result) => {
        if(err) return res.status(400).json( {message: "Error occur (update story)"} );
        return res.status(200).json( {message: "Story updated"} );
    });
}

module.exports.updateInfoUser = (req, res) => {
    let user = req.userPayload;
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, function(err, fields, files) {
        let { id, fullname } = fields;
        fullname = fullname === null ? "" : addslashes(fullname);
        if(files.photo) {
            
            if(user.photo) {
                const fileName = user.photo.split("/")[user.photo.split("/").length - 1].split(".")[0];
                cloudinary.v2.uploader.destroy(fileName);
            }
            cloudinary.v2.uploader.upload(files.photo.path, function(error, result) {
                user.photo = result.secure_url;
                }).then( () => {
                    // let query = "UPDATE users SET fullname='" + addslashes(fullname) + "' , photo='" + addslashes(user.photo) + "' WHERE id=" + user.id;
                    let query = `CALL updateUserInfoAndRelatedAnswers('${addslashes(fullname)}', '${addslashes(user.photo)}', ${Number(user.id)})`;
                    con.query(query, (err, result) => {
                        if(err) {
                            return res.status(400).json( {message: "Error occur. Please try again"} )
                        }
                        return res.status(200).json( {message: `Info updated!`} );
                    })
                })
        } else {
            let query = "UPDATE users SET fullname='" + addslashes(fullname) +  "' WHERE id=" + user.id;
            con.query(query, (err, result) => {
                if(err) {
                    return res.status(400).json( {message: "Error occur. Please try again"} )
                }
                return res.status(200).json( {message: `Info updated!`} );
            })
        }
    })
}


module.exports.postUploadImage = (req, res) => {
    let user = req.userPayload;
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, function(err, fields, files) {
        if(files.photo) {
            cloudinary.v2.uploader.upload(files.photo.path, function(error, result) {
                req.imageURL = result.secure_url;
            }).then( () => {
                let query = `INSERT INTO galleries (image_url, owner) VALUES('${addslashes(req.imageURL)}', ${user.id})`;
                con.query(query, (err, result) => { 
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

module.exports.getUploadImages = (req, res) => {
    let user = req.userPayload;
    let query = `SELECT * FROM galleries WHERE owner = ${user.id}`;
    con.query(query, (err, result) => {
        if(err) {
            return res.status(400).json( {message: "Error occur (get galleries)"} )
        }
        return res.status(200).json( {images: result} )
    })
}

module.exports.putDeleteUploadedImage = async (req, res) => {
    let {img, photoName} = req.body;
    let user = req.userPayload;
    await cloudinary.v2.uploader.destroy(photoName);
    let query = `DELETE FROM galleries WHERE image_url = '${img}'`;
    con.query(query, (err, result) => {
        console.log(err)
        if(err) return res.status(400).json( {message: "Error occur (delete uploaded photo)"} );
        return res.status(200).json( {message: "Photo deleted"} );
    })
}