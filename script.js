/* Dropdown for hamburger menu */

document.addEventListener('DOMContentLoaded', function () {
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const headerMenu = document.querySelector('.headermenu');

    hamburgerIcon.addEventListener('click', () => {

        if (headerMenu.classList.contains('show')) {
            headerMenu.classList.remove('show');
            headerMenu.classList.add('hide');
        } else {
            headerMenu.classList.remove('hide');
            headerMenu.classList.add('show');
        }
    });
});

/* Weather API */

document.addEventListener('DOMContentLoaded', function () {
    const API_KEY = '95d39ad80b2ed7c430750b3533bffbaa'; 
    const CITY = 'Stockholm'; 
    const UNITS = 'metric'; 
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=${UNITS}&appid=${API_KEY}`;

    const weatherWidget = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');

    // Get weather data
    fetch(weatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const { temp } = data.main;
            const { name } = data;
            const iconId = data.weather[0].icon;

            const iconUrl = `https://openweathermap.org/img/wn/${iconId}@2x.png`;

            // Show weather
            weatherIcon.src = iconUrl;
            weatherIcon.alt = data.weather[0].description;
            weatherWidget.textContent = `Weather in ${name}: ${temp}°C`;
        })
        .catch(error => {
            weatherWidget.textContent = 'Could not load weather data.';
            console.error('Error fetching weather data:', error);
        });
});