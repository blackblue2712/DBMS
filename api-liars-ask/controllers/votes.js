
const Answer = require("../models/answers");

module.exports.voteUp = (req, res) => {
    let { userId } = req.body;
    let ans = req.ansInfo;
    let voted = ans.votes.split(" ");

    console.log(userId, ans.votes);
    if(voted.indexOf(String(userId)) === -1) {
        let query = `UPDATE answers SET votes = ('${String(ans.votes)} ${String(userId)}') WHERE id = ${Number(ans.id)}`;
        con.query(query, (err, result) => {
            if(err) return res.status(400).json( {message: "Error occur (vote up)" + err} );
            return res.status(200).json( {message: "Voted", votesLength: voted.length} );
        });
    } else {
        res.status(400).json( {message: "Error (voted)"} );
    }
}

module.exports.voteDown = (req, res) => {
    let { userId } = req.body;
    let ans = req.ansInfo;

    if(ans.votes.indexOf(userId) === -1) {
        ans.votes.push(userId);
        ans.save( (err, result) => {
            if(err) return res.status(400).json( {message: "Error occur (vote up)" + err} );
            return res.status(200).json( {message: "Voted", votesLength: ans.votes.length} );
        });
    } else {
        res.status(400).json( {message: "Error (voted)"} );
    }
}

module.exports.requestRelatedAnswerId = (req, res, next, id) => {
    let query = `SELECT votes, id FROM answers WHERE id = ${Number(id)}`;
    con.query(query, (err, ans) => {
        if(err) return res.status(400).json( {message: "Can't find answer"} );
        req.ansInfo = ans[0];
        next();
    })
}