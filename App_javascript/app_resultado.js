// app_resultado.js
document.addEventListener('DOMContentLoaded', () => {
    // Recuperar los datos del usuario del localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
        const userCorreo = document.getElementById('user-correo');
        const userName = document.getElementById('user-name');
        
        if (userCorreo) userCorreo.textContent = `Correo: ${usuario.correo}`;
        if (userName) userName.textContent = `Nombre: ${usuario.nombre}`;
    } else {
        console.log("No se encontró información del usuario.");
    }

    // Recuperar el porcentaje calculado
    const porcentaje = localStorage.getItem('porcentaje');

    if (porcentaje) {
        const resultadoPorcentaje = document.getElementById('resultado_porcentaje');
        if (resultadoPorcentaje) resultadoPorcentaje.textContent = `${porcentaje}%`; // Cambiado a textContent
    } else {
        console.log("No se encontró el porcentaje.");
    }
});
