import { Mapa, cordenadas, traza_ruta } from './Modulo/map.js';

document.addEventListener('DOMContentLoaded', () => {
    const mapOptions = {
        center: { lat: -34.397, lng: 150.644 }, // Coordenadas válidas
        zoom: 8
    };
    Mapa('map', mapOptions);

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
