// ajax.js

export const obtenerUsuarios = async () => {
  const url = 'http://localhost:3000/Users_registro';

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const usuarios = await response.json();
    return usuarios;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
};

export const enviarLogin = async (correo, contrasena) => {
  const url = 'http://localhost:3000/Users_login';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ correo, contrasena })
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error('Error en el login:', response.statusText);
      throw new Error('Error en el login');
    }
  } catch (error) {
    console.error('Error al enviar los datos:', error);
    throw error;
  }
};

export const enviar = async (datos) => {
  try {
    const response = await fetch('http://localhost:3000/Users_registro', {
      method: 'POST',
      body: JSON.stringify(datos),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Datos enviados exitosamente:', data);
    return data;
  } catch (error) {
    console.error('Error al enviar los datos:', error);
    return { error: error.message };
  }
};
