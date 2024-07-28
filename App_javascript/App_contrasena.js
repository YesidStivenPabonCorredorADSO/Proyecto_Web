import contraseña from "../App_javascript/Modulo/contraseña.js";
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