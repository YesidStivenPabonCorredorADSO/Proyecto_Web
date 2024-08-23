import { correo } from "../App_javascript/Modulo/correo.js";
import { contraseña } from "../App_javascript/Modulo/contraseña.js";
import { obtenerUsuarioPorCredenciales, enviar } from "./Modulo/ajax.js";  

// Obtener referencias a los elementos del DOM
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

            // Validar usuario con correo y contraseña
            const usuario = await obtenerUsuarioPorCredenciales(correoInput.value, contraseñaInput.value);

            if (usuario) {
                console.log("Usuario encontrado:", usuario);

                // Verificar si la cuenta está activa
                if (usuario.activo) {
                    console.log("La cuenta está activa.");

                    // Enviar los datos completos a "users"
                    const response = await enviar({
                        id: usuario.id,
                        nombre: usuario.nombre,
                        apellido: usuario.apellido,
                        correo: usuario.correo,
                        contrasena: usuario.contrasena
                    }, 'users');  

                    if (response && response.id) {
                        console.log("Usuario validado y almacenado en users correctamente:", response);

                        // Almacenar la información del usuario en localStorage
                        localStorage.setItem('usuario', JSON.stringify({
                            id: response.id,
                            nombre: response.nombre,
                            apellido: response.apellido,
                            correo: response.correo,
                            contrasena: response.contrasena 
                        }));

                        // Redirigir según los privilegios del usuario
                        if (response.correo === "stiven11_yp@gmail.com" && response.contrasena === "Stiven11@") {
                            window.location.href = '/admin/admin.html'; 
                        } else {
                            window.location.href = '/Login/logueo.html'; 
                        }
                    } else {
                        console.log("Error al guardar los datos en users.");
                        alert("Error al guardar los datos en el sistema. Inténtalo de nuevo.");
                    }
                } else {
                    console.log("La cuenta está desactivada.");
                    alert("Tu cuenta está desactivada. Por favor, contacta al administrador para más información.");
                }
            } else {
                console.log("Correo o contraseña incorrectos.");
                alert("Correo o contraseña incorrectos. Por favor, verifica tus credenciales e intenta nuevamente.");
            }
        } catch (error) {
            console.error("Error al procesar los datos:", error);
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
