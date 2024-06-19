const ModelMenu = require("../models/menuModel")

module.exports.GET = async(req,res) => {
    try {
        const menus = await ModelMenu.find();
        res.json(menus);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports.POST = async(req,res) => {
    const body = req.body;

    const respuesta = await ModelMenu.create(body); 

    res.send(respuesta);
}

module.exports.PUT = async(req,res) => {
    const body = req.body;
    const id = req.params.id;

    const respuesta = await ModelMenu.findByIdAndUpdate({_id: id}, body);

    res.send(respuesta);
}

module.exports.PUT_COMMENT = async(req,res) => {
    const { username, comment } = req.body;
    const id = req.params.id;

    try {
        const menu = await ModelMenu.findByIdAndUpdate(id, {
            $push: { comments: { username, comment } }
        }, { new: true });

        if (!menu) {
            return res.status(404).send({ error: "Menú no encontrado" });
        }

        res.send(menu);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error al añadir comentario al menú" });
    }
}

module.exports.PUT_SCORE = async(req,res) => {
    const { score } = req.body; 
    const id = req.params.id;

    try {
        const menu = await ModelMenu.findByIdAndUpdate(id, {
            $push: { scores: { score } }
        }, { new: true });

        if (!menu) {
            return res.status(404).send({ error: "Menú no encontrado" });
        }

        res.send(menu);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error al añadir calificación al menú" });
    }
}

module.exports.DELETE = async(req,res) => {
    const id = req.params.id;

    const respuesta = await ModelMenu.findByIdAndDelete({_id: id});

    res.send(respuesta);
}