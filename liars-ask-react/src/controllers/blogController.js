
export const postWriteBlog = (blogInfo, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/blogs/write`, {
        method: "POST",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(blogInfo)
    })
    .then( res => {
        return res.json();
    })
    .catch( err => {
        return {message: "ERROR POST WRITE BLOG"}
    });
}

export const getBlogs = (number = 5) => {
    return fetch(`${process.env.REACT_APP_API_URL}/blogs?limit=${number}`, {
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
        return {message: "ERROR GET BLOGS"}
    })
}

export const getAllBlogs = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/blogs/all`, {
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
        return {message: "ERROR GET ALL BLOGS"}
    })
}

export const getYourBlogs = (userId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/blogs/your-blogs?userId=${userId}`, {
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
        return {message: "ERROR GET YOUR BLOGS"}
    })
}


export const getSingleBlog = (id) => {
    return fetch(`${process.env.REACT_APP_API_URL}/blogs/${id}`, {
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
        return {message: "ERROR GET SINGLE BLOG"}
    })
}

export const putEditBlog = (blogInfo, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/blogs/edit/${blogInfo.id}`, {
        method: "PUT",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(blogInfo)
    })
    .then( res => {
        return res.json();
    })
    .catch( err => {
        return {message: "ERROR EDIT BLOG"}
    })
}