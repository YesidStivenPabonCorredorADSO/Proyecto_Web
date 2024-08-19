import { correo } from "../App_javascript/Modulo/correo.js";
import { contraseña } from "../App_javascript/Modulo/contraseña.js";
import { obtenerUsuarios } from "./Modulo/ajax.js";

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

            // Obtener los datos de login para validación
            const usuarios = await obtenerUsuarios('Users_registro');
            console.log("Usuarios recibidos:", usuarios);

            // Validar usuario
            const usuario = usuarios.find(user => user.correo === correoInput.value.trim() && user.contrasena === contraseñaInput.value.trim());

            if (usuario) {
                if (usuario.activo) {
                    localStorage.setItem('usuario', JSON.stringify({
                        id: usuario.id,
                        nombre: usuario.nombre,
                        correo: usuario.correo,
                        apellido: usuario.apellido,
                    }));
                    // Redirigir al usuario a la página de perfil
                    window.location.href = '/Login/logueo.html'; 
                } else {
                    alert("Tu cuenta ha sido desactivada. Contacta al administrador para más información.");
                }
            } else {
                console.log("Correo o contraseña incorrectos.");
                alert("Correo o contraseña incorrectos. Por favor, verifica tus credenciales e intenta nuevamente.");
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
