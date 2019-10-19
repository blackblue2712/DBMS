const router = require("express").Router();

const {
    getUploadImages,
    postUploadImage,
    putDeleteUploadedImage
} = require("../controllers/galleries");

router.get("/images-gallery/:userId", getUploadImages);
router.post("/images-gallery/new/:userId", requireSignin, postUploadImage);
router.put("/images-gallery/delete/:userId", requireSignin, putDeleteUploadedImage);

module.exports = router;