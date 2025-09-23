if (!navigator.geolocation) {
    console.log('Geolocation не работает.');
} else {
    navigator.geolocation.getCurrentPosition(showMap, showError);
}

function showMap(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    getWeather(lat, lon);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log('Отказано в доступе к геолокации.');
            break;
        case error.POSITION_UNAVAILABLE:
            console.log('Не удалось получить геолокацию.');
            break;
        case error.TIMEOUT:
            console.log('Таймаут получения геолокации.');
            break;
        case error.UNKNOWN_ERROR:
            console.log('Неизвестная ошибка.');
            break;
    }
}

const apiKey = '4413254fae154f4fa6c150157251909';

async function getWeather(latitude, longitude) {

    const location = `${latitude},${longitude}`;

const date = new Date().toISOString().slice(0, 10);
    const date1 = 'date';
    const date2 = '2025-09-20';
    const url1 = `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${location}&dt=${date1}`;


    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            console.log('Данные о погоде:', data);

            displayWeather(data);
        } else {
            console.log('Ошибка API:', data.error?.message);
        }
    } catch (error) {
        console.log('Ошибка при запросе данных о погоде:', error);
    }
}

function displayWeather(data) {
    const date = new Date().toISOString().slice(0, 10);
    const time = new Date().toISOString().slice(11, 19);
    const locationDiv = document.getElementById('location');
    if (locationDiv && data.location && data.current) {
        locationDiv.innerHTML = `
            <h2>Погода в ${data.location.name}, ${data.location.country}</h2>
            <p>Температура: ${data.current.temp_c}°C</p>
            <p>Состояние: ${data.current.condition.text}</p>
            <p>Влажность: ${data.current.humidity}%</p>
            <p>Скорость ветра: ${data.current.wind_kph} км/ч</p>
            <p>Дата: ${date}, Время: ${time}</p>
        `;
    }
}
