export const correo = (event, ingresar_correo, confirmar_correo = null) => {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    const expresion = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    const validar = (elemento) => {
        if (!elemento) return;

        // Intenta obtener el siguiente elemento hermano que sea un <span> de error
        let errorSpan = elemento.nextElementSibling;

        // Si no existe o no tiene la clase "error-message", lo creamos
        if (!errorSpan || !errorSpan.classList.contains("error-message")) {
            errorSpan = document.createElement("span");
            errorSpan.classList.add("error-message");
            elemento.parentNode.insertBefore(errorSpan, elemento.nextSibling);
        }

        // Validación del campo
        if (elemento.value.trim() === "") {
            elemento.classList.add("input_mal");
            elemento.classList.remove("input_bien");
            errorSpan.textContent = "Este campo es obligatorio.";
            errorSpan.style.display = "block";
        } else if (!expresion.test(elemento.value)) {
            elemento.classList.add("input_mal");
            elemento.classList.remove("input_bien");
            errorSpan.textContent = "El correo no tiene un formato válido.";
            errorSpan.style.display = "block";
        } else {
            elemento.classList.remove("input_mal");
            elemento.classList.add("input_bien");
            errorSpan.textContent = "";
            errorSpan.style.display = "none";
        }
    };

    const validacion_correo = (crear, confirmar) => {
        if (!confirmar) return;

        // Intenta obtener el siguiente elemento hermano que sea un <span> de error
        let errorSpan = confirmar.nextElementSibling;

        // Si no existe o no tiene la clase "error-message", lo creamos
        if (!errorSpan || !errorSpan.classList.contains("error-message")) {
            errorSpan = document.createElement("span");
            errorSpan.classList.add("error-message");
            confirmar.parentNode.insertBefore(errorSpan, confirmar.nextSibling);
        }

        // Validación de coincidencia de correos
        if (crear.value !== confirmar.value) {
            confirmar.classList.add("input_mal");
            confirmar.classList.remove("input_bien");
            errorSpan.textContent = "Los correos electrónicos no coinciden.";
            errorSpan.style.display = "block";
        } else {
            confirmar.classList.remove("input_mal");
            confirmar.classList.add("input_bien");
            errorSpan.textContent = "";
            errorSpan.style.display = "none";
        }
    };

    // Aplica las validaciones
    validar(ingresar_correo);
    if (confirmar_correo) validacion_correo(ingresar_correo, confirmar_correo);
};
