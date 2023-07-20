const app = require("express");
const router = app.Router();
const { sendPaymentData } = require("../controllers/PaymentController");
router.post("/sendPaymentData", sendPaymentData);

module.exports = router;
