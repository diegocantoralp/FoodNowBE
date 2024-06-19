const express = require("express")
const router = express.Router()

const clientController = require("../controllers/clientController")

router.get("/clients", clientController.GET)
router.post("/clients", clientController.POST)
router.put("/clients/:clientId/add-favorite/:menuId", clientController.PUT)
router.delete("/clients/:id", clientController.DELETE)

module.exports = router