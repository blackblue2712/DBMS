
let { addslashes } = require("../helper/helper");

module.exports.onSearchQuestions = (req, res) => {
    let { q } = req.query;
    let query = `SELECT id, title FROM questions WHERE title LIKE '%${addslashes(q)}%' LIMIT 5`;
    con.query(query, (err, questions) => {
        if(err) return res.status(400).json( {message: "Error occur (search questions)"} );
        return res.status(200).json( questions )
    })
}
