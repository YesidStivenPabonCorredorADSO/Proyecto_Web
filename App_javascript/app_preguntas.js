import { validacion_select } from "./Modulo/preguntas.js";
import { enviar, obtenerUsuarios } from "./Modulo/ajax.js";

const $select_vehiculo = document.getElementById("vehiculo");
const $select_ambiente = document.getElementById("ambiente");
const $button_preguntas = document.getElementById("button_preguntas");

// Función para cargar los datos dinámicamente en los selects
const cargarDatosDinamicos = async () => {
    try {
        // Obtener datos desde las fuentes
        const vehiculos = await obtenerUsuarios('vehiculos');
        const estadosClima = await obtenerUsuarios('estados_clima');

        // Rellenar el select de vehículos
        vehiculos.forEach(vehiculo => {
            const option = document.createElement('option');
            option.value = vehiculo.vehiculo;
            option.textContent = vehiculo.vehiculo;
            $select_vehiculo.appendChild(option);
        });

        // Rellenar el select de estados de clima
        estadosClima.forEach(estado => {
            const option = document.createElement('option');
            option.value = estado.estados;
            option.textContent = estado.estados;
            $select_ambiente.appendChild(option);
        });

    } catch (error) {
        console.error("Error al cargar los datos dinámicos:", error);
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    // Cargar los datos dinámicos al cargar la página
    await cargarDatosDinamicos();

    // Obtener y mostrar la información del usuario
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
        const userCorreo = document.getElementById('user-correo');
        const userName = document.getElementById('user-name');
        
        if (userCorreo) userCorreo.textContent = `Correo: ${usuario.correo}`;
        if (userName) userName.textContent = `Nombre: ${usuario.nombre}`;
    } else {
        console.log("No se encontró información del usuario.");
    }
});

$select_vehiculo.addEventListener("change", () => {
    validacion_select();
});

$select_ambiente.addEventListener("change", () => {
    validacion_select();
});

const manejarEnvio = async () => {
    const valid = validacion_select();
    if (valid) {
        console.log("Formulario válido. Enviando datos...");
        const vehiculo = $select_vehiculo.value;
        const ambiente = $select_ambiente.value;
        const porcentaje = calcularPorcentaje(vehiculo, ambiente);
        console.log("Porcentaje calculado:", porcentaje);  // Registro de porcentaje
        const data = {
            vehiculo,
            ambiente,
            porcentaje,
        };
        const response = await enviar(data, 'preguntas');
        if (response.error) {
            console.error("Error en la respuesta:", response.error);
        } else {
            localStorage.setItem('porcentaje', porcentaje);  // Guardar porcentaje en localStorage
            console.log("Porcentaje guardado:", porcentaje);  // Confirmación de almacenamiento
            window.location.href = '/Login/logueo_preguntas2.html';  // Asegúrate de que la ruta sea correcta
        }
    } else {
        console.log("Formulario no válido. Revisa los campos.");
    }
};

$button_preguntas.addEventListener("click", (event) => {
    event.preventDefault();
    manejarEnvio();
});
