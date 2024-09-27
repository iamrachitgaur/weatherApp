const hamburger = document.getElementById('hamburger')
const hamburger_top = document.getElementById('hamburger-top')
const hamburger_inner = document.getElementById('hamburger-inner')
const hamburger_bottom = document.getElementById('hamburger-bottom')

const hamburger_box = document.querySelector('.hamburger-box')

const header_responsive_bar = document.getElementById('header_responsive_bar')

hamburger.addEventListener('click',()=>{
    if(hamburger_box.id == 'un-active'){
        hamburger_box.id = 'active'
        hamburger_top.style.top = 'calc(50% - 2px)'
        hamburger_top.style.transform = 'rotate(45deg)'
        hamburger_bottom.style.transform = 'rotate(-45deg)'
        hamburger_bottom.style.bottom = 'calc(50% - 2px)'
        hamburger_inner.style.display = 'none'

        header_responsive_bar.style.transform = 'translateY(0%)'
    }
    else{
        hamburger_box.id = 'un-active'
        hamburger_top.style.top = '20%'
        hamburger_top.style.transform = 'rotate(0deg)'
        hamburger_bottom.style.transform = 'rotate(0deg)'
        hamburger_bottom.style.bottom = '20%'
        hamburger_inner.style.display = 'block'

        header_responsive_bar.style.transform = 'translateY(-100%)'

    }
})

// here
const apiKey = 'a6ce2cc0b7a08924a5a16ca43ee042c3'; // Replace with your OpenWeatherMap API key
const weatherInfo = document.getElementById('weatherInfo');
const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchBtn');
const getCurrentLocationBtn = document.getElementById('getCurrentLocationBtn');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        getWeatherByLocation(location);
    }
});

getCurrentLocationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getWeatherByCoordinates(lat, lon);
            },
            (error) => {
                weatherInfo.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
            }
        );
    } else {
        weatherInfo.innerHTML = '<p class="text-danger">Geolocation is not supported by your browser.</p>';
    }
});

async function getWeatherByLocation(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherInfo.innerHTML = '<p class="text-danger">Error fetching weather data. Please try again.</p>';
    }
}

async function getWeatherByCoordinates(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherInfo.innerHTML = '<p class="text-danger">Error fetching weather data. Please try again.</p>';
    }
}

function displayWeather(data) {
    const { name, main, weather, wind } = data;
    const weatherDescription = weather[0].description;
    const iconCode = weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherInfo.innerHTML = `
        <h2>${name}</h2>
        <img src="${iconUrl}" alt="${weatherDescription}">
        <p class="fs-4">${weatherDescription}</p>
        <p class="fs-2">${Math.round(main.temp)}°C</p>
        <p>Feels like: ${Math.round(main.feels_like)}°C</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind speed: ${wind.speed} m/s</p>
    `;
}