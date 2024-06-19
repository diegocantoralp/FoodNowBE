const ModelOrderDetail = require("../models/orderDetailModel")

module.exports.GET = async(req,res) => {
    try {
        const orderdetails = await ModelOrderDetail.find();
        res.json(orderdetails);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports.POST = async(req,res) => {
    const body = req.body;

    const respuesta = await ModelOrderDetail.create(body); 

    res.send(respuesta);
}

module.exports.PUT = async(req,res) => {
    const body = req.body;
    const id = req.params.id;

    const respuesta = await ModelOrderDetail.findByIdAndUpdate({_id: id}, body);

    res.send(respuesta);
}

module.exports.DELETE = async(req,res) => {
    const id = req.params.id;

    const respuesta = await ModelOrderDetail.findByIdAndDelete({_id: id});

    res.send(respuesta);
}
