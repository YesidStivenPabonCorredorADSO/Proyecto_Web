import { validacion_select } from "./Modulo/preguntas.js";
import { enviar } from "./Modulo/ajax.js";

// Obtener referencias a los elementos del DOM
const $select_vehiculo = document.getElementById("vehiculo");
const $select_ambiente = document.getElementById("ambiente");
const $button_preguntas = document.getElementById("button_preguntas");

// Mostrar los datos del usuario
document.addEventListener('DOMContentLoaded', () => {
    // Recuperar los datos del usuario del localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
        // Mostrar los datos en el DOM
        const userCorreo = document.getElementById('user-correo');
        const userName = document.getElementById('user-name');
        
        if (userCorreo) userCorreo.textContent = `Correo: ${usuario.correo}`;
        if (userName) userName.textContent = `Nombre: ${usuario.nombre}`;
    } else {
        console.log("No se encontró información del usuario.");
    }
});

// Validación individual al cambiar la selección en los <select>
$select_vehiculo.addEventListener("change", () => {
    validacion_select();
});

$select_ambiente.addEventListener("change", () => {
    validacion_select();
});

// Función para manejar el envío de datos
const manejarEnvio = async () => {
    const valid = validacion_select(); // Llama a la función de validación

    if (valid) {
        console.log("Formulario válido. Enviando datos...");

        const data = {
            vehiculo: $select_vehiculo.value,
            ambiente: $select_ambiente.value,
            // Puedes agregar más datos del formulario si es necesario
        };

        // Enviar los datos usando la función "enviar" del módulo ajax.js
        const response = await enviar(data, `pregunta_1`);

        if (response.error) {
            console.error("Error en la respuesta:", response.error);
        } else {
            window.location.href = 'logueo_preguntas2.html';
        }
    } else {
        console.log("Formulario no válido. Revisa los campos.");
    }
};

// Validación y envío al hacer clic en el botón "Siguiente"
$button_preguntas.addEventListener("click", (event) => {
    event.preventDefault();
    manejarEnvio();
});
