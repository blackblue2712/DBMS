
export const postAddTag = (tagInfo, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/tags/add`, {
        method: "POST",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(tagInfo)
    })
    .then( res => {
        return res.json();
    })
    .catch( error => {
        console.log("ERROR POST ADD TAG");
    })
}

export const getTags = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/tags`, {
        method: "GET",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
        }
    })
    .then( res => {
        return res.json();
    })
    .catch( error => {
        console.log("ERROR GET TAGS");
    })
}