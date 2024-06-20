const express = require("express")
const router = express.Router()

const foodController = require("../controllers/foodController")


router.get("/foods", foodController.GET)
router.get("/foods/:id", foodController.GETBYID)
router.post("/foods", foodController.POST)
router.put("/foods/:id", foodController.PUT)
router.delete("/foods/:id", foodController.DELETE)

module.exports = router
