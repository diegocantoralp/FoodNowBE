const express = require("express")
const router = express.Router()

const orderDetailController = require("../controllers/orderDetailController")

router.get("/orderdetails", orderDetailController.GET)
router.post("/orderdetails", orderDetailController.POST)
router.put("/orderdetails/:id", orderDetailController.PUT)
router.delete("/orderdetails/:id", orderDetailController.DELETE)

module.exports = router