const router = require("express").Router();
const {
    postSignup,
    postSignin,
    getSignout,
    isAdmin,
    requireSignin
} = require("../controllers/auth");

// const {
//     handlePassword,
// } = require("../middlewares/userHandleError");

// const { check } = require("express-validator");

router.post("/signup", postSignup);
router.post("/signin", postSignin);
router.get("/signout", getSignout);
module.exports = router;