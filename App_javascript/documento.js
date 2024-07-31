import  is_valido  from "../App_javascript/is_Valid.js";
const $fomulario=document.querySelector("form")
const nombre=document.querySelector("#nombre")
$fomulario.addEventListener("submit",(event)=>{
    let respondse=is_valido(event,"form [required]")
});


