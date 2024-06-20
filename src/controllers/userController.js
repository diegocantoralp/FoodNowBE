const ModelUser = require("../models/userModel");

// Ruta de registro
module.exports.POST = async(req, res) => {
  try {
    const user = new ModelUser({
      username: req.body.username,
      password: req.body.password,
    });
    const newUser = await user.save();

    res.status(201).json({ message: "User created successfully", userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.GET = async(req, res) => {
  try {
    const clients = await ModelUser.find();
    res.json(clients);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.SIGNIN = async(req, res) => {
  try {
    // Extraer el nombre de usuario y la contraseña de la solicitud
    const { username, password } = req.body;

    // Buscar al usuario por su nombre de usuario
    const user = await ModelUser.findOne({ username });

    // Verificar si el usuario existe
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verificar la contraseña
    const isValid = await user.isValidPassword(password);

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Aquí podrías generar un token de sesión o realizar cualquier otra acción necesaria para el inicio de sesión

    // Enviar respuesta de éxito
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    // Manejar errores
    res.status(500).json({ message: 'Error during sign in', error: error.message });
  }
};