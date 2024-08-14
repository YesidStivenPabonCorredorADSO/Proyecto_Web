// ajax.js
import { URL } from "../Modulo/config.js";
export const obtenerUsuarios = async (correo, password,endpoint) => {
  try {  
      const url = `${URL.replace(/\/$/, "")}/${endpoint}`;
      console.log("Fetching URL:", url);

      const response = await fetch(url, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      });
      let bandera=false;
      const usuarios = await response.json();
      usuarios.forEach(element => {
          if (element.correo===correo.value && element.contrasena===password.value) {
            alert("Bienvenido")
            return bandera=true;
          }
      });
      if (bandera==true) {
        window.location.href = '/Login/logueo.html';
      }
      else if(bandera==false){
        throw new Error("Error")
      }
      return usuarios;
  } catch (error) {
      alert (error);
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

