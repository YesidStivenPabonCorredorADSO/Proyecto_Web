import { is_valido } from "../App_javascript/Modulo/is_Valid.js";
import { nombre } from "../App_javascript/Modulo/nombre.js";
import { contraseña } from "../App_javascript/Modulo/contraseña.js";
import { correo } from "../App_javascript/Modulo/correo.js";
import { validarFecha } from "../App_javascript/Modulo/validar_fecha.js";
import { validarRadios } from "../App_javascript/Modulo/radio_validation.js";
import { enviar } from "../App_javascript/Modulo/ajax.js";

// Selección de elementos del DOM
const form = document.querySelector(".main__section--article--form");
const submitButton = document.querySelector(".main__formu--button1");
const cancelarButton = document.querySelector(".main__formu--button2");

// Campos del formulario
const nombreInput = document.getElementById("name");
const apellidoInput = document.getElementById("apellido");
const crearContraInput = document.getElementById("crear_contra");
const confirmarContraInput = document.getElementById("confirmar_contra");
const ingresarCorreoInput = document.getElementById("ingresar_correo");
const confirmarCorreoInput = document.getElementById("confirmar_correo");
const fechaInput = document.getElementById("fecha");

// Botones de radio
const radio1 = document.getElementById("radio1");
const radio2 = document.getElementById("radio2");
const radio3 = document.getElementById("radio3");

// Validación de nombre y apellido
nombreInput.addEventListener("input", (event) => {
    nombre(event, nombreInput);
});

apellidoInput.addEventListener("input", (event) => {
    nombre(event, apellidoInput);
});

// Validación de contraseñas
crearContraInput.addEventListener("input", (event) => {
    contraseña(event, crearContraInput, confirmarContraInput, submitButton);
});

confirmarContraInput.addEventListener("input", (event) => {
    contraseña(event, crearContraInput, confirmarContraInput, submitButton);
});

// Validación de correos
ingresarCorreoInput.addEventListener("input", (event) => {
    correo(event, ingresarCorreoInput, confirmarCorreoInput);
});

confirmarCorreoInput.addEventListener("input", (event) => {
    correo(event, ingresarCorreoInput, confirmarCorreoInput);
});

// Validación de la fecha
fechaInput.addEventListener("change", () => {
    validarFecha(fechaInput);
});

// Manejo del evento click en el botón de envío
submitButton.addEventListener("click", async (event) => {
    // Prevenir el comportamiento por defecto del formulario
    event.preventDefault();

    let bandera = true;

    // Valida todos los campos
    bandera = is_valido(event, bandera);

    // Validar contraseñas
    contraseña(event, crearContraInput, confirmarContraInput, submitButton);

    // Validar correos
    correo(event, ingresarCorreoInput, confirmarCorreoInput);

    // Validar radios
    const radiosValidos = validarRadios([radio1, radio2, radio3]);

    // Validar fecha
    const fechaValida = validarFecha(fechaInput);

    if (bandera && radiosValidos && fechaValida) {
        console.log("Formulario completo y listo para enviar");

        const data = {
            nombre: nombreInput.value.trim(),
            apellido: apellidoInput.value.trim(),
            fecha: fechaInput.value,
            genero: document.querySelector('input[name="radiobutton"]:checked')?.value || "",
            contrasena: crearContraInput.value,
            correo: ingresarCorreoInput.value,
            activo: true  // Activar usuario automáticamente
        };

        const response = await enviar(data, `Users_registro`);
        if (response.error) {
            console.error("Error en la respuesta:", response.error);
        } else {
            window.location.href = 'logueo.html';
        }
    } else {
        console.log("Por favor, complete todos los campos correctamente.");
    }
});

// Manejo del evento click en el botón de cancelar
cancelarButton.addEventListener("click", () => {
    // Redirigir a la página deseada al hacer clic en "Cancelar"
    window.location.href = '/html/logueo.html'; // Cambia 'pagina_cancelar.html' por la URL deseada
});
