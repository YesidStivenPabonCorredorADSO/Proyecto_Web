import { inicializaMapa, agregaMarcador, trazaRuta, coordenadas } from './Modulo/map.js';

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

    // Inicializa el mapa y lo muestra en el div
    const mapOptions = {
        center: [7.071284, -73.121792], // Coordenadas iniciales del mapa
        zoom: 13 // Nivel de zoom
    };
    const map = inicializaMapa('mi_mapa', mapOptions.center, mapOptions.zoom);
    agregaMarcador(map, mapOptions.center);

    document.getElementById('trasar').addEventListener('click', () => {
        const origin = document.querySelector('input[placeholder="Direccion origen"]').value;
        const destination = document.querySelector('input[placeholder="Destino destino"]').value;

        if (origin && destination) {
            coordenadas(origin, (startCoords) => {
                if (startCoords) {
                    coordenadas(destination, (endCoords) => {
                        if (endCoords) {
                            trazaRuta(map, startCoords, endCoords);
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
