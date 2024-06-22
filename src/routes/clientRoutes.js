const express = require("express")
const router = express.Router()

const clientController = require("../controllers/clientController")

router.get("/clients", clientController.GET)
router.get("/clients/:id", clientController.GETBYID)
router.get("/clients/:id/institution", clientController.GETINSTITUTION)
router.post("/clients", clientController.POST)
router.put("/clients/:clientId/favorites/:menuId", clientController.PUT)
router.delete("/clients/:id", clientController.DELETE)
router.delete("/clients/:clientId/favorites/:menuId", clientController.REMOVE_FAVORITE_MENU)
router.post("/signin", clientController.SIGNIN)
router.post("/signup", clientController.SIGNUP)

module.exports = router