const express = require("express");
const router = express.Router();
const controller = require("../controllers/user-controller");

router.post("/login", controller.authenticate);
router.post("/", controller.create);

module.exports = router;