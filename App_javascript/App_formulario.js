
import registro from "./Modulo/registro.js";
import correo from "./Modulo/correo.js";
import contraseña from "./Modulo/contraseña.js";
import validacion_botton from "../App_javascript/Modulo/guardar.js";
// -------
// 
// Registro
// Llamado al Doom
// -------------------------------------------------------/
// El apartado de registro
const $input_nombre=document.getElementById("nombre");
const $input_apellido=document.getElementById("name_apellido");
// Llamada del evento

$input_nombre.addEventListener("keypress",(event)=>{
    registro(event,$input_nombre);
})
$input_nombre.addEventListener("blur",(event)=>{
    registro(event,$input_nombre);

})

// 
$input_apellido.addEventListener("keypress",(event)=>{
    registro(event,$input_apellido);
})
$input_apellido.addEventListener("blur",(event)=>{
    registro(event,$input_apellido);
})
// -------------------------------------------------------/
// ---------------------------------------//
// El apartado de crear contraseña
const $input_crear_contrase=document.getElementById("crear_contraseña");
const $input_confirmar_contraseña=document.getElementById("confirmar_contraseña");
// 
const validarContraseña = (event) => {
    contraseña(event, $input_crear_contrase, $input_confirmar_contraseña);
}
$input_crear_contrase.addEventListener("keypress",validarContraseña)
$input_crear_contrase.addEventListener("blur",validarContraseña)
// 
$input_confirmar_contraseña.addEventListener("keypress",validarContraseña)
$input_confirmar_contraseña.addEventListener("blur",validarContraseña)
// ------------------------------------------//
// Correo
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
// ----------------------------------------------------------------------
$input_botton=document.getElementById("botton_enviar")
$input_botton.addEventListener("submit",validacion_botton)
