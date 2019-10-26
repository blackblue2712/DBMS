const { addslashes } = require("../helper/helper");

module.exports.postAddTag = (req, res) => {
    let { name, description } = req.body;
    if(!description) description = "";
    let querySelect = `SELECT id FROM tags WHERE name='${addslashes(name)}'`;
    con.query(querySelect, (err, result) => {
        if(err || result.length > 0) return res.status(400).json( {message: "Tags name was exists"} );

        let query = `INSERT INTO tags (name, description) VALUES ('${addslashes(name)}', '${addslashes(description)}')`
        con.query(query, (err, result) => {
            console.log(err)
            if(err) return res.status(400).json( {message: "Error occur"} );
            return res.status(200).json( {message: 'Done'} );
        })
    })
    
}

module.exports.getTags = (req, res) => {
    let query = "SELECT * FROM tags";
    con.query(query, (err, tags) => {
        if(err) return res.status(400).json( {message: "Error occur"} );
        return res.status(200).json( {tags} );
    })
}