import { obtenerUsuarios } from "./Modulo/ajax.js";

// Obtener la información del usuario desde localStorage
const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'));

// Verificar si el usuario está logueado
if (!usuarioLogueado) {
    alert("No has iniciado sesión. Redirigiendo a la página de inicio de sesión...");
    window.location.href = '/Login/login.html'; // Redirigir a la página de inicio de sesión si no está logueado
} else {
    // Obtener y mostrar las coordenadas del usuario logueado
    const mostrarCoordenadas = async () => {
        try {
            // Obtener los datos desde el endpoint `pregunta_2`
            const usuarios = await obtenerUsuarios('pregunta_2');

            // Filtrar los datos para obtener solo la información del usuario logueado
            const datosUsuario = usuarios.filter(user => user.usuario_id === usuarioLogueado.id);

            // Verificar si existen coordenadas para mostrar
            if (datosUsuario.length > 0) {
                const historialContainer = document.getElementById("historialContainer");

                datosUsuario.forEach((dato, index) => {
                    const infoUsuario = document.createElement("p");
                    infoUsuario.textContent = `Registro ${index + 1} - Usuario: ${dato.usuario.nombre} ${dato.usuario.apellido}`;
                    historialContainer.appendChild(infoUsuario);

                    const coordenadasElemento = document.createElement("p");
                    coordenadasElemento.textContent = `Coordenadas: ${dato.coordenadas}`;
                    historialContainer.appendChild(coordenadasElemento);
                });
            } else {
                alert("No tienes coordenadas registradas en pregunta_2.");
            }
        } catch (error) {
            console.error("Error al obtener las coordenadas del usuario:", error);
            alert("Hubo un problema al cargar tu historial. Por favor, intenta nuevamente más tarde.");
        }
    };

    // Ejecutar la función para mostrar las coordenadas
    mostrarCoordenadas();
}
