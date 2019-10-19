
export const voteAnswerUp = (ansId, userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/votes/answer/voteUp/${ansId}`, {
        method: "POST",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId})
    })
    .then( res => {
        return res.json();
    })
    .catch( err => {
        return {message: "ERROR VOTE ANSWER UP"}
    });
}


export const voteAnswerDown = (ansId, userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/votes/answer/voteDown/${ansId}`, {
        method: "POST",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId})
    })
    .then( res => {
        return res.json();
    })
    .catch( err => {
        return {message: "ERROR VOTE ANSWER DOWN"}
    });
}
