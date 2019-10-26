const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
// const nodemailer = require("nodemailer");
const crypto = require("crypto");

module.exports.postSignup = (req, res) => {
    const { email, password } = req.body;
    let salt = Math.random().toString(36).slice(-8);
    let hashed_password = crypto.createHmac("sha256", salt).update(password).digest("hex");
    let query = `CALL postSignup ('${email}', '${salt}', '${hashed_password}')`;

    con.query(query, (err, result) => {
        console.log(err, result)
        if(err) {
            return res.status(400).json( {message: "Error occur"} )
        }
        return res.status(200).json( {message: result[0][0].message} );
    })
}

module.exports.postSignin = (req, res) => {
    let { email, password } = req.body;
    let query   = "SELECT users.id, email, hashed_password, salt, fullname, photo, permission";
    query       += " FROM users, privileges"
    query       += " WHERE users.roles = privileges.id AND email='"+email+"'"
    con.query(query, (err, user) => {
        if(!err && user.length > 0) {
            let { salt, hashed_password, email, fullname, photo, permission } = user[0];
            let _id = user[0].id;
            if(hashed_password === crypto.createHmac("sha256", salt).update(password).digest("hex")) {
                const token = jwt.sign( {_id, roles: permission}, process.env.JWT_SECRET );
                res.cookie('token', token, {maxAge: 900000} );
                const payload = {token, user: { _id, email, fullname, photo }}
                return res.status(200).json( {message: "Signin successfully", payload} );
            } else {
                return res.status(400).json( {message: "Username or password do not match"} )    
            }
        } else {
            return res.status(400).json( {message: "Username or password do not matchs"} )
        }
    });
}

module.exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
})

module.exports.isAdmin = (req, res, next) => {
    console.log(req.payload)
    req.payload && req.payload.roles === 7 ? next() : res.status(403).json( {message: 'Permission deny'} );
}
module.exports.yourAreAdmin = (req, res) => {
    return res.status(200).json( {message: 'admin'} );
}

module.exports.getSignout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json( {message: 'Signout success'} );   
}

// module.exports.postPrivileges = (req, res) => {
//     let { name, permission, description } = req.body;
//     Privileges.findOne({name, permission}, (err, pri) => {
//         if(!pri) {
//             let privileges = new Privileges({name, permission, description});
//             privileges.save( (err, result) => {
//                 if(err) return res.status(400).json( {message: 'Error occur'} )
//                 return res.status(200).json( {message: 'Done', payload: privileges} );
//             })
//         } else {
//             return res.status(400).json( {message: "Privilege name was exist"} );
//         }
//     })
    
// }

// module.exports.forgotPassword = (req, res) => {
//     let email = req.query.email;
//     User.findOne( {email}, "_id", (err, user) => {
//         if(err || !user) return res.json( {message: "Request sent"} );

//         // let newPassword = Math.random().toString(36).slice(-8);
//         let newPassword = "123456";
//         user.setPassword(newPassword);

//         user.save( (err, result) => {
//             if(err) return res.json( {message: "Error occur (set new password)"} );

//             // Send mail
//             let transporter = nodemailer.createTransport({
//                 service: 'gmail',
//                 auth: {
//                     user: process.env.user_mail,
//                     pass: process.env.pass_mail
//                 }
//             });

//             let bodyMail = '<p>Hello little girl, how the fuck you forgot your password?</p>'+
//                 '<p>Your fucking new password is <i>'+newPassword+'</i></p>';

//             let mailOptions = {
//                 from: 'Blackblue',
//                 to: email,
//                 subject: 'Reset your password',
//                 html: bodyMail
//             };

//             transporter.sendMail(mailOptions, function (error, info) {
//                 if (error) {
//                     console.log(error);
//                 } else {
                    
//                 }
//                 return res.json( {message: "Request sent"} );
//             });

            
//         })

//     })

// }