const express = require("express")
const router = express.Router()

const userController = require("../controllers/userController")

router.post("/api/auth/signup", userController.POST);
router.get("/api/auth/signup" , userController.GET);
router.post("/api/auth/signin", userController.SIGNIN);

module.exports = router