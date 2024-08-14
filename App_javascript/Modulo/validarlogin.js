// Función para validar el correo
const validarCorreo = (correoInput) => {
    const expresion = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
    let errorSpan = correoInput.nextElementSibling;
    if (!errorSpan || !errorSpan.classList.contains("error-message")) {
        errorSpan = document.createElement("span");
        errorSpan.classList.add("error-message");
        correoInput.parentNode.insertBefore(errorSpan, correoInput.nextSibling);
    }

    if (correoInput.value.trim() === "") {
        correoInput.classList.add("input_mal");
        correoInput.classList.remove("input_bien");
        errorSpan.textContent = "El correo es obligatorio.";
        errorSpan.style.display = "block";
    } else if (!expresion.test(correoInput.value)) {
        correoInput.classList.add("input_mal");
        correoInput.classList.remove("input_bien");
        errorSpan.textContent = "El formato del correo no es válido.";
        errorSpan.style.display = "block";
    } else {
        correoInput.classList.remove("input_mal");
        correoInput.classList.add("input_bien");
        errorSpan.textContent = "";
        errorSpan.style.display = "none";
    }
};

// Función para validar la contraseña
const validarContraseña = (contraseñaInput) => {
    let errorSpan = contraseñaInput.nextElementSibling;
    if (!errorSpan || !errorSpan.classList.contains("error-message")) {
        errorSpan = document.createElement("span");
        errorSpan.classList.add("error-message");
        contraseñaInput.parentNode.insertBefore(errorSpan, contraseñaInput.nextSibling);
    }

    if (contraseñaInput.value.trim() === "") {
        contraseñaInput.classList.add("input_mal");
        contraseñaInput.classList.remove("input_bien");
        errorSpan.textContent = "La contraseña es obligatoria.";
        errorSpan.style.display = "block";
    } else {
        contraseñaInput.classList.remove("input_mal");
        contraseñaInput.classList.add("input_bien");
        errorSpan.textContent = "";
        errorSpan.style.display = "none";
    }
};

// Función principal para validar todos los campos de inicio de sesión
export const validarLogueo = (correoInput, contraseñaInput) => {
    validarCorreo(correoInput);
    validarContraseña(contraseñaInput);
};
