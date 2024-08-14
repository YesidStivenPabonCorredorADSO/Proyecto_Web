export const enviar = async (datos) => {
    try {
      // Realiza la solicitud POST al servidor
    const response = await fetch('http://localhost:3000/Users_registro', {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        },
    });

      // Verifica si la respuesta es correcta (status en el rango 200-299)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

      // Convierte la respuesta en formato JSON
    const data = await response.json();

      // Maneja la respuesta exitosa (opcional)
    console.log('Datos enviados exitosamente:', data);
    
      // Retorna los datos recibidos del servidor
    return data;
    } catch (error) {
      // Maneja errores y muestra el error en la consola
    console.error('Error al enviar los datos:', error);
    
      // Opcionalmente, puedes retornar un mensaje de error o una estructura específica
    return { error: error.message };
    }
};
// ajax.js
export const iniciarSesion = async (datos) => {
  const url = 'http://http://localhost:3000/Users_login/Users_registro'; // Cambia la URL por la del endpoint adecuado

  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(datos)
      });

      const resultado = await response.json();
      return resultado;
  } catch (error) {
      console.error('Error en la solicitud:', error);
      throw error;
  }
};


