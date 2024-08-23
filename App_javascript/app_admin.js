import { obtenerUsuarios, buscarUsuarios, actualizarEstadoUsuario, eliminarUsuario, obtenerUsuarioPorCredenciales } from "../App_javascript/Modulo/usuarios.js";
import { obtenerVehiculos, buscarVehiculos, eliminarVehiculo } from "../App_javascript/Modulo/vehiculos.js";
import { obtenerEstadoClima, buscarEstadoClima, eliminarEstadoClima } from "../App_javascript/Modulo/estadoClima.js";


// Mostrar los datos del usuario actual al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
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
    
    // Cargar la vista por defecto (Usuarios)
    mostrarSeccionUsuarios();
    
    // Eventos para los botones
    document.getElementById('btn-usuario').addEventListener('click', mostrarSeccionUsuarios);
    document.getElementById('btn-vehiculos').addEventListener('click', mostrarSeccionVehiculos);
    document.getElementById('btn-clima').addEventListener('click', mostrarSeccionClima);
});

// Función para mostrar la sección de Usuarios
const mostrarSeccionUsuarios = async () => {
    const contentContainer = document.getElementById('content-container');
    contentContainer.innerHTML = `
        <h2 class="main__section--article--titulo">Datos Registrados</h2>
        <div class="search-container">
            <input id="search-input" class="main__section--input" type="text" placeholder="Buscar por ID o Nombre">
            <button class="main__section--input input__diferent" id="search-button">Buscar</button>
        </div>
        <table class="main__section--table" id="data-table">
            <thead class="main__section--table--thead">
                <tr class="main__section--table--thead--row">
                    <th class="main__section--table--thead--cell">ID</th>
                    <th class="main__section--table--thead--cell">Nombre</th>
                    <th class="main__section--table--thead--cell">Apellido</th>
                    <th class="main__section--table--thead--cell">Correo</th>
                    <th class="main__section--table--thead--cell">Contraseña</th>
                    <th class="main__section--table--thead--cell">Acción</th>
                </tr>
            </thead>
            <tbody class="main__section--table--tbody">
                <!-- Las filas de datos se agregarán aquí dinámicamente -->
            </tbody>
        </table>
    `;
    
    let usuarios = [];
    try {
        usuarios = await obtenerUsuarios('registros');
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
};

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
                <button class="status-button activate" data-id="${usuario.id}" ${usuario.activo ? 'disabled' : ''}>Activar</button>
                <button class="status-button deactivate" data-id="${usuario.id}" ${!usuario.activo ? 'disabled' : ''}>Desactivar</button>
                <button class="status-button delete" data-id="${usuario.id}">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Añadir eventos de click a los botones
    document.querySelectorAll('.activate').forEach(button => {
        button.addEventListener('click', async (event) => {
            const id = event.target.dataset.id;
            try {
                await actualizarEstadoUsuario(id, true);
                alert('Usuario activado con éxito');
                const usuariosActualizados = await obtenerUsuarios('registros');
                mostrarUsuarios(usuariosActualizados);
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
                await actualizarEstadoUsuario(id, false);
                alert('Usuario desactivado con éxito');
                const usuariosActualizados = await obtenerUsuarios('registros');
                mostrarUsuarios(usuariosActualizados);
            } catch (error) {
                console.error('Error al desactivar el usuario:', error);
                alert('Hubo un problema al desactivar el usuario. Inténtalo de nuevo más tarde.');
            }
        });
    });

    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', async (event) => {
            const id = event.target.dataset.id;
            try {
                await eliminarUsuario(id, 'registros');
                alert('Usuario eliminado con éxito');
                const usuariosActualizados = await obtenerUsuarios('registros');
                mostrarUsuarios(usuariosActualizados);
            } catch (error) {
                console.error('Error al eliminar el usuario:', error);
                alert('Hubo un problema al eliminar el usuario. Inténtalo de nuevo más tarde.');
            }
        });
    });
};

// Función para mostrar la sección de Vehículos
const mostrarSeccionVehiculos = async () => {
    const contentContainer = document.getElementById('content-container');
    contentContainer.innerHTML = `
        <h2 class="main__section--article--titulo">Vehículos Registrados</h2>
        <div class="search-container">
            <input id="search-input-vehiculo" class="main__section--input" type="text" placeholder="Buscar por ID o Nombre">
            <button class="main__section--input input__diferent" id="search-button-vehiculo">Buscar</button>
        </div>
        <table class="main__section--table" id="vehiculos-table">
            <thead class="main__section--table--thead">
                <tr class="main__section--table--thead--row">
                    <th class="main__section--table--thead--cell">ID</th>
                    <th class="main__section--table--thead--cell">Nombre</th>
                    <th class="main__section--table--thead--cell">Acción</th>
                </tr>
            </thead>
            <tbody class="main__section--table--tbody">
                <!-- Las filas de datos se agregarán aquí dinámicamente -->
            </tbody>
        </table>
        <button id="add-vehiculo" class="main__section--input input__diferent">Agregar Vehículo</button>
    `;
    
    let vehiculos = [];
    try {
        vehiculos = await obtenerVehiculos('vehiculos');
        mostrarVehiculos(vehiculos);
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        alert('Hubo un problema al cargar los datos. Inténtalo de nuevo más tarde.');
    }

    // Evento para buscar vehículos
    document.getElementById('search-button-vehiculo').addEventListener('click', async () => {
        const query = document.querySelector('#search-input-vehiculo').value.trim();
        try {
            const resultados = await buscarVehiculos(query);
            mostrarVehiculos(resultados);
        } catch (error) {
            console.error('Error en la búsqueda:', error);
            alert('Hubo un problema al buscar los vehículos. Inténtalo de nuevo más tarde.');
        }
    });

    // Evento para agregar vehículo
    document.getElementById('add-vehiculo').addEventListener('click', () => {
        window.location.href = '/agregar-vehiculo.html';
    });
};

// Función para mostrar vehículos en la tabla
const mostrarVehiculos = (vehiculos) => {
    const tableBody = document.querySelector('#vehiculos-table tbody');
    tableBody.innerHTML = ''; // Limpiar cualquier contenido existente

    vehiculos.forEach(vehiculo => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${vehiculo.id}</td>
            <td>${vehiculo.nombre}</td>
            <td>
                <button class="status-button delete" data-id="${vehiculo.id}">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Añadir eventos de click a los botones
    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', async (event) => {
            const id = event.target.dataset.id;
            try {
                await eliminarVehiculo(id);
                alert('Vehículo eliminado con éxito');
                const vehiculosActualizados = await obtenerVehiculos('vehiculos');
                mostrarVehiculos(vehiculosActualizados);
            } catch (error) {
                console.error('Error al eliminar el vehículo:', error);
                alert('Hubo un problema al eliminar el vehículo. Inténtalo de nuevo más tarde.');
            }
        });
    });
};

// Función para mostrar la sección de Estado Clima
const mostrarSeccionClima = async () => {
    const contentContainer = document.getElementById('content-container');
    contentContainer.innerHTML = `
        <h2 class="main__section--article--titulo">Estados Climáticos Registrados</h2>
        <div class="search-container">
            <input id="search-input-clima" class="main__section--input" type="text" placeholder="Buscar por ID o Estado">
            <button class="main__section--input input__diferent" id="search-button-clima">Buscar</button>
        </div>
        <table class="main__section--table" id="clima-table">
            <thead class="main__section--table--thead">
                <tr class="main__section--table--thead--row">
                    <th class="main__section--table--thead--cell">ID</th>
                    <th class="main__section--table--thead--cell">Estado</th>
                    <th class="main__section--table--thead--cell">Acción</th>
                </tr>
            </thead>
            <tbody class="main__section--table--tbody">
                <!-- Las filas de datos se agregarán aquí dinámicamente -->
            </tbody>
        </table>
        <button id="add-clima" class="main__section--input input__diferent">Agregar Estado Climático</button>
    `;
    
    let estadosClima = [];
    try {
        estadosClima = await obtenerEstadoClima('estados_clima');
        mostrarEstadosClima(estadosClima);
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        alert('Hubo un problema al cargar los datos. Inténtalo de nuevo más tarde.');
    }

    // Evento para buscar estados climáticos
    document.getElementById('search-button-clima').addEventListener('click', async () => {
        const query = document.querySelector('#search-input-clima').value.trim();
        try {
            const resultados = await buscarEstadoClima(query);
            mostrarEstadosClima(resultados);
        } catch (error) {
            console.error('Error en la búsqueda:', error);
            alert('Hubo un problema al buscar los estados climáticos. Inténtalo de nuevo más tarde.');
        }
    });

    // Evento para agregar estado climático
    document.getElementById('add-clima').addEventListener('click', () => {
        window.location.href = '/agregar-clima.html';
    });
};

// Función para mostrar estados climáticos en la tabla
const mostrarEstadosClima = (estadosClima) => {
    const tableBody = document.querySelector('#clima-table tbody');
    tableBody.innerHTML = ''; // Limpiar cualquier contenido existente

    estadosClima.forEach(estado => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${estado.id}</td>
            <td>${estado.estado}</td>
            <td>
                <button class="status-button delete" data-id="${estado.id}">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Añadir eventos de click a los botones
    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', async (event) => {
            const id = event.target.dataset.id;
            try {
                await eliminarEstadoClima(id);
                alert('Estado climático eliminado con éxito');
                const estadosClimaActualizados = await obtenerEstadoClima('estado_clima');
                mostrarEstadosClima(estadosClimaActualizados);
            } catch (error) {
                console.error('Error al eliminar el estado climático:', error);
                alert('Hubo un problema al eliminar el estado climático. Inténtalo de nuevo más tarde.');
            }
        });
    });
};
