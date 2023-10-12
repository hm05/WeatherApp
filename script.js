// API key obtained from OpenWeatherMap
const apiKey = '3b11eb0825b6c4acf31bc2dfa5bfed40';

// DOM elements
const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const weatherInfo = document.getElementById('weatherInfo');

// Event listeners
searchButton.addEventListener('click', searchWeather);
locationInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        searchWeather();
    }
});

// Function to fetch weather data
function searchWeather() {
    const location = locationInput.value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    // Fetch weather data
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Display weather information in the UI
            displayWeather(data);
        })
        .catch(error => {
            // Handle errors and display an error message
            console.error(error);
            weatherInfo.innerHTML = 'Error: Unable to fetch weather data.';
        });
}

// Function to display weather information
function displayWeather(data) {
    // Extract data from the API response
    const cityName = data.name;
    const country = data.sys.country;
    const weatherDescription = data.weather[0].description;
    const currentTemperature = data.main.temp;
    const minTemperature = data.main.temp_min;
    const maxTemperature = data.main.temp_max;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    // Display data in the UI
    weatherInfo.innerHTML = `
        <h2>${cityName}, ${country}</h2>
        <p>Weather: ${weatherDescription}</p>
        <p>Temperature: ${currentTemperature}°C</p>
        <p>Min Temperature: ${minTemperature}°C</p>
        <p>Max Temperature: ${maxTemperature}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
    `;
}
