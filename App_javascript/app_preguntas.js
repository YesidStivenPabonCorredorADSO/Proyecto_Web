import { validacion_select } from "./Modulo/preguntas.js";
import { enviar } from "./Modulo/ajax.js";

const $select_vehiculo = document.getElementById("vehiculo");
const $select_ambiente = document.getElementById("ambiente");
const $button_preguntas = document.getElementById("button_preguntas");

const calcularPorcentaje = (vehiculo, ambiente) => {
    let porcentaje = 0;
    switch (vehiculo) {
        case "Motos":
            porcentaje += 17;
            break;
        case "Automovil":
            porcentaje += 20;
            break;
        case "Cicla":
            porcentaje += 5;
            break;
        case "Camion":
            porcentaje += 25;
            break;
    }
    switch (ambiente) {
        case "Día soleado":
            porcentaje += 5;
            break;
        case "Día lluvioso":
            porcentaje += 15;
            break;
        case "Día nubloso":
            porcentaje += 5;
            break;
        case "Día tormenta":
            porcentaje += 30;
            break;
        case "Día neblina":
            porcentaje += 15;
            break;
    }
    return Math.max(0, Math.min(100, porcentaje));
    
};
document.addEventListener('DOMContentLoaded', () => {
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
        const response = await enviar(data, 'pregunta_1');
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
