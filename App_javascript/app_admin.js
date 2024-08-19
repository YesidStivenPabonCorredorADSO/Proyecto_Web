import { obtenerUsuarios, buscarUsuarios, actualizarEstadoUsuario } from "../App_javascript/Modulo/ajax.js"; // Asegúrate de que la ruta sea correcta

document.addEventListener('DOMContentLoaded', async () => {
    let usuarios = [];

    try {
        // Obtener los datos de los usuarios al cargar la página
        usuarios = await obtenerUsuarios('Users_registro');
        mostrarUsuarios(usuarios);
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        alert('Hubo un problema al cargar los datos. Inténtalo de nuevo más tarde.');
    }

    // Evento para buscar usuarios
    document.getElementById('search-button').addEventListener('click', async () => {
        const query = document.querySelector('#search-input').value.trim();

        try {
            const resultados = await buscarUsuarios(query);
            mostrarUsuarios(resultados);
        } catch (error) {
            console.error('Error en la búsqueda:', error);
            alert('Hubo un problema al buscar los usuarios. Inténtalo de nuevo más tarde.');
        }
    });
});

// Función para mostrar usuarios en la tabla
const mostrarUsuarios = (usuarios) => {
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = ''; // Limpiar cualquier contenido existente

    usuarios.forEach(usuario => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.apellido}</td>
            <td>${usuario.correo}</td>
            <td>${usuario.contrasena}</td>
            <td>
                <button class="status-button ${usuario.activo ? 'active' : 'inactive'}" data-id="${usuario.id}" data-estado="${usuario.activo}">${usuario.activo ? 'Activo' : 'Desactivado'}</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Añadir eventos de click a los botones
    document.querySelectorAll('.status-button').forEach(button => {
        button.addEventListener('click', async (event) => {
            const id = event.target.dataset.id;
            const estado = event.target.dataset.estado === "true";

            try {
                // Llamar a la función para actualizar el estado del usuario
                await actualizarEstadoUsuario(id, !estado);
                alert(`Usuario ${estado ? 'desactivado' : 'activado'} con éxito`);

                // Volver a cargar los usuarios para actualizar la tabla
                const usuariosActualizados = await obtenerUsuarios('Users_registro');
                mostrarUsuarios(usuariosActualizados);
            } catch (error) {
                console.error('Error al actualizar el estado del usuario:', error);
                alert('Hubo un problema al actualizar el estado del usuario. Inténtalo de nuevo más tarde.');
            }
        });
    });
};
