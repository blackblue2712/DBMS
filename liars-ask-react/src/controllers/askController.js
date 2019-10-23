
export const postAsk = (askInfo, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/asks/new`, {
        method: "POST",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(askInfo)
    })
    .then( res => {
        return res.json();
    })
    .catch( err => {
        return {message: "ERROR POST ASK"}
    });
}

export const getQuestions = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/asks/questions`, {
        method: "GET",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json"
        },
    })
    .then( res => {
        return res.json();
    })
    .catch( err => {
        return {message: "ERROR GET QUESTIONS"}
    });
}

export const getSingleQuestion = (id) => {
    return fetch(`${process.env.REACT_APP_API_URL}/asks/questions/${id}`, {
        method: "GET",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json"
        },
    })
    .then( res => {
        return res.json();
    })
    .catch( err => {
        return {message: "ERROR GET SINGLE QUESTION"}
    });
}

export const getYourQuestions = (userId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/asks/your-questions?userId=${Number(userId)}`, {
        method: "GET",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json"
        },
    })
    .then( res => {
        return res.json();
    })
    .catch( err => {
        return {message: "ERROR GET YOUR QUESTIONS " + err}
    });
}



export const postAnswer = (answerInfo, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/asks/answer/new`, {
        method: "POST",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(answerInfo)
    })
    .then( res => {
        return res.json();
    })
    .catch( error => {
        return {message: "ERROR POST ANSWER"}
    });
}

export const getAnswers = (quesId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/asks/answers/${quesId}`, {
        method: "GET",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json"
        },
    })
    .then( res => {
        return res.json();
    })
    .catch( err => {
        return {message: "ERROR GET ANSWERS"}
    });
}

export const putEditQuestion = (quesInfo, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/asks/questions/edit/${quesInfo.id}`, {
        method: "PUT",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(quesInfo)
    })
    .then( res => {
        return res.json();
    })
    .catch( err => {
        return {message: "ERROR PUT UPDATE"}
    });
}

export const deleteQuestion = (quesId, token) => {
    console.log(quesId, token)
    return fetch(`${process.env.REACT_APP_API_URL}/asks/delete?id=${Number(quesId)}`, {
        method: "DELETE",
        headers: {
            Accept: "Application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then( res => {
        return res.json();
    })
    .catch( err => {
        return { message: "ERROR DELETE QUESTION" }
    })
}