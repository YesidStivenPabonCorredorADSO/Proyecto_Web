import { correo } from "../App_javascript/Modulo/correo.js";
import { contraseña } from "../App_javascript/Modulo/contraseña.js";
import { obtenerUsuarios, enviar } from "./Modulo/ajax.js";  // Importamos obtenerUsuarios

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

            // Obtener los datos del registro para validación
            const usuariosRegistro = await obtenerUsuarios('registros');
            console.log("Usuarios del registro recibidos:", usuariosRegistro);

            // Validar usuario contra los registros
            const usuario = usuariosRegistro.find(user => 
                user.correo === correoInput.value.trim() && 
                user.contrasena === contraseñaInput.value.trim()
            );

            if (usuario) {
                console.log("Usuario encontrado en registros:", usuario);

                // Enviar los datos completos a "users"
                const response = await enviar({
                    id: usuario.id,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    correo: usuario.correo,
                    contrasena: usuario.contrasena
                }, 'users');  // Enviar al endpoint 'users'

                // Validar la respuesta del envío a 'users'
                if (response && response.id) {
                    console.log("Usuario validado y almacenado en users correctamente:", response);

                    // Almacenar la información del usuario en localStorage
                    localStorage.setItem('usuario', JSON.stringify({
                        id: response.id,
                        nombre: response.nombre,
                        apellido: response.apellido,
                        correo: response.correo,
                        contrasena: response.contrasena // o response.contrasena según el nombre de la propiedad
                    }));

                    // Redirigir según los privilegios del usuario
                    if (response.correo === "stiven11_yp@gmail.com" && response.contrasena === "Stiven11@") {
                        window.location.href = '/admin/admin.html'; // Redirigir a admin.html
                    } else {
                        window.location.href = '/Login/logueo.html'; // Redirigir a logueo.html
                    }
                } else {
                    console.log("Error al guardar los datos en users.");
                    alert("Error al guardar los datos en el sistema. Inténtalo de nuevo.");
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
