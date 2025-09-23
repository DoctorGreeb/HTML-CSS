const socket = io();
const statusElement = document.getElementById('status');
const coordsElement = document.getElementById('currentCoords');

// Проверяем поддержку Geolocation API
if (!navigator.geolocation) {
    statusElement.textContent = 'Geolocation не поддерживается вашим браузером.';
} else {
    statusElement.textContent = 'Ожидание данных о местоположении...';
    
    // Запускаем отслеживание местоположения
const watchId = navigator.geolocation.watchPosition(
        (position) => { // Успех
            const { latitude, longitude, accuracy } = position.coords;
            const timestamp = new Date(position.timestamp).toLocaleTimeString();
            
            const locationData = {
                lat: latitude,
                lng: longitude,
                acc: accuracy,
                ts: timestamp
            };
            
            // Обновляем интерфейс
            coordsElement.textContent = `Координаты: ${latitude.toFixed(6)}, ${longitude.toFixed(6)} (Точность: ${accuracy.toFixed(2)}м)`;
            statusElement.textContent = 'Данные отправляются...';
            
            // Отправляем данные на сервер через WebSocket
            socket.emit('locationUpdate', locationData);
        },
        (error) => { // Ошибка
            statusElement.textContent = `Ошибка: ${error.message}`;
        },
        { // Опции
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}