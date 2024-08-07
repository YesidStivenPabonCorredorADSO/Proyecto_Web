const contraseña=(event,crear_contraseña,confirmar_contraseña)=>{
    let expresion=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;
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
    const validacion_Contraseña = (crear, confirmar) => {
        if (crear.value !== confirmar.value) {
            confirmar.classList.add("input_mal");
            confirmar.classList.remove("input_bien");
        } else {
            confirmar.classList.remove("input_mal");
            confirmar.classList.add("input_bien");
        }
    }; 

    validar(crear_contraseña);
    validar(confirmar_contraseña);
    validacion_Contraseña(crear_contraseña,confirmar_contraseña);
}
export default contraseña;