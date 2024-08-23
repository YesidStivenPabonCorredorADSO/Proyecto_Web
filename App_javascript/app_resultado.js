import { enviar } from "./Modulo/ajax.js";

document.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
        const userCorreo = document.getElementById('user-correo');
        const userName = document.getElementById('user-name');
        
        if (userCorreo) userCorreo.textContent = `Correo: ${usuario.correo}`;
        if (userName) userName.textContent = `Nombre: ${usuario.nombre}`;
    } else {
        console.log("No se encontró información del usuario.");
    }

    const porcentaje = localStorage.getItem('preguntas');
    console.log("Porcentaje recuperado:", porcentaje);  // Registro del valor recuperado

    if (porcentaje) {
        const resultadoPorcentaje = document.getElementById('resultado_porcentaje');
        if (resultadoPorcentaje) resultadoPorcentaje.value = `${porcentaje}%`;  // Asignar el porcentaje al campo de entrada
    } else {
        console.log("No se encontró el porcentaje.");
    }

    const enviarResultadoBtn = document.getElementById('enviar_resultado');
    if (enviarResultadoBtn) {
        enviarResultadoBtn.addEventListener('click', async () => {
            const data = { porcentaje };
            const response = await enviar(data, 'resultados'); 
            if (response.error) {
                console.error("Error al enviar el porcentaje:", response.error);
            } else {
                console.log("Porcentaje enviado exitosamente:", response);
                alert("Porcentaje enviado exitosamente.");
            }
        });
    }

    const pasarConsejoBtn = document.getElementById('pasar_consejo');
    if (pasarConsejoBtn) {
        pasarConsejoBtn.addEventListener('click', () => {
            window.location.href = '/Login/consejo.html';
        });
    }
});
