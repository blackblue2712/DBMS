const { addslashes } = require("../helper/helper");

module.exports.postAnnouncement = (req, res) => {
    /**
     * anonymous tag?
     * 1. Select all tags from database and check exist tag in client side (> 1000 tags?) 
     * 2. Check anonymous tags in server side 
     * 3. Check anonymous tags in server side. If exist -> add post with that tag
     *                                         If not -> Add a new tag with that name then add post with that tag
     **/ 

    const { title, body, isImportant, tagsnameArray, id } = req.body;
    let query = `INSERT INTO announcements 
                (title, body, isImportant, anonymousTags, owner) 
                VALUES ('${addslashes(title)}', '${addslashes(body)}', ${isImportant}, '${JSON.stringify(tagsnameArray)}', ${Number(id)})`;
    con.query(query, (err, result) => {
        if(err) return res.status(400).json( {message: "Error occur"} );
        return res.status(200).json( {message: "Done", payload: result} );
    })
}

module.exports.getAnnouncements = (req, res) => {
    let query = "SELECT * FROM announcements";
    con.query(query, (err, acms) => {
        if(err) return res.status(400).json( {message: "Error occur"} );
        return res.status(200).json( {message: `${acms.length} announcements loaded`, payload: acms});
    })
}

module.exports.requestRelatedAcmId = async (req, res, next, id) => {
    await Acm.findById(id, (err, acm) => {
        if(err || !acm) return res.status(400).json( {message: "Error occur 123"} );
        req.acmInfo = acm;
        next();
    });
}

module.exports.getSingleAcm = (req, res) => {
    return res.status(200).json(req.acmInfo);
}

module.exports.putEditAcm = (req, res) => {
    let { title, body, isImportant, tagsnameArray } = req.body;
    let acm = req.acmInfo;
    if(body) acm.body = body;
    acm.title = title;
    acm.isImportant = isImportant;
    acm.anonymousTags = tagsnameArray;
    
    acm.save( (err, result) => {
        if(err) return res.status(400).json( {message: "Error occur (edit acm)", status: 400} );
        return res.status(200).json( {message: "Done", status: 200, payload: result} );
    });
}

module.exports.deleteEditAcm = (req, res) => {
    let acm = req.acmInfo;
    acm.remove( (err, result) => {
        if(err) return res.status(400).json( {message: "Error occur (delete acm)"} );
        return res.status(200).json( {message: "Done"} );
    });
}