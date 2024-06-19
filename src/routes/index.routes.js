const {Router} = require("express")

const router = Router()
router.get("/", (req,res) => {
    res.send("Conexión con el puerto", 3000, "exitosa");
});

//GETS

/**
 * @swagger
 * /foods:
 *  get:
 *    summary: Get a list of all foods
 *    description: Retrieves a list of foods from the database.
 *    responses:
 *      200:
 *        description: A successful response with an array of foods.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                    description: The name of the food.
 *                  price:
 *                    type: number
 *                    description: The price of the food.
 *                  available:
 *                    type: boolean
 *                    description: Availability of the food.
 *      500:
 *        description: Server error
 */

module.exports = router
