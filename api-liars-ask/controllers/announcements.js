const { addslashes } = require("../helper/helper");
const nodemailer = require("nodemailer");

module.exports.postAnnouncement = (req, res, next) => {
    /**
     * anonymous tag?
     * 1. Select all tags from database and check exist tag in client side (> 1000 tags?) 
     * 2. Check anonymous tags in server side 
     * 3. Check anonymous tags in server side. If exist -> add post with that tag
     *                                         If not -> Add a new tag with that name then add post with that tag
     **/ 

    const { title, body, isImportant, tagsnameArray, id } = req.body;
    // let query = `INSERT INTO announcements 
    //             (title, body, isImportant, anonymousTags, owner) 
    //             VALUES ('${addslashes(title)}', '${addslashes(body)}', ${isImportant}, '${JSON.stringify(tagsnameArray)}', ${Number(id)})`;
    let query = `SELECT AddAnAnnouncement('${addslashes(title)}', '${addslashes(body)}', ${isImportant}, '${JSON.stringify(tagsnameArray)}', ${Number(id)}) AS insertedId`
    con.query(query, (err, result) => {
        console.log(err)
        console.log(result)
        if(err) return res.status(400).json( {message: "Error occur"} );
        req.acmId = result[0].insertedId;
        next();
    })
}

module.exports.getAnnouncements = (req, res) => {
    let query = "SELECT * FROM announcements ORDER BY created DESC";
    con.query(query, (err, acms) => {
        if(err) return res.status(400).json( {message: "Error occur"} );
        return res.status(200).json( {message: `${acms.length} announcements loaded`, payload: acms});
    })
}

module.exports.requestRelatedAcmId = async (req, res, next, id) => {
    let query = `SELECT * FROM announcements WHERE id = ${Number(id)}`;
    await con.query(query, (err, acm) => {
        if(err || !acm) return res.status(400).json( {message: "Error occur requesRelatedAcmId"} );
        req.acmInfo = acm[0];
        next();
    });
}

module.exports.getSingleAcm = (req, res) => {
    return res.status(200).json(req.acmInfo);
}

module.exports.putEditAcm = (req, res) => {
    let { title, body, isImportant, tagsnameArray } = req.body;
    let acm = req.acmInfo;
    let query = "";

    if(body) {
        query = `UPDATE announcements 
                SET title = '${addslashes(title)}', isImportant = ${Boolean(isImportant)},
                body = '${addslashes(body)}', anonymousTags = '${JSON.stringify(tagsnameArray)}'
                WHERE id = ${Number(acm.id)}`;
    } else {
        query = `UPDATE announcements 
                SET title = '${addslashes(title)}', isImportant = ${Boolean(isImportant)}, anonymousTags = '${JSON.stringify(tagsnameArray)}'
                WHERE id = ${Number(acm.id)}`;
    }
    con.query(query, (err, result) => {
        if(err) return res.status(400).json( {message: "Error occur (edit acm)", status: 400} );
        return res.status(200).json( {message: "Done", status: 200, payload: result} );
    });
}

module.exports.deleteEditAcm = (req, res) => {
    let acm = req.acmInfo;
    let query = `DELETE FROM announcements WHERE id = ${acm.id}`;
    con.query(query, (err, result) => {
        if(err) return res.status(400).json( {message: "Error occur (delete acm)"} );
        return res.status(200).json( {message: "Done"} );
    })
}

module.exports.sendMailAfterPostAnnouncement = (req, res) => {
    // let email = req.query.email;
    let mailList = [
        'danghuunghia2712@gmail.com',
        'nghiab1706729@student.ctu.edu.vn'
    ];
    
    // Send mail
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.user_mail,
            pass: process.env.pass_mail
        }
    });

    let link = process.env.CLIENT_URL + "/announcements/" + req.acmId;
    let bodyMail = '<p>Hello little girl, new announcement added and u\'re should check it now</p>'+
        '<p>Here is the link<a href='+ link +'>'+link+'</a></p>';

    let mailOptions = {
        from: 'Blackblue',
        to: mailList,
        subject: 'New announcement',
        html: bodyMail
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            
        }
        return res.json( {message: "Request sent"} );
    });

}