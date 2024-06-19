const express = require("express")
const router = express.Router()

const orderController = require("../controllers/orderController")

router.get("/orders", orderController.GET)
router.post("/orders", orderController.POST)
router.put("/orders/:id", orderController.PUT)
router.delete("/orders/:id", orderController.DELETE)

module.exports = router
