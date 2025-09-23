// const socket = io();
// const statusElement = document.getElementById('status');
// const coordsElement = document.getElementById('currentCoords');

// // Проверяем поддержку Geolocation API
// // Запускаем отслеживание местоположения
// // В случае успеха должны быть получены координаты и скорость
//             const timestamp = new Date(position.timestamp).toLocaleTimeString();

//             const locationData = {
//                 lat: latitude,
//                 lng: longitude,
//                 acc: accuracy,
//                 ts: timestamp
//             };

//             // Обновляем интерфейс
//             coordsElement.textContent = `Координаты: ${latitude.toFixed(6)}, ${longitude.toFixed(6)} (Точность: ${accuracy.toFixed(2)}м)`;
//             statusElement.textContent = 'Данные отправляются...';

//             // Отправляем данные на сервер через WebSocket
//             socket.emit('locationUpdate', locationData);
//         },
// // Обработка ошибок
// // Опции
//     );
// }

const socket = io();
const statusElement = document.getElementById('status');
const coordsElement = document.getElementById('currentCoords');


if (!navigator.geolocation) {
    messageElement.textContent = "Ошибка геолокации.";
    return;
}


// Запускаем отслеживание местоположения
const watchId = navigator.geolocation.watchPosition(
    (position) => {
        const userCoords = position.coords;
        const latitude = userCoords.latitude;
        const longitude = userCoords.longitude;
        const accuracy = userCoords.accuracy;
        const timestamp = new Date(position.timestamp).toLocaleTimeString();

        const locationData = {
            lat: latitude,
            lng: longitude,
            acc: accuracy,
            ts: timestamp
        };

    },

    (error) => {
        messageElement.textContent = "Ошибка получения местоположения.";
    },
    {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000
    }

);





// Обновляем интерфейс
coordsElement.textContent = `Координаты: ${latitude.toFixed(6)}, ${longitude.toFixed(6)} (Точность: ${accuracy.toFixed(2)}м)`;
statusElement.textContent = 'Данные отправляются...';


// Отправляем данные на сервер через WebSocket
socket.emit('locationUpdate', locationData);
// Обработка ошибок
// Опции

let posElement = document.getElementById("posit");
document.querySelector('.posit').innerHTML = watchId;