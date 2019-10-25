
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

    let querySearch = `SELECT id, title, anonymousTags FROM ${String(addslashes(category))} WHERE title LIKE '%${addslashes(query)}%' AND created > '${addslashes(dateFrom)}' `;
    if(dateTo !== "") {
        querySearch += ` AND created < '${addslashes(dateTo)}'`;
    }

    con.query(querySearch, (err, result) => {
        if(err) return res.status(400).json( {message: "Error occur (search advance)"} );
        // let resHL = result.map( d => {
        //     return d.title.replace(query, "<b>"+query+"</b>");
        // })
        let resFilter = result;
        if(tags) {
            let arrTags = tags.split(" ");
            arrTags.map( tagCheck => {
                resFilter = result.filter( d => {
                    let HOLY_SHIT_I_HAVE_NO_IDEA_TO_NAME_THIS_VARIABLE = JSON.parse(d.anonymousTags);
                    return HOLY_SHIT_I_HAVE_NO_IDEA_TO_NAME_THIS_VARIABLE.indexOf(tagCheck) > -1;
                })
            })
        }
        
        return res.status(200).json( resFilter )
    })
}