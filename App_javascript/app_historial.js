// app_historial.js
document.addEventListener('DOMContentLoaded', () => {
    // Recuperar los datos de la ruta del localStorage
    const datosRuta = JSON.parse(localStorage.getItem('ruta'));

    if (datosRuta) {
        // Mostrar los datos de la ruta en la página
        const inputOrigen = document.getElementById('origen');
        const inputDestino = document.getElementById('destino');

        if (inputOrigen) inputOrigen.value = datosRuta.origen;
        if (inputDestino) inputDestino.value = datosRuta.destino;

        // Opcional: eliminar los datos del localStorage después de usarlos
        localStorage.removeItem('ruta');
    }

    // Recuperar la información del usuario del localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (usuario) {
        // Mostrar la información del usuario en la página
        const userCorreo = document.getElementById('user-correo');
        const userName = document.getElementById('user-name');

        if (userCorreo) userCorreo.textContent = `Correo: ${usuario.correo}`;
        if (userName) userName.textContent = `Nombre: ${usuario.nombre}`;
    } else {
        console.log("No se encontró información del usuario.");
    }
});
