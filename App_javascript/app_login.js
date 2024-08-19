import { login_preguntas } from "./Modulo/urls.js";

// Obtén la referencia al botón
const $button_preguntas = document.getElementById("button_siguiente");

// Verifica si el botón existe antes de agregar el evento
if ($button_preguntas) {
    // Añade el evento click al botón
    $button_preguntas.addEventListener("click", (event) => {
        event.preventDefault(); // Previene el comportamiento por defecto del botón
        login_preguntas(); // Llama a la función de redireccionamiento
    });
} else {
    console.error("No se encontró el botón con id 'button_siguiente'.");
}

// Mostrar los datos del usuario
document.addEventListener('DOMContentLoaded', () => {
    // Recuperar los datos del usuario del localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    // Verifica si los datos del usuario existen
    if (usuario) {
        // Mostrar los datos en el DOM
        const userCorreo = document.getElementById('user-correo');
        const userName = document.getElementById('user-name');
        const userApellido = document.getElementById('user-apellido');
        const userContrasena = document.getElementById('user-contrasena');

        if (userCorreo) userCorreo.textContent = `Correo: ${usuario.correo || 'No disponible'}`;
        if (userName) userName.textContent = `Nombre: ${usuario.nombre || 'No disponible'}`;
        if (userApellido) userApellido.textContent = `Apellido: ${usuario.apellido || 'No disponible'}`;
        if (userContrasena) userContrasena.textContent = `Contraseña: ${usuario.contrasena || 'No disponible'}`;
    } else {
        console.log("No se encontró información del usuario.");
        // Redirige al inicio de sesión si no hay datos del usuario
        window.location.href = '/html/logueo.html';
    }
});
