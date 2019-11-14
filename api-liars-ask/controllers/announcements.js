const { addslashes, getIdTag } = require("../helper/helper");
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

    let insertedId = [];
        Promise.all(
            tagsnameArray.map( async tag => {
                let data = await getIdTag(tag);
                insertedId = [...insertedId, ...data];
            })
        ).then( () => {
            let query = `SELECT AddAnAnnouncementAfterAddTags('${addslashes(title)}', '${addslashes(body)}', ${isImportant}, ${Number(id)}) AS insertedAcmId`;
            con.query(query, (err, acm) => {
                req.acmId = acm[0].insertedAcmId;
                let insertedAcmId = acm[0].insertedAcmId;
                let subQuery = ""
                insertedId.map( (tag, i) => {
                    subQuery += `('announcements', '${tag}', '${insertedAcmId}'), `;
                });
                subQuery = subQuery.substr(0, subQuery.length -2);
                let queryInsertTagsRelationShips = `INSERT INTO tags_relationships (type, tagId, typeId) VALUES ${subQuery}`;
                con.query(queryInsertTagsRelationShips, (err, result) => {
                    if(err) return res.status(400).json( {message: "Error occur (write announcement)"} );
                    next();
                });
            })
        })
}

module.exports.getAnnouncements = (req, res) => {
    let query = "CALL getAnnouncements()";
    con.query(query, (err, acms) => {
        if(err) return res.status(400).json( {message: "Error occur"} );
        return res.status(200).json( {message: `${acms[0].length} announcements loaded`, payload: acms[0], tags: acms[1]});
    })
}

module.exports.requestRelatedAcmId = async (req, res, next, id) => {
    let query = `CALL requestRelatedAcmId(${Number(id)})`;
    await con.query(query, (err, acm) => {
        if(err || !acm) return res.status(400).json( {message: "Error occur requesRelatedAcmId"} );
        req.acmInfo = acm[0][0];
        req.acmInfo.acmTags = acm[1];
        next();
    });
}

module.exports.getSingleAcm = (req, res) => {
    return res.status(200).json(req.acmInfo);
}

module.exports.putEditAcm = (req, res) => {
    let { title, body, isImportant, tagsnameArray } = req.body;
    let acm = req.acmInfo;

    let insertedId = []
    
    // 
    Promise.all(
        tagsnameArray.map( async tag => {
            let data = await getIdTag(tag);
            insertedId = [...insertedId, ...data]
        })
    ).then( () => {
        let tagsRelationshipsNeedToDelete = [];
        let tagsRelationshipsExists = [];
        acm.acmTags.filter( tag => {
            if(tagsnameArray.indexOf(tag.tagName) === -1) {
                tagsRelationshipsNeedToDelete.push(tag.id);
            } else {
                tagsRelationshipsExists.push(tag.tagId);
            }
        })
        let tagsRelationshipsNeedToInsert = insertedId.filter( tag => {
            return tagsRelationshipsExists.indexOf(tag) === -1;
        })
        console.log(tagsRelationshipsNeedToDelete);
        console.log(tagsRelationshipsExists);
        console.log(tagsRelationshipsNeedToInsert);
        let subQuery = ""
        tagsRelationshipsNeedToInsert.map( tag => {
            subQuery += `('announcements', '${tag}', '${acm.id}'), `;
        });
        subQuery = subQuery.substr(0, subQuery.length -2);


        let query = "";
    
        if(body) {
            query = `CALL updateAcm('${addslashes(title)}', '${addslashes(body)}', ${Boolean(isImportant)}, ${Number(acm.id)})`;
        } else {
            query = `CALL updateAcm('${addslashes(title)}', '', ${Boolean(isImportant)}, ${Number(acm.id)})`;
        }
    
        con.query(query, (err, result) => {
            if(err) return res.status(400).json( {message: "Error occur (edit acm)"} )
            else {
                if(tagsRelationshipsNeedToInsert.length > 0) {
                    let queryInsertTagsRelationShips = `INSERT INTO tags_relationships (type, tagId, typeId) VALUES ${subQuery}`;
                    console.log(queryInsertTagsRelationShips)
                    con.query(queryInsertTagsRelationShips, (err, result) => {

                    });
                }
                if(tagsRelationshipsNeedToDelete.length > 0) {
                    let queryDeleteTagsRelationShips = `DELETE FROM tags_relationships WHERE id IN (${tagsRelationshipsNeedToDelete.join(",")})`;
                    con.query(queryDeleteTagsRelationShips, (err, result) => {

                    });
                }
                return res.status(200).json( {message: "Done"} );
            }
        })
    })
}

module.exports.deleteEditAcm = (req, res) => {
    let acm = req.acmInfo;
    let query = `CALL deleteAnnouncement(${Number(acm.id)})`;
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
    let bodyMail = '<p>Hello little girl, new announcement was added so u\'re should check it now</p>'+
        '<p>Here is the link <a href='+ link +'>'+link+'</a></p>';

    let mailOptions = {
        from: 'Liars-ask',
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