export const onSearchQuestions = (plainText) => {
    return fetch(`${process.env.REACT_APP_API_URL}/search?q=${plainText}`, {
        method: "GET",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json"
        }
    })
    .then( res => {
        return res.json();
    })
    .catch( err => {
        return {message: "ERROR SEARCH QUESTIONS"}
    })
}
