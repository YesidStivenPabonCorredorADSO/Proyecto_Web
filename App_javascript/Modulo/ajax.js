import { URL } from "../Modulo/config.js";

// Obtener usuarios desde un endpoint específico
// Enviar datos a un endpoint específico
export const enviar = async (data, endpoint) => {
  try {
    const url = `${URL}${endpoint}`;
    console.log("Enviando datos a URL:", url);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Datos enviados con éxito:", result);
    return result;
  } catch (error) {
    console.error("Error al enviar los datos:", error);
    return { error: error.message };
  }
};

export const obtenerUsuarios = async (endpoint) => {
  try {
    const url = `${URL}${endpoint}`;
    console.log("Fetching URL:", url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const usuarios = await response.json();
    console.log("Usuarios recibidos:", usuarios);
    return usuarios;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};

// Buscar usuarios por consulta
export const buscarUsuarios = async (query) => {
  try {
    const usuarios = await obtenerUsuarios('registros');
    const resultados = usuarios.filter(usuario =>
      usuario.id.toString().includes(query) || 
      usuario.nombre.toLowerCase().includes(query.toLowerCase())
    );

    return resultados;
  } catch (error) {
    console.error('Error al buscar usuarios:', error);
    throw error;
  }
};

// Actualizar el estado de un usuario
export const actualizarEstadoUsuario = async (id, activo) => {
  try {
    const response = await fetch(`${URL.replace(/\/$/, "")}/registros/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ activo }) 
    });

    if (!response.ok) {
      throw new Error(`No se pudo actualizar el estado del usuario. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Estado del usuario actualizado:', data);
    return data;
  } catch (error) {
    console.error('Error al actualizar el estado del usuario:', error);
    throw error;
  }
};

// Eliminar un usuario
export const eliminarUsuario = async (id) => {
  try {
    const response = await fetch(`${URL.replace(/\/$/, "")}/registros/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`No se pudo eliminar el usuario. Status: ${response.status}`);
    }

    console.log('Usuario eliminado:', id);
    return id; // Retorna el ID del usuario eliminado
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    return { error: error.message };
  }
};

// Obtener información del usuario por correo y contraseña
export const obtenerUsuarioPorCredenciales = async (correo, contrasena) => {
  try {
    const usuarios = await obtenerUsuarios('registros');
    const usuario = usuarios.find(user => 
      user.correo === correo.trim() && 
      user.contrasena === contrasena.trim()
    );

    return usuario;
  } catch (error) {
    console.error('Error al obtener usuario por credenciales:', error);
    throw error;
  }
};

// ----------------

// Obtener vehículos desde un endpoint específico
export const obtenerVehiculos = async (endpoint) => {
  try {
    const url = `${URL}${endpoint}`;
    console.log("Fetching URL:", url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const vehiculos = await response.json();
    console.log("Vehículos recibidos:", vehiculos);
    return vehiculos;
  } catch (error) {
    console.error("Error al obtener los vehículos:", error);
    throw error;
  }
};

// Buscar vehículos por consulta
export const buscarVehiculos = async (query) => {
  try {
    const vehiculos = await obtenerVehiculos('vehiculos');
    console.log('Vehículos obtenidos:', vehiculos); // Puedes quitar esto después de verificar

    const resultados = vehiculos.filter(vehiculo =>
      vehiculo.id.toString().includes(query) || 
      vehiculo.vehiculo.toLowerCase().includes(query.toLowerCase()) // Aquí se cambia `modelo` por `vehiculo`
    );

    return resultados;
  } catch (error) {
    console.error('Error al buscar vehículos:', error);
    throw error;
  }
};


// Eliminar un vehículo
export const eliminarVehiculo = async (id) => {
  try {
    const response = await fetch(`${URL.replace(/\/$/, "")}/vehiculos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`No se pudo eliminar el vehículo. Status: ${response.status}`);
    }

    console.log('Vehículo eliminado:', id);
    return id; // Retorna el ID del vehículo eliminado
  } catch (error) {
    console.error('Error al eliminar el vehículo:', error);
    return { error: error.message };
  }
};

// --------------------

// Obtener estado del clima desde un endpoint específico
export const obtenerEstadoClima = async (endpoint) => {
  try {
    const url = `${URL}${endpoint}`; // Verifica que URL esté definido y correcto
    console.log("Fetching URL:", url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const estadoClima = await response.json();
    console.log("Estado del clima recibido:", estadoClima);
    return estadoClima;
  } catch (error) {
    console.error("Error al obtener el estado del clima:", error);
    throw error;
  }
};




// Buscar estado del clima por consulta
export const buscarEstadoClima = async (query) => {
  try {
    // Obtener los estados del clima desde el endpoint
    const estadosClima = await obtenerEstadoClima('estados_clima');
    console.log('Estados climáticos obtenidos:', estadosClima); // Puedes quitar esto después de verificar

    // Filtrar los resultados basados en la consulta
    const resultados = estadosClima.filter(estado =>
      estado.id.toString().includes(query) || 
      estado.estados_clima.toLowerCase().includes(query.toLowerCase()) // Cambia `estado` por `estados_clima`
    );

    return resultados;
  } catch (error) {
    console.error('Error al buscar estado del clima:', error);
    throw error;
  }
};



// Eliminar estado del clima
export const eliminarEstadoClima = async (id) => {
  try {
    const response = await fetch(`${URL.replace(/\/$/, "")}/estado_clima/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`No se pudo eliminar el estado del clima. Status: ${response.status}`);
    }

    console.log('Estado del clima eliminado:', id);
    return id; // Retorna el ID del estado del clima eliminado
  } catch (error) {
    console.error('Error al eliminar el estado del clima:', error);
    return { error: error.message };
  }
};
