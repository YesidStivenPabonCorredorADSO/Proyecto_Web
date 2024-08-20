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
    L.Routing.control({
        waypoints: [
            L.latLng(startCoords[0], startCoords[1]),
            L.latLng(endCoords[0], endCoords[1])
        ],
        routeWhileDragging: true,  // Permite arrastrar la ruta en el mapa
        geocoder: L.Control.Geocoder.nominatim()  // Utiliza el geocodificador de Nominatim
    }).addTo(map);
}


export function coordenadas(direccion, callback) {
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
