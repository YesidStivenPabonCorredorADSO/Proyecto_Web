export const contraseña = (event, contraseñaInput, confirmarContraseñaInput = null) => {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    const crearErrorSpan = (elemento) => {
        if (!elemento) return;
        
        // Intenta obtener el siguiente elemento hermano que sea un <span> de error
        let errorSpan = elemento.nextElementSibling;

        // Si no existe o no tiene la clase "error-message", lo creamos
        if (!errorSpan || !errorSpan.classList.contains("error-message")) {
            errorSpan = document.createElement("span");
            errorSpan.classList.add("error-message");
            elemento.parentNode.insertBefore(errorSpan, elemento.nextSibling);
        }

        return errorSpan;
    };

    const validar = (elemento) => {
        if (!elemento) return;

        const errorSpan = crearErrorSpan(elemento);

        // Validación del campo
        if (elemento.value.trim() === "") {
            elemento.classList.add("input_mal");
            elemento.classList.remove("input_bien");
            errorSpan.textContent = "Este campo es obligatorio.";
            errorSpan.style.display = "block";
        } else if (elemento.value.length < 8) {
            elemento.classList.add("input_mal");
            elemento.classList.remove("input_bien");
            errorSpan.textContent = "La contraseña debe tener al menos 8 caracteres.";
            errorSpan.style.display = "block";
        } else {
            elemento.classList.remove("input_mal");
            elemento.classList.add("input_bien");
            errorSpan.textContent = "";
            errorSpan.style.display = "none";
        }
    };

    const validarConfirmacion = (crear, confirmar) => {
        if (!confirmar) return;

        const errorSpan = crearErrorSpan(confirmar);

        // Validación de coincidencia de contraseñas
        if (crear.value !== confirmar.value) {
            confirmar.classList.add("input_mal");
            confirmar.classList.remove("input_bien");
            errorSpan.textContent = "Las contraseñas no coinciden.";
            errorSpan.style.display = "block";
        } else {
            confirmar.classList.remove("input_mal");
            confirmar.classList.add("input_bien");
            errorSpan.textContent = "";
            errorSpan.style.display = "none";
        }
    };

    // Aplica las validaciones
    validar(contraseñaInput);
    if (confirmarContraseñaInput) validarConfirmacion(contraseñaInput, confirmarContraseñaInput);
};
