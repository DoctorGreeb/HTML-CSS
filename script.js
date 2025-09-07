const messageElement = document.getElementById("message");
let latitude = 47.236619;
let longitude = 39.712566;
function getLocation() {
    let messageElement = document.getElementById("message");
    if (!navigator.geolocation) {
        messageElement.textContent = "Geolocation is not supported by your browser.";
        return;
    }
    messageElement.textContent = "Guessing location...";
    messageElement.className = "info";
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const userCoords = position.coords;
            const distance = calculateDistance(userCoords.latitude, userCoords.longitude, latitude, longitude);
            if (distance < 0.05) {
                messageElement.textContent = "nashel blyat";
                messageElement.className = "success";
            } else {
                messageElement.innerHTML = `Вы находитесь на дистанции <strong>${Math.round(distance * 100) / 100} км</strong> от места назначения.`;
                messageElement.className = "info";
            }
        },
            (error) => {
                messageElement.textContent = `Error: ${error.message}`;
                messageElement.className = "error";
            }
    );
}
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);  // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
getLocation();

