// app_perfil.js

import { editar_guardar, eliminar } from "../App_javascript/Modulo/ajax.js";

document.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log('Usuario cargado:', usuario);

    if (usuario) {
        const nombreInput = document.getElementById('nombre');
        const apellidoInput = document.getElementById('apellido');
        const correoInput = document.getElementById('correo');
        const contrasenaInput = document.getElementById('contrasena');
        const estadoActivoInput = document.getElementById('estado_activo');
        const userCorreo = document.getElementById('user-correo');
        const userName = document.getElementById('user-name');
        const editarButton = document.getElementById('Button_editar');
        const guardarButton = document.getElementById('Button_guardar');
        const cerrarSesionButton = document.getElementById('Button_cerrar_sesion');
        const eliminarButton = document.getElementById('Button_eliminar');

        // Inicializar los campos con la información del usuario
        if (userCorreo) userCorreo.textContent = `Correo: ${usuario.correo || 'No disponible'}`;
        if (userName) userName.textContent = `Nombre: ${usuario.nombre || 'No disponible'}`;
        if (nombreInput) nombreInput.value = usuario.nombre || '';
        if (apellidoInput) apellidoInput.value = usuario.apellido || '';
        if (correoInput) correoInput.value = usuario.correo || '';
        if (contrasenaInput) contrasenaInput.value = usuario.contrasena || ''; 
        if (estadoActivoInput) estadoActivoInput.textContent = `Estado Activo: ${usuario.estado_activo ? 'Sí' : 'No'}`;

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
                nombreInput.removeAttribute('disabled');
                apellidoInput.removeAttribute('disabled');
                correoInput.removeAttribute('disabled');
                contrasenaInput.removeAttribute('disabled');
                editarButton.style.display = 'none';
                guardarButton.style.display = 'inline';
            });
        }

        if (guardarButton) {
            guardarButton.addEventListener('click', async () => {
                try {
                    const updatedUserData = {
                        id: usuario.id,
                        nombre: nombreInput.value,
                        apellido: apellidoInput.value,
                        correo: correoInput.value,
                        contrasena: contrasenaInput.value
                    };

                    const result = await editar_guardar(usuario.id, updatedUserData, 'Users_registro');

                    if (result.error) {
                        console.error('Error al editar los datos:', result.error);
                        alert('Error al actualizar los datos. Inténtalo de nuevo más tarde.');
                    } else {
                        console.log('Datos actualizados en el servidor:', result);
                        alert('Datos actualizados exitosamente.');

                        localStorage.setItem('usuario', JSON.stringify(updatedUserData));
                        
                        nombreInput.setAttribute('disabled', 'true');
                        apellidoInput.setAttribute('disabled', 'true');
                        correoInput.setAttribute('disabled', 'true');
                        contrasenaInput.setAttribute('disabled', 'true');
                        editarButton.style.display = 'inline'; 
                        guardarButton.style.display = 'none';
                    }
                } catch (error) {
                    console.error('Error al enviar la edición:', error);
                    alert('Hubo un error al actualizar los datos. Inténtalo de nuevo más tarde.');
                }
            });
        }

        if (cerrarSesionButton) {
            cerrarSesionButton.addEventListener('click', () => {
                localStorage.clear();
                window.location.href = '/Login/logueo.html';
            });
        }

        if (eliminarButton) {
            eliminarButton.addEventListener('click', async () => {
                if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
                    try {
                        const result = await eliminar(usuario.id, 'Users_registro');
                        
                        if (result.error) {
                            console.error('Error al eliminar el usuario:', result.error);
                            alert('Error al eliminar el usuario. Inténtalo de nuevo más tarde.');
                        } else {
                            console.log('Usuario eliminado:', result);
                            alert('Usuario eliminado exitosamente.');
                            localStorage.clear();
                            window.location.href = '/Login/logueo.html'; 
                        }
                    } catch (error) {
                        console.error('Error al eliminar el usuario:', error);
                        alert('Hubo un error al eliminar el usuario. Inténtalo de nuevo más tarde.');
                    }
                }
            });
        }
    } else {
        console.log("No se encontró información del usuario.");
    }
});
