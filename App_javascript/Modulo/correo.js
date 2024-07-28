const correo=(event,ingresar_correo,confirmar_correo)=>{
    let expresion=/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const validar=(elemento)=>{
        if (elemento.value === "") {
            elemento.classList.add("input_mal");
            elemento.classList.remove("input_bien");
        } else if (!expresion.test(elemento.value)) {
            elemento.classList.add("input_bien");
            elemento.classList.remove("input_mal");
        } else {
            elemento.classList.remove("input_mal");
            elemento.classList.add("input_bien");
        }
    };
    const validacion_correo = (crear, confirmar) => {
        if (crear.value !== confirmar.value) {
            confirmar.classList.add("input_mal");
            confirmar.classList.remove("input_bien");
        } else {
            confirmar.classList.remove("input_mal");
            confirmar.classList.add("input_bien");
        }
    }; 

    validar(ingresar_correo);
    validar(confirmar_correo);
    validacion_correo(ingresar_correo,confirmar_correo);
}
export default correo;