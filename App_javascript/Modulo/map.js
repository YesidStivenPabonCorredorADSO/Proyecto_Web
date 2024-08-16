let map;
let directions_calcular_ruta;
let direction_mostrar_ruta;

export function Mapa(mapId, mapOptions) {
    const mapElement = document.getElementById(mapId);
    if (!mapElement) {
        console.error('El elemento del mapa no se encontró.');
        return;
    }
    map = new google.maps.Map(mapElement, mapOptions);
    directions_calcular_ruta = new google.maps.DirectionsService();
    direction_mostrar_ruta = new google.maps.DirectionsRenderer();
    direction_mostrar_ruta.setMap(map);
}

export function cordenadas(address, callback) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK' && results[0]) {
            const location = results[0].geometry.location;
            callback(location);
        } else {
            console.error('Error de geocodificación:', status);
            callback(null);
        }
    });
}

export function traza_ruta(startCoords, endCoords) {
    if (!startCoords || !endCoords) {
        console.error('Las coordenadas de inicio o fin no son válidas.');
        return;
    }

    const request = {
        origin: startCoords,
        destination: endCoords,
        travelMode: google.maps.TravelMode.DRIVING
    };

    directions_calcular_ruta.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            direction_mostrar_ruta.setDirections(result);
        } else {
            console.error('Error al trazar la ruta:', status);
        }
    });
}
