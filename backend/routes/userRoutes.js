const express = require("express");
const authController = require("../controller/authController");

// INITIALIZE ROUTER
const router = express.Router();

// ROUTES
router.post("/login", authController.login);
router.post("/googleLogin", authController.googleLogin);
router.post("/signup", authController.signup);
router.post("/googleSignup", authController.googleSignup);
router.get("/checkLogs", authController.checkLogs);

module.exports = router;
