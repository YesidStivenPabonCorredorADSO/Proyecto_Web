import { validacion_select } from "./Modulo/preguntas.js";
import { enviar, obtenerUsuarios, obtenerEstadoClima } from "./Modulo/ajax.js";

// Referencias a los elementos del DOM
const $select_vehiculo = document.getElementById("vehiculo");
const $select_ambiente = document.getElementById("ambiente");
const $button_preguntas = document.getElementById("button_preguntas");

// Función para cargar los datos dinámicamente en los selects
const cargarDatosDinamicos = async () => {
    try {
        const vehiculos = await obtenerUsuarios('vehiculos');
        const estadosClima = await obtenerEstadoClima('estados_clima');

        vehiculos.forEach(vehiculo => {
            const option = document.createElement('option');
            option.value = vehiculo.valor;
            option.textContent = vehiculo.vehiculo;
            $select_vehiculo.appendChild(option);
        });

        estadosClima.forEach(estado => {
            const option = document.createElement('option');
            option.value = estado.valor;
            option.textContent = estado.estados_clima;
            $select_ambiente.appendChild(option);
        });

    } catch (error) {
        console.error("Error al cargar los datos dinámicos:", error);
    }
};

// Función para almacenar datos en localStorage
const almacenarEnLocalStorage = (clave, valor) => {
    try {
        localStorage.setItem(clave, valor);
        console.log(`Datos almacenados en localStorage: ${clave}`);
    } catch (error) {
        console.error(`Error al almacenar ${clave} en localStorage:`, error);
    }
};

// Función para manejar el envío del formulario
const manejarEnvio = async () => {
    const valid = validacion_select();
    if (valid) {
        console.log("Formulario válido. Enviando datos...");

        const vehiculo = $select_vehiculo.value;
        const ambiente = $select_ambiente.value;
        const porcentaje = (vehiculo + ambiente) / 100;
        console.log(vehiculo, ambiente)
        // Almacenar datos en localStorage
        almacenarEnLocalStorage('preguntas', porcentaje);

        console.log("Porcentaje almacenado en localStorage:", porcentaje);

        const datosAEnviar = {
            vehiculo: vehiculo,
            ambiente: ambiente,
            porcentaje: porcentaje
        };

        try {
            const resultado = await enviar(datosAEnviar, 'preguntas');
            console.log("Datos enviados correctamente:", resultado);

            window.location.href = '/Login/logueo_preguntas2.html';  // Asegúrate de que la ruta sea correcta
        } catch (error) {
            console.error("Error durante el proceso de envío:", error);
        }
    } else {
        console.log("Formulario no válido. Revisa los campos.");
    }
};

// Cargar los datos dinámicamente al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    await cargarDatosDinamicos();

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

// Validación en el cambio de los selects
$select_vehiculo.addEventListener("change", () => {
    validacion_select();
});

$select_ambiente.addEventListener("change", () => {
    validacion_select();
});

// Manejador para el botón de envío
$button_preguntas.addEventListener("click", (event) => {
    event.preventDefault();
    manejarEnvio();
});
