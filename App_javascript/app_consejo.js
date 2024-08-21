document.addEventListener('DOMContentLoaded', () => {
    // Obtener información del usuario desde localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
        const userCorreo = document.getElementById('user-correo');
        const userName = document.getElementById('user-name');
        
        if (userCorreo) userCorreo.textContent = `Correo: ${usuario.correo}`;
        if (userName) userName.textContent = `Nombre: ${usuario.nombre}`;
    } else {
        console.log("No se encontró información del usuario.");
    }

    // Consejos para agregar a los párrafos
    const consejos = [
        "Consejo 1: Mantén siempre tus neumáticos en buen estado.",
        "Consejo 2: Revisa el aceite del motor regularmente.",
        "Consejo 3: Asegúrate de que los frenos funcionan correctamente.",
        "Consejo 4: Conduce con precaución en condiciones climáticas adversas.",
        "Consejo 5: No olvides revisar las luces del vehículo.",
        "Consejo 6: Mantén limpio el parabrisas para una buena visibilidad.",
        "Consejo 7: No uses el teléfono móvil mientras conduces.",
        "Consejo 8: Asegúrate de que todos los pasajeros usen el cinturón de seguridad."
    ];

    // Seleccionar los párrafos para agregar los consejos
    const paragraphsizquierda = document.querySelectorAll(".flex--izquierdo--p");
    const paragraphsderecha = document.querySelectorAll(".flex--derecho-p");

    // Insertar los consejos en los párrafos correspondientes
    for (let i = 0; i < consejos.length; i++) {
        if (i % 2 === 0) {
            paragraphsizquierda[i / 2].textContent = consejos[i];
            paragraphsizquierda[i / 2].classList.add("fade-in");
        } else {
            paragraphsderecha[(i - 1) / 2].textContent = consejos[i];
            paragraphsderecha[(i - 1) / 2].classList.add("fade-in");
        }
    }

    // Evento para el botón "Siguiente"
    const siguienteButton = document.querySelector('.main__formu--button1');
    if (siguienteButton) {
        siguienteButton.addEventListener('click', () => {
            window.location.href = '/Login/logueo.html';
        });
    }
});
