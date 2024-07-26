import contraseña from "../App_javascript/App_contraseña.js";
// ---------------------------------------
// El apartado de crear contraseña
const $input_crear_contrase=document.getElementById("crear_contraseña");
const $input_confirmar_contraseña=document.getElementById("confirmar_contraseña");
// 
$input_crear_contrase.addEventListener("keypress",(event)=>{
    contraseña(event,$input_crear_contrase);
})
$input_crear_contrase.addEventListener("blur",(event)=>{
    contraseña(event,$input_crear_contrase);
})
// 
$input_confirmar_contraseña.addEventListener("keypress",(event)=>{
    contraseña(event,$input_crear_contrase);
})
$input_confirmar_contraseña.addEventListener("blur",(event)=>{
    contraseña(event,$input_crear_contrase);
})

// ------------------------------------------