const app = require("express");
const router = app.Router();
const { addContactData } = require("../controllers/ContactController");
router.post("/addContactData", addContactData);

module.exports = router;
