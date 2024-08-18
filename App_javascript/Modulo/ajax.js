import { URL } from "../Modulo/config.js";

export const obtenerUsuarios = async (correo, password, endpoint) => {
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

    const correoValue = correo.value.trim();
    const passwordValue = password.value.trim();

    let bandera = false;
    for (const element of usuarios) {
      if (element.correo.trim() === correoValue && element.contrasena.trim() === passwordValue) {
        alert("Bienvenido");
        bandera = true;
        break; // Termina el bucle si se encuentra el usuario
      }
    }

    if (bandera) {
      window.location.href = '/Login/logueo.html';
    } else {
      throw new Error("Usuario o contraseña incorrectos");
    }

    return usuarios;
  } catch (error) {
    alert(error.message);
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
