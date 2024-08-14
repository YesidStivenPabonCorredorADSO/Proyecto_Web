import { correo } from "../App_javascript/Modulo/correo.js";
import { contraseña } from "../App_javascript/Modulo/contraseña.js";
import { enviar } from "../App_javascript/Modulo/ajax.js";

// Obtener referencias a los elementos del DOM
const form = document.getElementById("loginForm");
const loginButton = document.getElementById("loginButton");
const registerButton = document.getElementById("registerButton");

const correoInput = document.getElementById("correo");
const contraseñaInput = document.getElementById("contraseña");

// Validación en tiempo real de los campos de correo y contraseña
correoInput.addEventListener("input", (event) => {
    correo(event, correoInput);
});

contraseñaInput.addEventListener("input", (event) => {
    contraseña(event, contraseñaInput);
});

// Manejo del evento click en el botón de inicio de sesión
loginButton.addEventListener("click", async (event) => {
    event.preventDefault();

    // Validar los campos de correo y contraseña antes de enviar
    correo(event, correoInput);
    contraseña(event, contraseñaInput);

    // Verificar si las entradas no tienen errores antes de enviar los datos
    if (!correoInput.classList.contains("input_mal") && !contraseñaInput.classList.contains("input_mal")) {
        const data = {
            correo: correoInput.value,
            contrasena: contraseñaInput.value,
        };

        try {
            await enviar(data);
            window.location.href = '/html/logueo.html'; // Redirigir al inicio de sesión o página principal
        } catch (error) {
            console.error("Error al enviar los datos:", error);
        }
    } else {
        console.log("Por favor, complete todos los campos correctamente.");
    }
});

// Redirigir al registro cuando se hace clic en el botón de registro
registerButton.addEventListener("click", () => {
    window.location.href = '/html/registro.html';
});
