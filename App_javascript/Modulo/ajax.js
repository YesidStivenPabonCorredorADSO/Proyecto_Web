import { URL } from "../Modulo/config.js";

export const obtenerUsuarios = async (endpoint) => {
  try {
    const url = `${URL.replace(/\/$/, "")}/${endpoint}`;
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


export const enviar = async (datos, endpoint) => {
    try {
        const response = await fetch(`${URL.replace(/\/$/, "")}/${endpoint}`, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Datos enviados exitosamente:', data);
        return data;
    } catch (error) {
        console.error('Error al enviar los datos:', error);
        return { error: error.message };
    }
};

export const editar = async (id, data, endpoint) => {
  try {
    const response = await fetch(`${URL.replace(/\/$/, "")}/${endpoint}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Datos actualizados exitosamente:', result);
    return result;
  } catch (error) {
    console.error('Error al actualizar los datos:', error);
    return { error: error.message };
  }
};
export const editar_guardar = async (id, data, endpoint) => {
  try {
      const result = await editar(id, data, endpoint);

      if (result.error) {
          console.error('Error al guardar los datos editados:', result.error);
      } else {
          console.log('Datos editados y guardados exitosamente:', result);
      }

      return result;
  } catch (error) {
      console.error('Error en editar_guardar:', error);
      return { error: error.message };
  }
};


export const buscarUsuarios = async (query) => {
  try {
    const usuarios = await obtenerUsuarios('Users_registro');
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

export const actualizarEstadoUsuario = async (id, activo) => {
  try {
    const response = await fetch(`${URL.replace(/\/$/, "")}/Users_registro/${id}`, {
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
// ajax.js

export const eliminar = async (id, endpoint) => {
  try {
    const response = await fetch(`${URL.replace(/\/$/, "")}/${endpoint}/${id}`, {
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
