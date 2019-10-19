
export const postSignup = (userInfo) => {
    return fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
        method: "POST",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(userInfo)
    })
    .then( res => {
        return res.json();
    })
    .catch( err => {
        console.log(`POST SIGNUP ERROR`);
    });
}

export const postSignin = (userInfo) => {
    return fetch(`${process.env.REACT_APP_API_URL}/auth/signin`, {
        method: "POST",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(userInfo)
    })
    .then( res => {
        return res.json();
    })
    .catch( err => {
        console.log("POST SIGNIN ERROR");
    })
}

export const authenticate = (data, callback) => {
    window.localStorage.setItem("jwt", JSON.stringify(data));
    callback();
}

export const isAuthenticated = () => {
    if(window.localStorage.getItem("jwt")) {
        return JSON.parse(window.localStorage.getItem("jwt"));
    }
    return false;
}

export const putUpdateStory = (userInfo) => {
    return fetch(`${process.env.REACT_APP_API_URL}/users/story/${userInfo._id}`, {
        method: "PUT",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(userInfo)
    })
    .then( res => {
        return res.json();
    })
    .catch( err => {
        console.log("PUT UPDATE STORY");
    })
}

export const putUpdateInfo = (userInfo) => {
    return fetch(`${process.env.REACT_APP_API_URL}/users/info/${userInfo._id}`, {
        method: "PUT",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(userInfo)
    })
    .then( res => {
        return res.json();
    })
    .catch( err => {
        console.log("PUT UPDATE INFO");
    })
}

export const getSignout = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/auth/signout`, {
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
        console.log("GET SIGN OUT");
    })
}

export const getUsers = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: "GET",
        headers: {
            Accpet: "Application/json",
            "Content-Type": "Application/json"
        }
    })
    .then( res => {
        return res.json();
    })
    .catch( err => {
        console.log("ERROR GET USERS");
    })
}