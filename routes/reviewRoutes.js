const app = require("express");
const router = app.Router();
const { addReviewData } = require("../controllers/ReviewController");
router.post("/addReviewData", addReviewData);

module.exports = router;
