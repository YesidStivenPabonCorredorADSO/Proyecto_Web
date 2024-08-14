export const validarFecha = (fechaInput) => {
    const fecha = fechaInput.value;
    const ahora = new Date();
    const fechaSeleccionada = new Date(fecha);

    let errorSpan = fechaInput.nextElementSibling;
    if (!errorSpan || !errorSpan.classList.contains("error-message")) {
        errorSpan = document.createElement("span");
        errorSpan.classList.add("error-message,span");
        fechaInput.parentNode.insertBefore(errorSpan, fechaInput.nextSibling);
    }

    if (!fecha) {
        fechaInput.classList.add("input_rojo");
        fechaInput.classList.remove("input_bien");
        errorSpan.textContent = "La fecha es requerida.";
        errorSpan.style.display = "block";
        return false;
    }

    if (fechaSeleccionada > ahora) {
        fechaInput.classList.add("input_rojo");
        fechaInput.classList.remove("input_bien");
        errorSpan.textContent = "La fecha no puede ser futura.";
        errorSpan.style.display = "block";
        return false;
    }

    fechaInput.classList.remove("input_rojo");
    fechaInput.classList.add("input_bien");
    errorSpan.style.display = "none";
    return true;
};
