// import is_valido from "./Modulo/is_Valid";
import registro from "../App_javascript/Modulo/registro.js";
import contraseña from "../App_javascript/Modulo/contraseña.js";
// Llamado al Doom

// El apartado de login
const $input_correo=document.getElementById("correo");
const $input_contraseña=document.getElementById("contraseña");


// -------------------------------------------------------
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
// --------------------------------------------------------
// El apartado de informacion basica
const $chebox=document.getElementById("radiobutton1");
const $input_fecha=document.getElementById("fecha");


// El apartado de ingresar correo 
const $input_agregar_correo=document.getElementById("agregar_correo");
const $input_confirmar_correo=document.getElementById("confirmar_correo");

// El apartado de recupear

// El apartado de codigo