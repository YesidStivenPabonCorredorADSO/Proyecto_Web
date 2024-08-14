export const is_valido = (event, bandera) => {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    const $input_required = document.querySelectorAll("form [required]");
    
    $input_required.forEach(element => {
        let errorSpan = element.nextElementSibling;
        if (!errorSpan || !errorSpan.classList.contains("error-message")) {
            errorSpan = document.createElement("span");
            errorSpan.classList.add("error-message", "span");
            element.parentNode.insertBefore(errorSpan, element.nextSibling);
        }

        if (element.value.trim() === "") {
            element.classList.add("input_rojo"); // Añade la clase para resaltar en rojo
            element.classList.remove("input_bien");
            errorSpan.textContent = "Este campo es requerido.";
            errorSpan.style.display = "block";
            bandera = false; // Cambia bandera a false si hay algún campo vacío
        } else {
            element.classList.remove("input_rojo"); // Remueve la clase si el campo está completo
            errorSpan.style.display = "none";
        }
    });

    return bandera; // Devuelve el valor final de bandera
};
