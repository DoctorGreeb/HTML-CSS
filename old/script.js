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
            // Добавим вызов функции для получения адреса
            getYandexAddress(userCoords.latitude, userCoords.longitude, messageElement);
            showYandexMap(userCoords.latitude, userCoords.longitude);
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
// Получение адреса через Яндекс Геокодер API
function getYandexAddress(lat, lon, messageElement) {
    const apiKey = '766fdd39-f804-4616-b613-22f4d8e09cbc';
    const url = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${apiKey}&geocode=${lon},${lat}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('Yandex API response:', data); // Для отладки
            try {
                if (
                    data &&
                    data.response &&
                    data.response.GeoObjectCollection &&
                    Array.isArray(data.response.GeoObjectCollection.featureMember)
                ) {
                    const featureMember = data.response.GeoObjectCollection.featureMember;
                    if (featureMember.length > 0) {
                        const address = featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.text;
                        messageElement.innerHTML += `<br><strong>Ваш адрес:</strong> ${address}`;
                    } else {
                        messageElement.innerHTML += '<br>Не удалось определить адрес (нет данных в ответе).';
                    }
                } else {
                    messageElement.innerHTML += '<br>Не удалось определить адрес (неверная структура ответа).';
                }
            } catch (e) {
                messageElement.innerHTML += `<br>Не удалось определить адрес (ошибка: ${e.message}).`;
            }
        })
        .catch((err) => {
            messageElement.innerHTML += `<br>Ошибка при получении адреса: ${err}`;
        });
}
// Добавим функцию для отображения карты через Яндекс.Карты
function showYandexMap(lat, lon) {
    let mapDiv = document.getElementById('map');
    if (!mapDiv) {
        mapDiv = document.createElement('div');
        mapDiv.id = 'map';
        mapDiv.style.width = '900px';
        mapDiv.style.height = '150px';
        mapDiv.style.marginTop = '20px';
        mapDiv.style.marginLeft = 'auto';
        mapDiv.style.marginRight = 'auto';
        mapDiv.style.display = 'block';
    } else {
        mapDiv.style.width = '300px';
        mapDiv.style.height = '150px';
        mapDiv.style.marginTop = '20px';
        mapDiv.style.marginLeft = 'auto';
        mapDiv.style.marginRight = 'auto';
        mapDiv.style.display = 'block';
    }
    // Вставляем карту перед карточками игр
    const steamSection = document.querySelector('.steam-section');
    if (steamSection && mapDiv.parentNode !== steamSection.parentNode) {
        steamSection.parentNode.insertBefore(mapDiv, steamSection);
    } else if (!steamSection && !mapDiv.parentNode) {
        document.body.appendChild(mapDiv);
    }
    // Проверяем, подключён ли скрипт Яндекс.Карт
    if (!window.ymaps) {
        const script = document.createElement('script');
        script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
        script.onload = () => initYandexMap(lat, lon);
        document.head.appendChild(script);
    } else {
        initYandexMap(lat, lon);
    }
}
function initYandexMap(lat, lon) {
    ymaps.ready(function () {
        let mapDiv = document.getElementById('map');
        if (!mapDiv) return;
        mapDiv.innerHTML = '';
        const map = new ymaps.Map('map', {
            center: [lat, lon],
            zoom: 16
        });
        const placemark = new ymaps.Placemark([lat, lon], {
            balloonContent: 'Вы здесь!'
        });
        map.geoObjects.add(placemark);
    });
}
getLocation();

