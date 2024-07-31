// ------------------------------------------------------------------
const $input_nombre=document.getElementById("nombre");
const $input_apellido=document.getElementById("name_apellido");
// ------------------------------------------------------------------
const $input_crear_contrase=document.getElementById("crear_contraseña");
const $input_confirmar_contraseña=document.getElementById("confirmar_contraseña");
// ------------------------------------------------------------------
const $input_ingresar_correo=document.getElementById("agregar_correo");
const $input_confimar_correo=document.getElementById("confirmar_correo");
// ------------------------------------------------------------------
const validacion_botton=(event)=>{
    event.preventDefault();
    let input_nombre=$input_nombre.value.trim();
    let input_apellido=$input_apellido.value.trim();
    let input_crear_contraseña=$input_crear_contrase.value.trim();
    let input_confirmar_contraseña=$input_confirmar_contraseña.value.trim();
    let input_correo=$input_ingresar_correo.value.trim();
    let input_confirmar_correo=$input_confimar_correo.value.trim();

    if (input_nombre===""||input_apellido===""||input_crear_contraseña===""||input_confirmar_contraseña===""||input_correo===""||input_confirmar_correo==="") {
        alert("Error: Por favor llene los campos")
      }
      const datos={
        nombre:input_nombre,
        apellido:input_apellido,
        crear_contraseña:input_crear_contraseña,
        confirmar_contraseña:input_confirmar_contraseña,
        correo:input_correo,
        correo_confirmar:input_confirmar_correo,
      }
      fetch('http://localhost:3000/Users_registro', {
        method: 'POST',
        body: JSON.stringify({
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
}
export default validacion_botton;