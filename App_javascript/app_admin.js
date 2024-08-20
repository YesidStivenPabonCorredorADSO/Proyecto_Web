import { obtenerUsuarios, buscarUsuarios, actualizarEstadoUsuario } from "../App_javascript/Modulo/ajax.js";

// Mostrar los datos del usuario actual al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
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

    let usuarios = [];

    try {
        // Obtener los datos de los usuarios al cargar la página
        usuarios = await obtenerUsuarios('Users_registro');
        mostrarUsuarios(usuarios, usuario.id); // Pasar el ID del usuario actual
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        alert('Hubo un problema al cargar los datos. Inténtalo de nuevo más tarde.');
    }

    // Evento para buscar usuarios
    document.getElementById('search-button').addEventListener('click', async () => {
        const query = document.querySelector('#search-input').value.trim();

        try {
            const resultados = await buscarUsuarios(query);
            mostrarUsuarios(resultados, usuario.id); // Pasar el ID del usuario actual
        } catch (error) {
            console.error('Error en la búsqueda:', error);
            alert('Hubo un problema al buscar los usuarios. Inténtalo de nuevo más tarde.');
        }
    });
});

// Función para mostrar usuarios en la tabla
const mostrarUsuarios = (usuarios, usuarioActualId) => {
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = ''; // Limpiar cualquier contenido existente

    usuarios.forEach(usuario => {
        // Si el usuario actual es el admin, deshabilitar botones
        const isCurrentUser = usuario.id === usuarioActualId;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.apellido}</td>
            <td>${usuario.correo}</td>
            <td>${usuario.contrasena}</td>
            <td>
                <button class="status-button activate" data-id="${usuario.id}" ${usuario.activo || isCurrentUser ? 'disabled' : ''}>Activar</button>
                <button class="status-button deactivate" data-id="${usuario.id}" ${!usuario.activo || isCurrentUser ? 'disabled' : ''}>Desactivar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Añadir eventos de click a los botones
    document.querySelectorAll('.activate').forEach(button => {
        button.addEventListener('click', async (event) => {
            const id = event.target.dataset.id;

            try {
                // Activar usuario
                await actualizarEstadoUsuario(id, true);
                alert('Usuario activado con éxito');

                // Volver a cargar los usuarios para actualizar la tabla
                const usuariosActualizados = await obtenerUsuarios('Users_registro');
                mostrarUsuarios(usuariosActualizados, usuarioActualId); // Pasar el ID del usuario actual
            } catch (error) {
                console.error('Error al activar el usuario:', error);
                alert('Hubo un problema al activar el usuario. Inténtalo de nuevo más tarde.');
            }
        });
    });

    document.querySelectorAll('.deactivate').forEach(button => {
        button.addEventListener('click', async (event) => {
            const id = event.target.dataset.id;

            try {
                // Desactivar usuario
                await actualizarEstadoUsuario(id, false);
                alert('Usuario desactivado con éxito');

                // Volver a cargar los usuarios para actualizar la tabla
                const usuariosActualizados = await obtenerUsuarios('Users_registro');
                mostrarUsuarios(usuariosActualizados, usuarioActualId); // Pasar el ID del usuario actual
            } catch (error) {
                console.error('Error al desactivar el usuario:', error);
                alert('Hubo un problema al desactivar el usuario. Inténtalo de nuevo más tarde.');
            }
        });
    });
};

