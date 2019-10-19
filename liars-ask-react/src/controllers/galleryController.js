
export const postUploadImage = (img, userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/users/images-gallery/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "Application/json",
            Authorization: `Bearer ${token}`
        },
        body: img
    })
    .then( res => {
        return res.json();
    })
    .catch( err => {
        return { message: "ERROR POST UPLOAD IMAGE" };
    });
}

export const getUploadImages = (userId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/users/images-gallery/${userId}`, {
        method: "GET",
        headers: {
            Accept: "Application/json",
            "Content-Type": 'Application/json'
        }
    })
    .then( res => {
        return res.json();
    })
    .catch( err => {
        return { message: "ERROR GET UPLOAD IMAGES" };
    });
}

export const putDeleteUploadedImage = (userId, imgInfo, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/users/images-gallery/delete/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "Application/json",
            "Content-Type": 'Application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(imgInfo)
    })
    .then( res => {
        return res.json();
    })
    .catch( err => {
        return { message: "ERROR PUT DELETE UPLOADED IMAGE" };
    });
}