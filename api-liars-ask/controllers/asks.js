const { addslashes } = require("../helper/helper");


module.exports.postAsk = async (req, res) => {
    let { title, body, tagsnameArray, owner } = req.body;
    let insertedId = [];
    let getIdTag = (tag) => {
        return new Promise(resolve => {
            con.query(`SELECT CheckAndAddUnExistsTag('${tag}') AS insertedId`, (err, result) => {
                if(!err) insertedId.push(result[0].insertedId);
                resolve();
            })
        })
    }
    
    Promise.all(
        tagsnameArray.map( async tag => {
            await getIdTag(tag)
        })
    ).then( () => {
        console.log(1, insertedId)
        let query = `SELECT AddAQuestionAfterAddTags('${addslashes(title)}', '${addslashes(body)}', '${JSON.stringify(tagsnameArray)}', ${Number(owner)}) AS insertedQuestionId`;
        console.log(2, query)
        con.query(query, (err, ques) => {
            let insertedQuestionId = ques[0].insertedQuestionId;
            console.log(3, ques[0])
            let subQuery = ""
            insertedId.map( (tag, i) => {
                subQuery += `('questions', '${tag}', '${insertedQuestionId}'), `;
            });
            subQuery = subQuery.substr(0, subQuery.length -2);
            let queryInsertTagsRelationShips = `INSERT INTO tags_relationships (type, tagId, typeId) VALUES ${subQuery}`;
            console.log(4, queryInsertTagsRelationShips)
            con.query(queryInsertTagsRelationShips, (err, result) => {
                if(err) return res.status(400).json( {message: "Error occur (ask question)"} );
                return res.status(200).json( {message: "Done"} )
            });
        })
    })
}

module.exports.getQuestions = (req, res) => {
    // var os = require( 'os' );
    // var networkInterfaces = os.networkInterfaces( );
    // console.log( networkInterfaces );


    let query = "CALL getQuestions()";
    con.query(query, (err, ques ) => {
        if(err) return res.status(400).json( {message: "Error occur (get questions)"} );
        return res.status(200).json( {message: `${ques[0].length} questions loaded`, payload: ques[0]} );
    })
}

module.exports.getYourQuestions = (req, res) => {
    let query = `CALL getYourQuestions(${req.query.userId})`;
    con.query(query, (err, ques) => {
        if(err) return res.status(400).json( {message: "Error occur"} );
        return res.status(200).json(ques[0]);
    })
}


module.exports.requestRelatedQuestionId = (req, res, next, id) => {
    let query = `CALL requestRelatedQuestionId(${Number(id)})`;
    con.query(query, (err, ques) => {
        if(err || !ques) return res.status(200).json( {message: "Error occur (get single question)"} );
        req.quesInfo = ques[0][0];
        next();
    })
}

module.exports.getSigleQuestion = (req, res) => {
    
    if(req.quesInfo.answers !== null) {
        console.log(req.quesInfo.answers)
        let ids = JSON.parse(req.quesInfo.answers).filter( i => i !== null).join(",");
        let query = `SELECT answers.id, body, owner, votes, created, users.email, users.fullname, users.photo FROM answers, users WHERE answers.owner = users.id AND answers.id IN (${ids})`;
        console.log(query)
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
    let query = `SELECT AddAnAnswer ('${addslashes(body)}', ${Number(userId)}, '${addslashes(email)}', '${addslashes(photo)}', '${addslashes(fullname)}') AS insertedId`
    con.query(query, (err, result, fields) => {
        if(err) return res.status(400).json( {message: "Error occur (add answer)"} );
        req.answerId = result[0].insertedId;
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

module.exports.putUpdateQuestion = (req, res) => {
    let ques = req.quesInfo;
    let { title, body, tagsnameArray } = req.body;
    let query = "";
    
    if(body) {
        query = `UPDATE questions SET title = '${addslashes(title)}', anonymousTags = '${JSON.stringify(tagsnameArray)}', body = '${addslashes(body)}' WHERE id = ${ques.id}`;
    } else {
        query = `UPDATE questions SET title = '${addslashes(title)}', anonymousTags = '${JSON.stringify(tagsnameArray)}' WHERE id = ${ques.id}`;
    }

    con.query(query, (err, result) => {
        if(err) return res.status(400).json( {message: "Error occur (edit blog)"} )
        return res.status(200).json( {message: "Done"} );
    })
}

module.exports.getAnswers = (req, res) => {

}

module.exports.deleteQuestion = (req, res) => {
    let id = req.query.id;
    let query = `CALL deleteQuestion(${Number(id)})`;
    con.query(query, (err, result) => {
        if(err) return res.status(400).json( {message: "Error occur (delete ques)"} )
        return res.status(200).json( {message: "Done"} );
    });
}

module.exports.deleteAnswersRelatedQuestion = (req, res, next) => {
    let idQues = req.query.id;
    let query = `SELECT answers FROM questions WHERE id = ${Number(idQues)}`;
    con.query(query, (err, result) => {
        if(err) return res.status(400).json( {message: "Error occur (select ans to delete)"} )
        if(result[0].answers) {
            let answer = JSON.parse(result[0].answers);
            let queryDelete = `DELETE FROM answers WHERE id IN (${answer.join(",")})`;
            con.query(queryDelete, (err, result) => {
                if(err) return res.status(400).json( {message: "Error occur (delete ans)"} )
                next();
            })
        } else {
            next();
        }
    });
}