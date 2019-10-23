const { addslashes } = require("../helper/helper");
module.exports.postWriteBlog = (req, res) => {
    let { title, body, tagsnameArray, owner } = req.body;
    let query = `INSERT INTO blogs (title, body, anonymousTags, owner) VALUES ('${addslashes(title)}', '${addslashes(body)}', '${JSON.stringify(tagsnameArray)}', '${owner}')`;
    con.query(query, (err, result) => {
        if(err) return res.status(400).json( {message: "Error occur (wirte blog)"} );
        return res.status(200).json( {message: "Done"} )
    });
}

module.exports.getBlogs = (req, res) => {
    // Missing limit query in req.query.limit;
    let query = "SELECT * FROM blogs";
    con.query(query, (err, blogs) => {
        if(err) return res.status(400).json( {message: "Error occur (get blogs) " + err} );
        return res.status(200).json( blogs );
    })
}
module.exports.getAllBlogs = (req, res) => {
    let query = "SELECT * FROM blogs";
    con.query(query, (err, blogs) => {
        if(err) return res.status(400).json( {message: "Error occur (get all blogs) " + err} );
        return res.status(200).json( blogs );
    });
}

module.exports.getYourBlogs = (req, res) => {
    let userId = req.query.userId;
    let query = `SELECT id, title FROM blogs WHERE owner = ${userId}`;
    con.query(query, (err, blogs) => {
        if(err) return res.status(400).json( {message: "Error occur (get your blogs) " + err} );
        return res.status(200).json( blogs );
    })
}

module.exports.requestRelatedBlogId = async (req, res, next, id) => {
    let query = `SELECT * FROM blogs WHERE id = ${id}`;
    con.query(query, (err, blog) => {
        if(err) return res.status(400).json( {message: "Error occur (get single blog)"} );
        req.blogInfo = blog[0];
        next();
    })
}

module.exports.getSingleBlog = (req, res) => {
    return res.status(200).json(req.blogInfo);
}

module.exports.putEditBlog = (req, res) => {
    let blog = req.blogInfo;
    let { title, body, tagsnameArray } = req.body;
    let query = "";
    
    if(body) {
        query = `UPDATE blogs SET title = '${addslashes(title)}', anonymousTags = '${JSON.stringify(tagsnameArray)}', body = '${addslashes(body)}' WHERE id = ${blog.id}`;
    } else {
        query = `UPDATE blogs SET title = '${addslashes(title)}', anonymousTags = '${JSON.stringify(tagsnameArray)}' WHERE id = ${blog.id}`;
    }

    con.query(query, (err, result) => {
        if(err) return res.status(400).json( {message: "Error occur (edit blog)"} )
        return res.status(200).json( {message: "Done"} );
    })
}

module.exports.deleteBlog = (req, res) => {
    let query = `DELETE FROM blogs WHERE id = ${req.query.id}`;
    con.query(query, (err, result) => {
        if(err) return res.status(400).json( {message: "Error occur (delete blog)"} )
        return res.status(200).json( {message: "Done"} );
    });
}