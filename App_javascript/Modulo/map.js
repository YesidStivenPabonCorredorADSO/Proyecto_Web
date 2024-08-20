// Modulo/map.js

export function inicializaMapa(mapId, center, zoom) {
    const map = L.map(mapId).setView(center, zoom);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    return map;
}

export function agregaMarcador(map, coords) {
    L.marker(coords).addTo(map);
}

export function trazaRuta(map, startCoords, endCoords) {
    // Agrega aquí la lógica para trazar la ruta entre startCoords y endCoords
    // Puedes usar la API de OpenStreetMap o cualquier otra biblioteca de enrutamiento
}

export function coordenadas(direccion, callback) {
    // Aquí deberías implementar la lógica para obtener coordenadas a partir de una dirección
    // Puedes usar una API de geocodificación
    // Por ejemplo, usando la API de OpenStreetMap:
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${direccion}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                callback([parseFloat(lat), parseFloat(lon)]);
            } else {
                callback(null);
            }
        })
        .catch(error => {
            console.error('Error al obtener coordenadas:', error);
            callback(null);
        });
}
