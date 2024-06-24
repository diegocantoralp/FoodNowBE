const ModelOrder = require("../models/orderModel")

module.exports.GET = async(req,res) => {
    try {
        const orders = await ModelOrder.find();
        res.json(orders);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports.POST = async(req,res) => {
    const body = req.body;

    const respuesta = await ModelOrder.create(body); 

    res.send(respuesta);
}

module.exports.PUT = async(req,res) => {
    const body = req.body;
    const id = req.params.id;

    const respuesta = await ModelOrder.findByIdAndUpdate({_id: id}, body);

    res.send(respuesta);
}

module.exports.DELETE = async(req,res) => {
    const id = req.params.id;

    const respuesta = await ModelOrder.findByIdAndDelete({_id: id});

    res.send(respuesta);
}

module.exports.GETBYUSERID = async(req,res) => {
    const id = req.params.id;
    try {
        const orders = await ModelOrder.find({client_id: id});
        if (!orders) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.json(orders);
    } catch (error) {
        res.status(500).send(error.message);
    }
}