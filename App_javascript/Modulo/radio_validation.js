export const validarRadios = (radioButtons) => {
    let seleccionado = false;
    let errorSpan = document.getElementById("radio-error");

    if (!errorSpan) {
        errorSpan = document.createElement("span");
        errorSpan.id = "radio-error";
        errorSpan.classList.add("error-message", "span");
        radioButtons[0].parentNode.insertBefore(errorSpan, radioButtons[0].nextSibling);
    }

    radioButtons.forEach(radio => {
        if (radio.checked) {
            seleccionado = true;
        }
    });

    if (seleccionado) {
        radioButtons.forEach(radio => {
            radio.classList.remove("input_rojo");
        });
        errorSpan.style.display = "none";
    } else {
        radioButtons.forEach(radio => {
            radio.classList.add("input_rojo");
        });
        errorSpan.textContent = "Debe seleccionar una opción.";
        errorSpan.style.display = "block";
    }

    return seleccionado;
};
