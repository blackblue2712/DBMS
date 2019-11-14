
let { addslashes } = require("../helper/helper");

module.exports.onSearchQuestions = (req, res) => {
    let { q } = req.query;
    let query = `SELECT id, title FROM questions WHERE title LIKE '%${addslashes(q)}%' LIMIT 5`;
    console.log(query)
    con.query(query, (err, questions) => {
        console.log(questions)
        if(err) return res.status(400).json( {message: "Error occur (search questions)"} );
        return res.status(200).json( questions )
    })
}

module.exports.onAdvanceSerach = (req, res) => {
    let { category, tags, query, dateFrom, dateTo } = req.body;
    dateTo = dateTo === "" ? new Date().toJSON() : dateTo;
    let querySearch = "";
    let tagsString = tags.trim().split(" ").map( tag => {
        return `"${tag}"`;
    });

    console.log(tagsString)

    querySearch = `
        SELECT DISTINCT cate.id, cate.title
        FROM ${category} AS cate, tags_relationships
        WHERE cate.id = tags_relationships.typeId
        AND cate.title LIKE '%${query}%'
        AND cate.created BETWEEN '${dateFrom === "" ? "''" : dateFrom}' AND '${dateTo}'
        AND tags_relationships.type = "${category}"
        ${
            tagsString.join(",").length > 2 ?
            `
                AND tags_relationships.tagId IN (
                    SELECT DISTINCT tags.id
                    FROM ${category} AS cate, tags_relationships, tags
                    WHERE tags.id = tags_relationships.tagId
                    AND cate.id = tags_relationships.typeId
                    AND tags_relationships.type = "${category}"
                    AND tags.name IN (${tagsString})
                );
            `
            : ""
        }
        
    `

    console.log(querySearch)

    
    con.query(querySearch, (err, result) => {
        if(err) return res.status(400).json( {message: "Error occur (search advance)"} );
        // let resFilter = result;
        // if(tags) {
        //     let arrTags = tags.split(" ");
        //     arrTags.map( tagCheck => {
        //         resFilter = result.filter( d => {
        //             let HOLY_SHIT_I_HAVE_NO_IDEA_TO_NAME_THIS_VARIABLE = JSON.parse(d.anonymousTags);
        //             return HOLY_SHIT_I_HAVE_NO_IDEA_TO_NAME_THIS_VARIABLE.indexOf(tagCheck) > -1;
        //         })
        //     })
        // }
        
        return res.status(200).json( result )
    })
}