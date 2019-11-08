const { addslashes, getIdTag } = require("../helper/helper");

module.exports.postWriteBlog = (req, res) => {
    let { title, body, tagsnameArray, owner } = req.body;

    let insertedId = [];
        Promise.all(
            tagsnameArray.map( async tag => {
                let data = await getIdTag(tag);
                insertedId = [...insertedId, ...data];
            })
        ).then( () => {
            console.log(insertedId);
            let query = `SELECT AddABlogAfterAddTags('${addslashes(title)}', '${addslashes(body)}', ${Number(owner)}) AS insertedBlogId`;
            con.query(query, (err, blog) => {
                let insertedBlogId = blog[0].insertedBlogId;
                let subQuery = ""
                insertedId.map( (tag, i) => {
                    subQuery += `('blogs', '${tag}', '${insertedBlogId}'), `;
                });
                subQuery = subQuery.substr(0, subQuery.length -2);
                let queryInsertTagsRelationShips = `INSERT INTO tags_relationships (type, tagId, typeId) VALUES ${subQuery}`;
                con.query(queryInsertTagsRelationShips, (err, result) => {
                    if(err) return res.status(400).json( {message: "Error occur (write blog)"} );
                    return res.status(200).json( {message: "Done"} )
                });
            })
        })

    /**
     * 
     *
        
     */
}

module.exports.getBlogs = (req, res) => {
    // Missing limit query in req.query.limit;
    let query = "CALL getBlogs()";
    con.query(query, (err, blogs) => {
        if(err) return res.status(400).json( {message: "Error occur (get blogs) " + err} );
        return res.status(200).json( blogs );
    })
}
module.exports.getAllBlogs = (req, res) => {
    let query = "CALL getBlogs()";
    con.query(query, (err, blogs) => {
        if(err) return res.status(400).json( {message: "Error occur (get all blogs) " + err} );
        return res.status(200).json( { payload: blogs[0], tags: blogs[1] } );
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
    let query = `CALL requestRelatedBlogId(${Number(id)})`;
    con.query(query, (err, blog) => {
        if(err) return res.status(400).json( {message: "Error occur (get single blog)"} );
        req.blogInfo = blog[0][0];
        req.blogInfo.blogTags = blog[1];
        next();
    })
}

module.exports.getSingleBlog = (req, res) => {
    return res.status(200).json(req.blogInfo);
}

module.exports.putEditBlog = (req, res) => {
    let blog = req.blogInfo;
    let { title, body, tagsnameArray } = req.body;
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
        blog.blogTags.filter( tag => {
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
            subQuery += `('blogs', '${tag}', '${blog.id}'), `;
        });
        subQuery = subQuery.substr(0, subQuery.length -2);


        let query = "";
    
        if(body) {
            query = `UPDATE blogs SET title = '${addslashes(title)}', body = '${addslashes(body)}' WHERE id = ${blog.id}`;
        } else {
            query = `UPDATE blogs SET title = '${addslashes(title)}' WHERE id = ${blog.id}`;
        }
    
        con.query(query, (err, result) => {
            if(err) return res.status(400).json( {message: "Error occur (edit blog)"} )
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

module.exports.deleteBlog = (req, res) => {
    let query = `CALL deleteBlog(${Number(req.query.id)})`;
    con.query(query, (err, result) => {
        if(err) return res.status(400).json( {message: "Error occur (delete blog)"} )
        return res.status(200).json( {message: "Done"} );
    });
}