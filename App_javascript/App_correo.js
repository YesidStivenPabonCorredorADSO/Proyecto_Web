import correo from "../App_javascript/Modulo/correo.js";
// Llamado del Doom
// ----------------------------------------------------------------------/
const $input_ingresar_correo=document.getElementById("agregar_correo");
const $input_confimar_correo=document.getElementById("confirmar_correo");
const validacion_correo = (event) => {
    correo(event,$input_ingresar_correo,$input_confimar_correo);
}
$input_ingresar_correo.addEventListener("keypress",validacion_correo)
$input_ingresar_correo.addEventListener("blur",validacion_correo)
// 
$input_confimar_correo.addEventListener("keypress",validacion_correo)
$input_confimar_correo.addEventListener("blur",validacion_correo)
// ----------------------------------------------------------------------/