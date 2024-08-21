import { validacion_select } from "./Modulo/preguntas.js";
import { enviar } from "./Modulo/ajax.js";

// Obtener referencias a los elementos del DOM
const $select_vehiculo = document.getElementById("vehiculo");
const $select_ambiente = document.getElementById("ambiente");
const $button_preguntas = document.getElementById("button_preguntas");

// Función para calcular el porcentaje basado en las respuestas
const calcularPorcentaje = (vehiculo, ambiente) => {
    let porcentaje = 0;

    // Asignar valores base
    switch (vehiculo) {
        case "Motos":
            porcentaje += 17;
            break;
        case "Automovil":
            porcentaje += 20;
            break;
        case "Cicla":
            porcentaje += 5;
            break;
        case "Camion":
            porcentaje += 25;
            break;
    }

    // Ajustar porcentaje basado en el estado del clima
    switch (ambiente) {
        case "Día soleado":
            porcentaje += 5;
            break;
        case "Día lluvioso":
            porcentaje -= 15;
            break;
        case "Día nubloso":
            porcentaje += 5;
            break;
        case "Día tormenta":
            porcentaje -= 30;
            break;
        case "Día neblina":
            porcentaje -= 15;
            break;
    }

    // Asegurarse de que el porcentaje esté en un rango válido
    return Math.max(0, Math.min(100, porcentaje));
};

// Mostrar los datos del usuario
document.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
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

        const vehiculo = $select_vehiculo.value;
        const ambiente = $select_ambiente.value;

        const porcentaje = calcularPorcentaje(vehiculo, ambiente);

        const data = {
            vehiculo,
            ambiente,
            porcentaje,
        };

        // Enviar los datos usando la función "enviar" del módulo ajax.js
        const response = await enviar(data, 'pregunta_1');

        if (response.error) {
            console.error("Error en la respuesta:", response.error);
        } else {
            // Guardar el porcentaje en el localStorage
            localStorage.setItem('porcentaje', porcentaje);

            // Redirigir a la página de resultados
            window.location.href = '/Login/logueo_preguntas2.html'; // Asegúrate de que esta ruta sea correcta
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
