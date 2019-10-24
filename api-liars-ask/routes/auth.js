const router = require("express").Router();
const {
    postSignup,
    postSignin,
    getSignout,
    isAdmin,
    requireSignin,
    yourAreAdmin
} = require("../controllers/auth");

// const {
//     handlePassword,
// } = require("../middlewares/userHandleError");

// const { check } = require("express-validator");

router.post("/signup", postSignup);
router.post("/signin", postSignin);
router.get("/signout", getSignout);
router.get("/isAdmin", requireSignin, isAdmin, yourAreAdmin);
// router.post("/privileges", requireSignin, isAdmin, postPrivileges);
module.exports = router;