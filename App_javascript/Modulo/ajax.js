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
    const response = await fetch(`${URL}${endpoint}`, {
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
          method: 'PUT',
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
      // Llamada a la función editar
      const result = await editar(id, data, endpoint);

      // Aquí podrías agregar cualquier lógica adicional que necesites
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
      // Obtener todos los usuarios
      const usuarios = await obtenerUsuarios('Users_registro');

      // Filtrar usuarios en el cliente
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
