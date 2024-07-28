
import registro from "../App_javascript/Modulo/registro.js";

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