const { addslashes, getIdTag } = require("../helper/helper");


module.exports.postAsk = async (req, res) => {
    let { title, body, tagsnameArray, owner } = req.body;
    let insertedId = [];
    
    Promise.all(
        tagsnameArray.map( async tag => {
            let data = await getIdTag(tag);
            insertedId = [...insertedId, ...data];
        })
    ).then( () => {
        let query = `SELECT AddAQuestionAfterAddTags('${addslashes(title)}', '${addslashes(body)}', ${Number(owner)}) AS insertedQuestionId`;
        con.query(query, (err, ques) => {
            let insertedQuestionId = ques[0].insertedQuestionId;
            let subQuery = ""
            insertedId.map( (tag, i) => {
                subQuery += `('questions', '${tag}', '${insertedQuestionId}'), `;
            });
            subQuery = subQuery.substr(0, subQuery.length -2);
            let queryInsertTagsRelationShips = `INSERT INTO tags_relationships (type, tagId, typeId) VALUES ${subQuery}`;
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
        return res.status(200).json( {message: `${ques[0].length} questions loaded`, payload: ques[0], tags: ques[1]} );
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
        req.quesInfo.quesTags = ques[1];
        next();
    })
}

module.exports.getSigleQuestion = (req, res) => {
    if(req.quesInfo.answers !== null) {
        let ids = JSON.parse(req.quesInfo.answers).filter( i => i !== null).join(",");
        let query = `SELECT answers.id, body, owner, votes, created, users.email, users.fullname, users.photo FROM answers, users WHERE answers.owner = users.id AND answers.id IN (${ids})`;
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
        ques.quesTags.filter( tag => {
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
            subQuery += `('questions', '${tag}', '${ques.id}'), `;
        });
        subQuery = subQuery.substr(0, subQuery.length -2);


        let query = "";
    
        if(body) {
            query = `UPDATE questions SET title = '${addslashes(title)}', body = '${addslashes(body)}' WHERE id = ${ques.id}`;
        } else {
            query = `UPDATE questions SET title = '${addslashes(title)}' WHERE id = ${ques.id}`;
        }
    
        con.query(query, (err, result) => {
            if(err) return res.status(400).json( {message: "Error occur (edit blog)"} )
            else {
                if(tagsRelationshipsNeedToInsert.length > 0) {
                    let queryInsertTagsRelationShips = `INSERT INTO tags_relationships (type, tagId, typeId) VALUES ${subQuery}`;
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