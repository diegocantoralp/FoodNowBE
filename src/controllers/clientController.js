const ModelClient = require("../models/clientModel");
const ModelMenu = require("../models/menuModel")

module.exports.GET = async(req,res) => {
    try {
        const clients = await ModelClient.find();
        res.json(clients);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// get client by id
exports.GETBYID = async(req, res)=>{
  const { id } = req.params;
  try {
    const client = await ModelClient.findById(id);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching client" });
  }
}


exports.GETBYINSTITUTION = (req, res) => {
  // Suponiendo que tienes una manera de acceder a tus datos, por ejemplo, un arreglo de objetos clients
  const clientsByInstitution = clients.filter(client => client.institution === true);
  
  if (clientsByInstitution.length) {
    res.json(clientsByInstitution);
  } else {
    res.status(404).send('No clients found for the given institution');
  }
};

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

exports.REMOVE_FAVORITE_MENU = async (req, res) => {
  try {
      const clientId = req.params.clientId; // O asumiendo que obtienes esto de alguna manera
      const menuIdToRemove = req.params.menuId; // El ID del menú favorito a eliminar

      // Buscar el documento del cliente por ID
      const client = await ModelClient.findById(clientId);

      if (!client) {
          return res.status(404).json({ error: "Cliente no encontrado" });
      }

      // Eliminar el ID del menú favorito de la lista de favoritos
      client.favoriteMenus = client.favoriteMenus.filter(menuId => menuId.toString() !== menuIdToRemove);

      // Guardar el documento del cliente actualizado
      await client.save();

      res.json({ message: "Menú favorito eliminado con éxito" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al eliminar menú favorito" });
  }
};

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
  
  
     // Enviar respuesta de éxito
     res.status(200).json({ institution: client.institution, id: client._id });
    } catch (error) {
      // Manejar errores
      res.status(500).json({ message: 'Error during sign in', error: error.message });
    }
};

async function getInstitutionValue(name) {
  try {
    const client = await Client.findOne({ name: name });
    if (client) {
      return { success: true, institution: client.institution };
    } else {
      return { success: false, message: 'Cliente no encontrado' };
    }
  } catch (error) {
    return { success: false, message: 'Error al buscar el cliente', error: error.message };
  }
}

// Asumiendo que ya tienes importado el modelo Client
// const Client = require('../models/clientModel');

exports.GETINSTITUTION = async (req, res) => {
  try {
    const clientId = req.params.id;
    console.log(`Buscando cliente con ID: ${clientId}`); // Log de depuración

    const client = await Client.findById(clientId);

    if (!client) {
      console.log('Cliente no encontrado'); // Log de depuración
      return res.status(404).send('Cliente no encontrado');
    }

    console.log(`Valor de institution: ${client.institution}`); // Log de depuración
    res.json({ institution: client.institution });
  } catch (error) {
    console.error('Error al obtener el cliente:', error); // Log del error
    res.status(500).send('Error al obtener el cliente');
  }
};