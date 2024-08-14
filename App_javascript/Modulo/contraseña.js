export const contraseña = (event, crear_contraseña, confirmar_contraseña, submitButton) => {
    const expresion = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$/;

    const crearErrorSpan = (elemento) => {
        let errorSpan = elemento.nextElementSibling;
        if (!errorSpan || !errorSpan.classList.contains("error-message")) {
            errorSpan = document.createElement("span");
            errorSpan.classList.add("error-message", "span");
            elemento.parentNode.insertBefore(errorSpan, elemento.nextSibling);
        }
        return errorSpan;
    };

    const validar = (elemento) => {
        let errorSpan = crearErrorSpan(elemento);
        if (!elemento) {
            console.error("El elemento no está definido.");
            return;
        }
        if (elemento.value.trim() === "") {
            elemento.classList.add("input_mal");
            elemento.classList.remove("input_bien");
            errorSpan.textContent = "La contraseña es requerida.";
            errorSpan.style.display = "block";
        } else if (!expresion.test(elemento.value)) {
            elemento.classList.add("input_mal");
            elemento.classList.remove("input_bien");
            errorSpan.textContent = "La contraseña debe tener entre 8 y 15 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.";
            errorSpan.style.display = "block";
        } else {
            elemento.classList.remove("input_mal");
            elemento.classList.add("input_bien");
            errorSpan.style.display = "none";
        }
    };

    const validacion_Contraseña = (crear, confirmar) => {
        let errorSpan = crearErrorSpan(confirmar);
        if (crear.value !== confirmar.value) {
            confirmar.classList.add("input_mal");
            confirmar.classList.remove("input_bien");
            errorSpan.textContent = "Las contraseñas no coinciden.";
            errorSpan.style.display = "block";
        } else {
            confirmar.classList.remove("input_mal");
            confirmar.classList.add("input_bien");
            errorSpan.style.display = "none";
        }
    };

    // Validar las contraseñas
    [crear_contraseña, confirmar_contraseña].forEach(validar);
    validacion_Contraseña(crear_contraseña, confirmar_contraseña);

    // Verificar el estado del botón de envío
    // if (submitButton) {
    //     if (
    //         crear_contraseña.classList.contains("input_bien") &&
    //         confirmar_contraseña.classList.contains("input_bien")
    //     ) {
    //         submitButton.classList.remove("input_rojo");
    //         submitButton.classList.add("input_bien");
    //     } else {
    //         submitButton.classList.add("input_rojo");
    //         submitButton.classList.remove("input_bien");
    //     }
    // } else {
    //     console.error("El botón de envío no está definido.");
    // }
};
