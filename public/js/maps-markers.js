
const latitude = document.getElementById("latitude").value
const longitude = document.getElementById("longitude").value


function createMarker(map, centerLocation) {

    const pin = new google.maps.Marker({
        position: centerLocation,
        map: map,
    });
}


function initMap() {

    console.log(latitude, longitude)

    const centerLocation = {
        lat: Number(latitude),
        lng: Number(longitude)
    };

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: centerLocation
    });

    createMarker(map, centerLocation)

}

initMap()