
module.exports.addslashes = (string) => {
    return string.replace(/\\/g, '\\\\').
        replace(/\u0008/g, '\\b').
        replace(/\t/g, '\\t').
        replace(/\n/g, '\\n').
        replace(/\f/g, '\\f').
        replace(/\r/g, '\\r').
        replace(/'/g, '\\\'').
        replace(/"/g, '\\"');
}



module.exports.getIdTag = (tag) => {
    return new Promise(resolve => {
        let insertedId = [];
        const { addslashes } = require("./helper");
        con.query(`SELECT CheckAndAddUnExistsTag('${addslashes(tag)}') AS insertedId`, (err, result) => {
            if(!err) insertedId.push(result[0].insertedId);
            resolve(insertedId);
        })
    })
}