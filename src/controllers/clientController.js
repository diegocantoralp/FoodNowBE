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

exports.SIGNUP = async (req, res) => {
    try {
      const { name, email, password, institution } = req.body;
      // Crear una nueva instancia del modelo con los datos proporcionados
      const newClient = new ModelClient({
        name,
        email,
        password, // La contraseña se hasheará automáticamente gracias al middleware 'pre save'
        institution,
        favoriteMenus: [] // Inicializar con un arreglo vacío si es necesario
      });
  
      // Guardar el nuevo cliente en la base de datos
      await newClient.save();
  
      // Responder con un mensaje de éxito
      res.status(201).json({ message: 'Client successfully registered' });
    } catch (error) {
      // Manejar errores, por ejemplo, errores de validación o errores de servidor
      res.status(500).json({ message: 'Error registering new client', error: error.message });
    }
};

exports.SIGNIN = async (req, res) => {
   try {
     // Extraer el email y la contraseña de la solicitud
     const { name, password } = req.body; // Cambiado de name a email
 
     // Buscar al cliente por su email
     const client = await ModelClient.findOne({ name }); // Cambiado de name a email
 
     // Verificar si el cliente existe
     if (!client) {
       return res.status(404).json({ message: 'Client not found' });
     }
  
     // Verificar la contraseña utilizando el método personalizado
     const isValid = await client.isValidPassword(password); // Utilizar el método personalizado del esquema
  
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

