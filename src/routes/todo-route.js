const express = require("express");
const router = express.Router();
const controller = require("../controllers/todo-controller");
const authService = require("../services/auth-service");

router.get("/", authService.authorize, controller.getAll);
router.get("/:id", authService.authorize, controller.getById);
router.post("/", authService.authorize, controller.create);
router.put("/:id", authService.authorize, controller.edit);
router.delete("/:id",  authService.authorize,controller.delete);

module.exports = router;