const ModelClient = require("../models/clientModel");

module.exports.GET = async(req,res) => {
    try {
        const clients = await ModelClient.find();
        res.json(clients);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports.POST = async(req,res) => {
    const body = req.body;

    const respuesta = await ModelClient.create(body); 

    res.send(respuesta);
}

module.exports.PUT = async(req,res) => {
    const { clientId, menuId } = req.params;

    try {
        const client = await ModelClient.findById(clientId);
        if (!client) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }

        const menu = await ModelMenu.findById(menuId);
        if (!menu) {
            return res.status(404).json({ error: "Menú no encontrado" });
        }

        if (client.favoriteMenus.includes(menuId)) {
            return res.status(400).json({ error: "El menú ya está en favoritos del cliente" });
        }
    
        client.favoriteMenus.push(menuId);
        await client.save();

        res.send(client);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al agregar menú a favoritos" });
    }
}

module.exports.DELETE = async(req,res) => {
    const id = req.params.id;

    const respuesta = await ModelClient.findByIdAndDelete({_id: id});

    res.send(respuesta);
}