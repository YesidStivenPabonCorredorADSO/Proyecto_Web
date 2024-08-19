import { editar_guardar } from "../App_javascript/Modulo/ajax.js";

document.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log('Usuario cargado:', usuario);

    if (usuario) {
        const userCorreo = document.getElementById('user-correo');
        const userName = document.getElementById('user-name');
        const nombreInput = document.getElementById('nombre');
        const apellidoInput = document.getElementById('apellido');
        const correoInput = document.getElementById('correo');
        const contrasenaInput = document.getElementById('contrasena');
        const editarButton = document.getElementById('Button_editar');
        const guardarButton = document.getElementById('Button_guardar');
        const cerrarSesionButton = document.getElementById('Button_cerrar_sesion');

        // Inicializar los campos con la información del usuario
        if (userCorreo) userCorreo.textContent = `Correo: ${usuario.correo || 'No disponible'}`;
        if (userName) userName.textContent = `Nombre: ${usuario.nombre || 'No disponible'}`;
        if (nombreInput) nombreInput.value = usuario.nombre || '';
        if (apellidoInput) apellidoInput.value = usuario.apellido || '';
        if (correoInput) correoInput.value = usuario.correo || '';
        if (contrasenaInput) contrasenaInput.value = usuario.contrasena || '';

        const updateLocalStorage = () => {
            localStorage.setItem('usuario', JSON.stringify(usuario));
            if (userName) userName.textContent = `Nombre: ${usuario.nombre}`;
            if (userCorreo) userCorreo.textContent = `Correo: ${usuario.correo}`;
        };

        if (nombreInput) {
            nombreInput.addEventListener('input', () => {
                usuario.nombre = nombreInput.value;
                updateLocalStorage();
            });
        }

        if (apellidoInput) {
            apellidoInput.addEventListener('input', () => {
                usuario.apellido = apellidoInput.value;
                updateLocalStorage();
            });
        }

        if (correoInput) {
            correoInput.addEventListener('input', () => {
                usuario.correo = correoInput.value;
                updateLocalStorage();
            });
        }

        if (contrasenaInput) {
            contrasenaInput.addEventListener('input', () => {
                usuario.contrasena = contrasenaInput.value;
                updateLocalStorage();
            });
        }

        if (editarButton) {
            editarButton.addEventListener('click', () => {
                // Habilitar campos para edición
                nombreInput.removeAttribute('disabled');
                apellidoInput.removeAttribute('disabled');
                correoInput.removeAttribute('disabled');
                contrasenaInput.removeAttribute('disabled');
                editarButton.style.display = 'none'; // Ocultar el botón de editar
                guardarButton.style.display = 'inline'; // Mostrar el botón de guardar
            });
        }

        if (guardarButton) {
            guardarButton.addEventListener('click', async () => {
                try {
                    const updatedUserData = {
                        id: usuario.id,  // Incluyendo el ID en los datos actualizados
                        nombre: nombreInput.value,
                        apellido: apellidoInput.value,
                        correo: correoInput.value,
                        contrasena: contrasenaInput.value
                    };

                    // Usando la función editar_guardar
                    const result = await editar_guardar(usuario.id, updatedUserData, 'Users_registro');

                    if (result.error) {
                        console.error('Error al editar los datos:', result.error);
                        alert('Error al actualizar los datos. Inténtalo de nuevo más tarde.');
                    } else {
                        console.log('Datos actualizados en el servidor:', result);
                        alert('Datos actualizados exitosamente.');

                        // Actualizar el localStorage con la nueva información del usuario
                        localStorage.setItem('usuario', JSON.stringify(updatedUserData));
                        
                        // Deshabilitar campos después de guardar
                        nombreInput.setAttribute('disabled', 'true');
                        apellidoInput.setAttribute('disabled', 'true');
                        correoInput.setAttribute('disabled', 'true');
                        contrasenaInput.setAttribute('disabled', 'true');
                        editarButton.style.display = 'inline'; // Mostrar el botón de editar
                        guardarButton.style.display = 'none'; // Ocultar el botón de guardar
                    }
                } catch (error) {
                    console.error('Error al enviar la edición:', error);
                    alert('Hubo un error al actualizar los datos. Inténtalo de nuevo más tarde.');
                }
            });
        }

        if (cerrarSesionButton) {
            cerrarSesionButton.addEventListener('click', () => {
                // Limpiar localStorage y redirigir a la página de inicio de sesión
                localStorage.clear();
                window.location.href = '/Login/logueo.html';
            });
        }
    } else {
        console.log("No se encontró información del usuario.");
    }
});
