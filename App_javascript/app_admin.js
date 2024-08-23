import { obtenerUsuarios, buscarUsuarios, actualizarEstadoUsuario, eliminarUsuario, obtenerUsuarioPorCredenciales } from "./Modulo/ajax.js";
import { obtenerVehiculos, buscarVehiculos, eliminarVehiculo } from "./Modulo/ajax.js";
import { obtenerEstadoClima, buscarEstadoClima, eliminarEstadoClima } from "./Modulo/ajax.js";


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
// Función para mostrar el formulario de agregar vehículo
const mostrarFormularioAgregarVehiculo = () => {
    const contentContainer = document.getElementById('content-container');
    contentContainer.innerHTML = `
        <h2 class="main__section--article--titulo">Agregar Nuevo Vehículo</h2>
        <form id="add-vehicle-form">
            <label for="vehicle-name">Nombre del Vehículo:</label>
            <input type="text" id="vehicle-name" name="vehicle-name" required>
            <input type="text" id="vehicle-porcentaje" name="vehicle-name" required>
            <button type="button" id="cancel-add-vehicle">Cancelar</button>
            <button type="submit" id="submit-add-vehicle">Agregar</button>
        </form>
    `;

    // Evento para cancelar el formulario
    document.getElementById('cancel-add-vehicle').addEventListener('click', mostrarSeccionVehiculos);

    // Evento para enviar el formulario
    document.getElementById('add-vehicle-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const vehicleName = document.getElementById('vehicle-name').value.trim();
        const vehiculo_valor=document.getElementById('vehicle-porcentaje').value.trim()

        if (vehicleName) {
            try {
                const response = await fetch('http://localhost:3000/vehiculos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ vehiculo: vehicleName,valor: vehiculo_valor }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                alert('Vehículo agregado con éxito');
                mostrarSeccionVehiculos(); // Regresa a la lista de vehículos
            } catch (error) {
                console.error('Error al agregar vehículo:', error);
                alert('Hubo un problema al agregar el vehículo. Inténtalo de nuevo más tarde.');
            }
        } else {
            alert('Por favor, ingresa un nombre para el vehículo.');
        }
    });
};

// Función para mostrar el formulario de edición de vehículo
const mostrarFormularioEditarVehiculo = async (id) => {
    const contentContainer = document.getElementById('content-container');
    try {
        const response = await fetch(`http://localhost:3000/vehiculos/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const vehiculo = await response.json();

        contentContainer.innerHTML = `
            <h2 class="main__section--article--titulo">Editar Vehículo</h2>
            <form id="edit-vehicle-form">
                <label for="edit-vehicle-name">Nombre del Vehículo:</label>
                <input type="text" id="edit-vehicle-name" name="vehicle-name" value="${vehiculo.vehiculo}" required>
                <input type="text" id="edit-vehicle-name" name="vehicle-name" value="${vehiculo.valor}" required>
                <button type="button" id="cancel-edit-vehicle">Cancelar</button>
                <button type="submit" id="submit-edit-vehicle">Guardar Cambios</button>
            </form>
        `;

        // Evento para cancelar la edición
        document.getElementById('cancel-edit-vehicle').addEventListener('click', mostrarSeccionVehiculos);

        // Evento para enviar el formulario de edición
        document.getElementById('edit-vehicle-form').addEventListener('submit', async (event) => {
            event.preventDefault();
            const vehicleName = document.getElementById('edit-vehicle-name').value.trim();

            if (vehicleName) {
                try {
                    const response = await fetch(`http://localhost:3000/vehiculos/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ vehiculo: vehicleName }),
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    alert('Vehículo actualizado con éxito');
                    mostrarSeccionVehiculos(); // Regresa a la lista de vehículos
                } catch (error) {
                    console.error('Error al actualizar vehículo:', error);
                    alert('Hubo un problema al actualizar el vehículo. Inténtalo de nuevo más tarde.');
                }
            } else {
                alert('Por favor, ingresa un nombre para el vehículo.');
            }
        });
    } catch (error) {
        console.error('Error al cargar los datos del vehículo:', error);
        alert('Hubo un problema al cargar los datos del vehículo. Inténtalo de nuevo más tarde.');
    }
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
                    <th class="main__section--table--thead--cell">Porcentaje</th>
                    <th class="main__section--table--thead--cell">Acción</th>
                    
                </tr>
            </thead>
            <tbody class="main__section--table--tbody">
                <!-- Las filas de datos se agregarán aquí dinámicamente -->
            </tbody>
        </table>
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

    // Evento para agregar vehículo (fuera del formulario)
    // document.getElementById('add-vehiculo').addEventListener('click', mostrarFormularioAgregarVehiculo);
};

// Función para mostrar vehículos en la tabla
const mostrarVehiculos = (vehiculos) => {
    const tableBody = document.querySelector('#vehiculos-table tbody');
    tableBody.innerHTML = ''; // Limpiar cualquier contenido existente

    vehiculos.forEach(vehiculo => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${vehiculo.id}</td>
            <td>${vehiculo.vehiculo}</td>
            <td>${vehiculo.valor}%</td>
            <td>
                <button class="status-button edit" data-id="${vehiculo.id}">Editar</button>
                <button class="status-button delete" data-id="${vehiculo.id}">Eliminar</button>
                <button class="status-button add" data-id="${vehiculo.id}">Agregar Vehículo</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Asignar funcionalidad al botón "Agregar Vehículo"
    const addButtons = document.querySelectorAll('.status-button.add');
    addButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const vehiculoId = event.target.getAttribute('data-id');
            
            mostrarFormularioAgregarVehiculo();
            console.log(`Agregar vehículo con ID: ${vehiculoId}`);
        });
    });

        // Asignar funcionalidad al botón "Agregar Vehículo"
        const deleteButtons = document.querySelectorAll('.status-button.delete');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const vehiculoId = event.target.getAttribute('data-id');
                eliminarVehiculo(vehiculoId);
                mostrarSeccionVehiculos();
                console.log(`Agregar vehículo con ID: ${vehiculoId}`);
            });
        });

    // Asignar funcionalidad al botón "Editar"
    const editButtons = document.querySelectorAll('.status-button.edit');
    editButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const vehiculoId = event.target.getAttribute('data-id');
            mostrarFormularioEditarVehiculo(vehiculoId);
        });
    });
};


// Función para mostrar el formulario de agregar estado climático
const mostrarFormularioAgregarEstadoClimatico = () => {
    const contentContainer = document.getElementById('content-container');
    contentContainer.innerHTML = `
        <h2 class="main__section--article--titulo">Agregar Nuevo Estado Climático</h2>
        <form id="add-clima-form">
            <label for="estado-climatico">Nombre del Estado Climático:</label>
            <input type="text" id="estado-climatico" name="estado-climatico" value="" required>
            <input type="text" id="estado-climatico-valor" name="estado-climatico" value="" required>
            <button type="button" id="cancel-add-clima">Cancelar</button>
            <button type="submit" id="submit-add-clima">Agregar</button>
        </form>
    `;

    // Asignar eventos a los botones del formulario
    document.getElementById('cancel-add-clima').addEventListener('click', mostrarSeccionClima);
    document.getElementById('add-clima-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const estadoClimatico = document.getElementById('estado-climatico').value.trim();
        const estado_valor = document.getElementById('estado-climatico-valor').value.trim();
        const valor = estado_valor
        const estados_clima=estadoClimatico
        if (estadoClimatico) {
            try {
                const response = await fetch('http://localhost:3000/estados_clima', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ estados_clima, valor }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                alert('Estado climático agregado con éxito');
                mostrarSeccionClima(); // Regresa a la lista de estados climáticos
            } catch (error) {
                console.error('Error al agregar estado climático:', error);
                alert('Hubo un problema al agregar el estado climático. Inténtalo de nuevo más tarde.');
            }
        } else {
            alert('Por favor, ingresa un nombre para el estado climático.');
        }
    });
};

// Función para mostrar el formulario de edición de estado climático
const mostrarFormularioEditarEstadoClimatico = async (id) => {
    const contentContainer = document.getElementById('content-container');
    try {
        const response = await fetch(`http://localhost:3000/estados_clima/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const estadoClimatico = await response.json();

        contentContainer.innerHTML = `
            <h2 class="main__section--article--titulo">Editar Estado Climático</h2>
            <form id="edit-clima-form">
                <label for="edit-estado-climatico">Nombre del Estado Climático:</label>
                <input type="text" id="edit-estado-climatico" name="estado-climatico" value="${estadoClimatico.estados_clima}" required>
                <input type="text" id="edit-estado-climatico-valor" name="estado-valor" value="${estadoClimatico.valor}" required>
                <button type="button" id="cancel-edit-clima">Cancelar</button>
                <button type="submit" id="submit-edit-clima">Guardar Cambios</button>
            </form>
        `;
        console.log(estadoClimatico.estados_clima)
        // Asignar eventos a los botones del formulario
        document.getElementById('cancel-edit-clima').addEventListener('click', mostrarSeccionClima);
        document.getElementById('edit-clima-form').addEventListener('submit', async (event) => {
            event.preventDefault();
            const estadoClimatico = document.getElementById('edit-estado-climatico').value.trim();
            const estados_clima=estadoClimatico 
            const estado_Valor=document.getElementById('edit-estado-climatico-valor').value.trim();
            const valor = estado_Valor
            console.log(estadoClimatico)
            if (estadoClimatico && estado_Valor) {
                try {
                    const response = await fetch(`http://localhost:3000/estados_clima/${id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ estados_clima, valor}),
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    alert('Estado climático actualizado con éxito');
                    mostrarSeccionClima(); // Regresa a la lista de estados climáticos
                } catch (error) {
                    console.error('Error al actualizar estado climático:', error);
                    alert('Hubo un problema al actualizar el estado climático. Inténtalo de nuevo más tarde.');
                }
            } else {
                alert('Por favor, ingresa un nombre para el estado climático.');
            }
        });
    } catch (error) {
        console.error('Error al cargar los datos del estado climático:', error);
        alert('Hubo un problema al cargar los datos del estado climático. Inténtalo de nuevo más tarde.');
    }
};

// Función para mostrar la sección de Estados Climáticos
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
                    <th class="main__section--table--thead--cell">Porcentaje</th>
                    <th class="main__section--table--thead--cell">Acción</th>
                </tr>
            </thead>
            <tbody class="main__section--table--tbody">
            
            </tbody>
        </table>
    `;

    // Cargar y mostrar los estados climáticos
    try {
        const estadosClima = await obtenerEstadoClima('estados_clima');
        mostrarEstadosClima(estadosClima);
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        alert('Hubo un problema al cargar los datos. Inténtalo de nuevo más tarde.');
    }

    // Asignar eventos a los botones de búsqueda y agregar
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

    // document.getElementById('add-clima').addEventListener('click', mostrarFormularioAgregarEstadoClimatico);
};

// Función para mostrar estados climáticos en la tabla
const mostrarEstadosClima = (estadosClima) => {
    const tableBody = document.querySelector('#clima-table tbody');
    tableBody.innerHTML = ''; // Limpiar cualquier contenido existente

    estadosClima.forEach(estado => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${estado.id}</td>
            <td>${estado.estados_clima}</td>
            <td>${estado.valor}%</td>
            <td>
                <button class="status-button edit" data-id="${estado.id}">Editar</button>
                <button class="status-button delete" data-id="${estado.id}">Eliminar</button>
                <button class="status-button add" data-id="${estado.id}">Agregar estados del clima</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Asignar eventos a los botones después de agregar las filas
    asignarEventosEstadoClimatico();
};

// Función para manejar eventos de los botones
const asignarEventosEstadoClimatico = () => {
    // Asignar eventos a los botones de editar y eliminar
    document.querySelectorAll('.status-button.edit').forEach(button => {
        button.addEventListener('click', (event) => {
            const estadoId = event.target.getAttribute('data-id');
            mostrarFormularioEditarEstadoClimatico(estadoId);
        });
    });

    document.querySelectorAll('.status-button.delete').forEach(button => {
        button.addEventListener('click', async (event) => {
            const id = event.target.getAttribute('data-id');
            try {
                await eliminarEstadoClima(id);
                alert('Estado climático eliminado con éxito');
                const estadosClimaActualizados = await obtenerEstadoClima('estados_clima');
                mostrarEstadosClima(estadosClimaActualizados);
            } catch (error) {
                console.error('Error al eliminar el estado climático:', error);
                alert('Hubo un problema al eliminar el estado climático. Inténtalo de nuevo más tarde.');
            }
        });
    });

    document.querySelectorAll('.status-button.add').forEach(button => {
        button.addEventListener('click', (event) => {
            const estadoId = event.target.getAttribute('data-id');
            mostrarFormularioAgregarEstadoClimatico(estadoId ); // Aquí podrías manejar si el estado es un nuevo estado o ya existe
        });
    });
};
