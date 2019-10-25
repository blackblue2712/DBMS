const router = require("express").Router();

const  {
    onSearchQuestions,
    onAdvanceSerach
} = require("../controllers/search");

router.get("/", onSearchQuestions);
router.post("/advance", onAdvanceSerach);

module.exports = router;