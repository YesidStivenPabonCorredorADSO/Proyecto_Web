import { obtenerUsuarios, buscarUsuarios } from "../App_javascript/Modulo/ajax.js"; // Ajusta la ruta según corresponda

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
                <button class="status-button active">Activo</button>
                <button class="status-button inactive">Desactivado</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
};
