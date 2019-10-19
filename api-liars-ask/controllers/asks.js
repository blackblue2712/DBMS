const { addslashes } = require("../helper/helper");


module.exports.postAsk = (req, res) => {
    let { title, body, tagsnameArray, owner } = req.body;
    
    let query = `INSERT INTO questions (title, body, anonymousTags, owner) VALUES ('${addslashes(title)}', '${addslashes(body)}', '${JSON.stringify(tagsnameArray)}', ${owner})`;
    con.query(query, (err, result) => {
        if(err) return res.status(400).json( {message: "Error occur (ask question)"} );
        return res.status(200).json( {message: "Done"} )
    });
}

module.exports.getQuestions = (req, res) => {
    let query = "SELECT * FROM questions ORDER BY created DESC";
    con.query(query, (err, ques ) => {
        if(err) return res.status(400).json( {message: "Error occur (get questions)"} );
        return res.status(200).json( {message: `${ques.length} questions loaded`, payload: ques} );
    })
}

// module.exports.getYourQuestions = (req, res) => {
//     Ques.find({owner: req.query.userId}, "title _id", (err, ques) => {
        
//         if(err) return res.status(400).json( {message: "Error occur"} );
//         return res.status(200).json(ques);
//     })
// }


module.exports.requestRelatedQuestionId = (req, res, next, id) => {
    let query = `SELECT * FROM questions WHERE id = ${id}`;
    con.query(query, (err, ques) => {
        if(err || !ques) return res.status(200).json( {message: "Error occur (get single question)"} );
        req.quesInfo = ques[0];
        next();
    })
}

module.exports.getSigleQuestion = (req, res) => {
    
    if(req.quesInfo.answers !== null) {
        console.log(req.quesInfo.answers)
        let ids = JSON.parse(req.quesInfo.answers).filter( i => i !== null).join(",");
        let query = `SELECT * FROM answers WHERE id IN (${ids})`;
        con.query(query, (err, ans) => {
            req.quesInfo.answers = ans;
            // if(err || !ans) return res.status(200).json( {message: "Error occur (get single question)"} );
            // let query = `SELECT id, photo, email, fullname FROM users WHERE id = ${ids}`;
            return res.status(200).json(req.quesInfo);
        })
    } else {
        return res.status(200).json(req.quesInfo);
    }
}

module.exports.postAnswer = (req, res, next) => {
    let { body, userId, email, fullname, photo } = req.body;
    fullname = fullname === null ? " " : fullname;
    let query = `INSERT INTO answers (body, owner, email, photo, fullname) VALUES('${addslashes(body)}', ${userId}, '${addslashes(email)}', '${addslashes(photo)}', '${addslashes(fullname)}')`;
    console.log(query)
    con.query(query, (err, result, fields) => {
        console.log(err)
        if(err) return res.status(400).json( {message: "Error occur (add answer)"} );
        req.answerId = result.insertId;
        next();
    })
}

module.exports.updateQuestionAfterPostAnswer = (req, res) => {
    let { quesId } = req.body;

    let querySelect = `SELECT answers FROM questions WHERE id=${quesId}`;
    con.query(querySelect, (err, result) => {
        if(err) return res.status(400).json( {message: "Error occur (select answers)"} );
        let answered = [];
        if(result[0].answers !== null) {
            answered = JSON.parse(result[0].answers);
        }
        answered.push(req.answerId);

        let queryUpdate = `UPDATE questions SET answers = '${JSON.stringify(answered)}' WHERE id = ${quesId}`;
        con.query(queryUpdate, (err, result) => {
            if(err) return res.status(400).json( {message: "Error occur (push answer)"} );
            return res.status(200).json( {message: "Your answer added"} );
        })

    })
}

// module.exports.putUpdateQuestion = (req, res) => {
//     let ques = req.quesInfo;
//     let { title, body, tagsnameArray } = req.body;
//     if(body) ques.body = body;
//     ques.title = title;
//     ques.anonymousTags = tagsnameArray;

//     ques.save( (err, result) => {
//         if(err) return res.status(400).json( {message: "Error occur (edit ques)"} )
//         return res.status(200).json( {message: "Done"} );
//     });
// }

// module.exports.getAnswers = (req, res) => {

// }