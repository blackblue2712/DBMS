const router = require("express").Router();

const {
    requireSignin,
    isAdmin
} = require("../controllers/auth");

const {
    getQuestions,
    postAsk,
    requestRelatedQuestionId,
    getSigleQuestion,
    postAnswer,
    getYourQuestions,
    putUpdateQuestion,
    deleteAnswersRelatedQuestion,
    deleteQuestion
} = require("../controllers/asks");

router.get("/questions", getQuestions);
router.get("/questions/:quesId", getSigleQuestion);
router.put("/questions/edit/:quesId", putUpdateQuestion);
router.get("/your-questions/", getYourQuestions);
router.post("/new", requireSignin, postAsk);
router.post("/answer/new", requireSignin, postAnswer);
router.delete("/delete", requireSignin, deleteAnswersRelatedQuestion, deleteQuestion);


router.param("quesId", requestRelatedQuestionId);

module.exports = router;