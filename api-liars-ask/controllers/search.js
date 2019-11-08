
let { addslashes } = require("../helper/helper");

module.exports.onSearchQuestions = (req, res) => {
    let { q } = req.query;
    let query = `SELECT id, title FROM questions WHERE title LIKE '%${addslashes(q)}%' LIMIT 5`;
    con.query(query, (err, questions) => {
        if(err) return res.status(400).json( {message: "Error occur (search questions)"} );
        return res.status(200).json( questions )
    })
}

module.exports.onAdvanceSerach = (req, res) => {
    let { category, tags, query, dateFrom, dateTo } = req.body;
    dateTo = dateTo === "" ? new Date().toJSON() : dateTo;
    let querySearch = "";
    let tagsString = tags.split(" ").map( tag => {
        return `"${tag}"`;
    })
    switch (category) {
        case "blogs":
            querySearch = `CALL AdvanceSearchBlogs('%${query}%', '${tags.split(" ").join(",")}', '${dateFrom}', '${dateTo}')`;
            break;
        case "questions":
            querySearch = `CALL AdvanceSearchQuestions('%${query}%', '${tags.split(" ").join(",")}', '${dateFrom}', '${dateTo}')`;
            break;
        case "announcements":
            querySearch = `CALL AdvanceSearchAnnouncements('%${query}%', '${tags.split(" ").join(",")}', '${dateFrom}', '${dateTo}')`;
            break;
        default:
            break;
    }

    console.log(querySearch)
    
    con.query(querySearch, (err, result) => {
        console.log(result)
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
        
        return res.status(200).json( result[0] )
    })
}