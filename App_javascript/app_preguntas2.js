import { Mapa, cordenadas, traza_ruta } from './Modulo/map.js';

document.addEventListener('DOMContentLoaded', () => {
    // Recuperar los datos del usuario del localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
        // Mostrar los datos en el DOM
        const userCorreo = document.getElementById('user-correo');
        const userName = document.getElementById('user-name');
        
        if (userCorreo) userCorreo.textContent = `Correo: ${usuario.correo}`;
        if (userName) userName.textContent = `Nombre: ${usuario.nombre}`;
    } else {
        console.log("No se encontró información del usuario.");
    }

    // Opciones para el mapa
    const mapOptions = {
        center: { lat: -34.397, lng: 150.644 }, // Coordenadas válidas
        zoom: 8
    };
    Mapa('map', mapOptions);

    // Añadir evento para trazar la ruta
    document.getElementById('trasar').addEventListener('click', () => {
        const origin = document.querySelector('input[placeholder="Direccion origen"]').value;
        const destination = document.querySelector('input[placeholder="Destino destino"]').value;

        if (origin && destination) {
            cordenadas(origin, (startCoords) => {
                if (startCoords) {
                    cordenadas(destination, (endCoords) => {
                        if (endCoords) {
                            traza_ruta(startCoords, endCoords);
                        } else {
                            console.error('No se pudo obtener las coordenadas del destino.');
                        }
                    });
                } else {
                    console.error('No se pudo obtener las coordenadas del origen.');
                }
            });
        } else {
            console.error('Dirección de origen o destino está vacía.');
        }
    });
});
