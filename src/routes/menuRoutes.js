const express = require("express")
const router = express.Router()

const menuController = require("../controllers/menuController")

router.get("/menus", menuController.GET)
router.get("/menus/:id", menuController.GETBYID)
router.post("/menus", menuController.POST)
router.put("/menus/:id", menuController.PUT)
router.put("/menus/:id/add-comment", menuController.PUT_COMMENT)
router.put("/menus/:id/add-score", menuController.PUT_SCORE)
router.delete("/menus/:id", menuController.DELETE)

module.exports = router
