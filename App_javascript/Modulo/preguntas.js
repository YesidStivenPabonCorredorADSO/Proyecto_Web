export const validacion_select = () => {
    let bandera = true;

    // Selecciona todos los elementos <select> que son requeridos
    const selects = document.querySelectorAll("select[required]");

    // Recorre cada <select> para validar
    selects.forEach(select => {
        // Busca el mensaje de error junto al select o lo crea si no existe
        let errorSpan = select.nextElementSibling;
        if (!errorSpan || !errorSpan.classList.contains("error-message")) {
            errorSpan = document.createElement("span");
            errorSpan.classList.add("error-message", "span");
            select.parentNode.insertBefore(errorSpan, select.nextSibling);
        }

        // Validación: si el valor del select está vacío
        if (select.value.trim() === "") {
            select.classList.add("input_mal");
            select.classList.remove("input_bien");
            errorSpan.textContent = "Este campo es requerido.";
            errorSpan.style.display = "block";
            bandera = false; // Marca la bandera como falsa si hay algún select vacío
        } else {
            select.classList.remove("input_mal"); // Remueve la clase de error si el select está lleno
            select.classList.add("input_bien");
            errorSpan.style.display = "none";
        }
    });

    return bandera; // Devuelve el valor final de bandera
};
