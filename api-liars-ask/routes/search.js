const router = require("express").Router();

const  {
    onSearchQuestions
} = require("../controllers/search");

router.get("/", onSearchQuestions);

module.exports = router;