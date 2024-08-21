// app_preguntas2.js
import { inicializaMapa, agregaMarcador, trazaRuta, coordenadas } from './Modulo/map.js';
import { enviar } from './Modulo/ajax.js';

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

    const mapOptions = {
        center: [7.071284, -73.121792],
        zoom: 13
    };
    const map = inicializaMapa('mi_mapa', mapOptions.center, mapOptions.zoom);
    agregaMarcador(map, mapOptions.center);

    let startCoords = null;
    let endCoords = null;

    function convertirDireccion(direccion, inputId, callback) {
        coordenadas(direccion, (coords) => {
            if (coords) {
                agregaMarcador(map, coords);
                map.setView(coords, 13); // Centra el mapa en la ubicación obtenida
                const inputElement = document.getElementById(inputId);
                inputElement.value = `${coords[0]}, ${coords[1]}`; // Actualiza el input con las coordenadas
                callback(coords);
            } else {
                console.error('No se pudo obtener las coordenadas de la dirección:', direccion);
                callback(null);
            }
        });
    }

    document.getElementById('convertir').addEventListener('click', () => {
        const direccionOrigen = document.getElementById('direccion_origen').value;
        const direccionDestino = document.getElementById('direccion_destino').value;

        if (direccionOrigen) {
            convertirDireccion(direccionOrigen, 'direccion_origen', (coords) => {
                startCoords = coords;
            });
        }

        if (direccionDestino) {
            convertirDireccion(direccionDestino, 'direccion_destino', (coords) => {
                endCoords = coords;
            });
        }
    });

    document.getElementById('trasar').addEventListener('click', () => {
        if (startCoords && endCoords) {
            trazaRuta(map, startCoords, endCoords);
        } else {
            console.error('Las coordenadas de origen o destino no están disponibles.');
        }
    });

    document.getElementById('Guardar_datos').addEventListener('click', () => {
        if (startCoords && endCoords) {
            const direccionOrigen = document.getElementById('direccion_origen').value;
            const direccionDestino = document.getElementById('direccion_destino').value;

            const datos = {
                origen: direccionOrigen,
                destino: direccionDestino,
                coordenadas_origen: startCoords,
                coordenadas_destino: endCoords
            };

            localStorage.setItem('ruta', JSON.stringify(datos));
            alert('Datos guardados exitosamente.');
        } else {
            console.error('Faltan datos para guardar.');
        }
    });

    document.getElementById('enviar_mapa').addEventListener('click', async () => {
        const direccionOrigen = document.getElementById('direccion_origen').value;
        const direccionDestino = document.getElementById('direccion_destino').value;

        if (direccionOrigen && direccionDestino && startCoords && endCoords) {
            const datos = {
                origen: direccionOrigen,
                destino: direccionDestino,
                coordenadas_origen: startCoords,
                coordenadas_destino: endCoords
            };

            try {
                const resultado = await enviar(datos, 'pregunta_2');
                console.log('Datos enviados con éxito:', resultado);
                
                // Redirigir a otro HTML
                window.location.href = '/Login/resultado.html'; // Reemplaza con el nombre del archivo HTML al que deseas redirigir
            } catch (error) {
                console.error('Error al enviar los datos:', error);
            }
        } else {
            console.error('Faltan datos para enviar.');
        }
    });
});
