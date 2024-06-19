const ModelFood = require("../models/foodModel")

module.exports.GET = async(req,res) => {
    try {
        const users = await ModelFood.find();
        res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports.POST = async(req,res) => {
    const body = req.body;

    const respuesta = await ModelFood.create(body); 

    res.send(respuesta);
}

module.exports.PUT = async(req,res) => {
    const body = req.body;
    const id = req.params.id;

    const respuesta = await ModelFood.findByIdAndUpdate({_id: id}, body);

    res.send(respuesta);
}

module.exports.DELETE = async(req,res) => {
    const id = req.params.id;

    const respuesta = await ModelFood.findByIdAndDelete({_id: id});

    res.send(respuesta);
}