import { correo } from "../App_javascript/Modulo/correo.js";
import { contraseña } from "../App_javascript/Modulo/contraseña.js";
import { enviar, obtenerUsuarios } from "../App_javascript/Modulo/ajax.js";

// Obtener referencias a los elementos del DOM
const form = document.getElementById("loginForm");
const loginButton = document.querySelector(".main__formu--button1");
const registerButton = document.querySelector(".main__formu--button2");
const correoInput = document.getElementById("correo");
const contraseñaInput = document.getElementById("contraseña");

// Manejo del evento click en el botón de inicio de sesión
loginButton.addEventListener("click", async (event) => {
    event.preventDefault();

    // Validar los campos de correo y contraseña antes de enviar
    correo(event, correoInput);
    contraseña(event, contraseñaInput);

    if (!correoInput.classList.contains("input_mal") && !contraseñaInput.classList.contains("input_mal")) {
        try {
            console.log("Intentando validar usuario con correo:", correoInput.value);
            
            // Enviar los datos de login para validación
            const resultadoValidacion = await obtenerUsuarios(correoInput, contraseñaInput,`Users_registro`);

            console.log("Resultado de la validación:", resultadoValidacion);

            if (resultadoValidacion.success) {
                window.location.href = '/Login/logueo.html'; // Redirigir al inicio de sesión o página principal
            } else {
                console.log("Correo o contraseña incorrectos.");

            }
        } catch (error) {
            console.error("Error al validar los datos:", error);
            alert("Hubo un problema con el servidor. Inténtalo de nuevo más tarde.");
        }
    } else {
        console.log("Por favor, complete todos los campos correctamente.");
    }
});


// Redirigir al registro cuando se hace clic en el botón de registro
registerButton.addEventListener("click", () => {
    window.location.href = '/html/registro.html';
});
