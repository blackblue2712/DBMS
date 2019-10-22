const Blog = require("../models/blogs");

module.exports.postWriteBlog = (req, res) => {
    console.log(req.body);
    let { title, body, tagsnameArray, owner } = req.body;
    let query = `INSERT INTO blogs (title, body, anonymousTags, owner) VALUES ('${title}', '${body}', '${JSON.stringify(tagsnameArray)}', '${owner}')`;
    con.query(query, (err, result) => {
        if(err) return res.status(400).json( {message: "Error occur (wirte blog)"} );
        return res.status(200).json( {message: "Done"} )
    });
}

module.exports.getBlogs = (req, res) => {
    // Missing limit query in req.query.limit;
    let query = "SELECT id, title, owner FROM blogs";
    con.query(query, (err, blogs) => {
        if(err) return res.status(400).json( {message: "Error occur (get blogs) " + err} );
        return res.status(200).json( blogs );
    })
}
module.exports.getAllBlogs = (req, res) => {
    let query = "SELECT id, title, owner FROM blogs";
    con.query(query, (err, blogs) => {
        if(err) return res.status(400).json( {message: "Error occur (get all blogs) " + err} );
        return res.status(200).json( blogs );
    });
}
module.exports.getYourBlogs = (req, res) => {
    Blog.find({owner: req.query.userId}, "title _id", (err, blogs) => {
        if(err) return res.status(400).json( {message: "Error occur (get your blogs) " + err} );
        return res.status(200).json( blogs );
    })
}

module.exports.requestRelatedBlogId = async (req, res, next, id) => {
    await Blog.findById(id, (err, blog) => {
        if(err) return res.status(400).json( {message: "Error occur (get single blog)"} );
        req.blogInfo = blog;
    });
    next();
}

module.exports.getSingleBlog = (req, res) => {
    return res.status(200).json(req.blogInfo);
}

module.exports.putEditBlog = (req, res) => {
    let blog = req.blogInfo;
    let { title, body, tagsnameArray } = req.body;
    if(body) blog.body = body;
    blog.title = title;
    blog.anonymousTags = tagsnameArray;

    blog.save( (err, result) => {
        if(err) return res.status(400).json( {message: "Error occur (edit blog)"} )
        return res.status(200).json( {message: "Done"} );
    })
}