var express = require("express");
var router = express.Router();
const creditsController = require("../controller/creditsController");

// Route to handle the credit card information data
router.post("/savecreditinfo", creditsController.saveCreditInfo);

module.exports = router;
