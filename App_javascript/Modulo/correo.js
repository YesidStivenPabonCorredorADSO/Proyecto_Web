export const correo = (event, ingresar_correo, confirmar_correo) => {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    const expresion = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    const validar = (elemento) => {
        let errorSpan = elemento.nextElementSibling;
        if (!errorSpan || !errorSpan.classList.contains("error-message")) {
            errorSpan = document.createElement("span");
            errorSpan.classList.add("error-message", "span");
            elemento.parentNode.insertBefore(errorSpan, elemento.nextSibling);
        }

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
        let errorSpan = confirmar.nextElementSibling;
        if (!errorSpan || !errorSpan.classList.contains("error-message")) {
            errorSpan = document.createElement("span");
            errorSpan.classList.add("error-message", "span");
            confirmar.parentNode.insertBefore(errorSpan, confirmar.nextSibling);
        }

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
    [ingresar_correo, confirmar_correo].forEach(validar);
    validacion_correo(ingresar_correo, confirmar_correo);
};
