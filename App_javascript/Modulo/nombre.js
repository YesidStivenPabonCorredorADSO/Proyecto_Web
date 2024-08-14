export const nombre = (event, elemento) => {
    let expresion = /^[a-zA-Z]*$/; // Permite solo letras (a-z, A-Z)

    // Crear un span para el mensaje de error si no existe
    let errorSpan = elemento.nextElementSibling;
    if (!errorSpan || !errorSpan.classList.contains("error-message")) {
        errorSpan = document.createElement("span");
        errorSpan.classList.add("error-message", "span");
        elemento.parentNode.insertBefore(errorSpan, elemento.nextSibling);
    }

    // Elimina cualquier carácter no válido al escribir
    if (!expresion.test(elemento.value)) {
        elemento.value = elemento.value.replace(/[^a-zA-Z]+/g, ''); // Elimina todo lo que no sea letra
    }

    // Si el campo está vacío, lo marca como incorrecto
    if (elemento.value.trim() === "") {
        elemento.classList.add("input_rojo");
        elemento.classList.remove("input_bien");
        errorSpan.textContent = "Este campo no puede estar vacío.";
        errorSpan.style.display = "block";
    } else {
        // Si el campo es válido, lo marca como correcto
        elemento.classList.remove("input_rojo");
        elemento.classList.add("input_bien");
        errorSpan.style.display = "none";
    }
};
