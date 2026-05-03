const presentationWeatherElement = document.querySelector('#weather');

// Maps OpenWeatherMap icon codes to Font Awesome
const getWeatherIcon = (iconCode) => {
  
  const iconMap = {
    "01d": "fas fa-sun",                      // clear sky day
    "01n": "fas fa-moon",                     // clear sky night
    "02d": "fas fa-cloud-sun",                // few clouds day
    "02n": "fas fa-cloud-moon",               // few clouds night
    "03d": "fas fa-cloud",                    // scattered clouds day
    "03n": "fas fa-cloud",                    // scattered clouds night
    "04d": "fas fa-cloud",                    // broken clouds day (could also be fa-cloud-meatball)
    "04n": "fas fa-cloud-meatball",           // broken clouds night
    "09d": "fas fa-cloud-showers-heavy",      // shower rain day
    "09n": "fas fa-cloud-showers-heavy",      // shower rain night
    "10d": "fas fa-cloud-sun-rain",           // rain day
    "10n": "fas fa-cloud-moon-rain",          // rain night
    "11d": "fas fa-bolt",                     // thunderstorm day
    "11n": "fas fa-bolt",                     // thunderstorm night
    "13d": "fas fa-snowflake",                // snow day
    "13n": "fas fa-snowflake",                // snow night
    "50d": "fas fa-smog",                     // mist day
    "50n": "fas fa-smog",                     // mist night
  };
  
  return iconMap[iconCode] || "fas fa-question-circle"; // Standard icon if not found
}

const fetchWeather = async (apiKey, city) => {
  const units = localStorage.getItem('units');
  const lang = localStorage.getItem('lang');

  if (!units || !lang) {
    console.log("Units or language not provided.");
    return;
  }
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}&lang=${lang}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data;
    
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }
}

const setWeather = async () => {
  
  const apiKey = localStorage.getItem('apiKey');
  const city = localStorage.getItem('city');
  
  if (!apiKey || !city) {
    console.log("API key or city not provided.");
    presentationWeatherElement.textContent = typeof t === 'function' ? t('weather_no_api') : "API key or city not provided.";
    return;
  }
  
  const data = await fetchWeather(apiKey, city);
  
  if (!data) {
    console.log("Weather data unavailable.");
    presentationWeatherElement.textContent = typeof t === 'function' ? t('weather_unavailable') : "Weather data unavailable.";
    return;
  }
  
  const description = data.weather[0].description;
  const temperature = Math.round(data.main.temp);
  const iconCode = data.weather[0].icon;
  
  const weatherIconClass = getWeatherIcon(iconCode);
  
  // Format the first letter of the description to uppercase
  const formattedDescription = description.charAt(0).toUpperCase() + description.slice(1);
  
  const lang = localStorage.getItem('lang') || "pt_br";
  const currentlyText = typeof t === 'function' ? t('weather_currently') : (lang === 'en' ? 'Currently it is' : 'Atualmente faz');

  presentationWeatherElement.innerHTML = `
  ${formattedDescription}. ${currentlyText} ${temperature}°<br>
  <i class="weather-icon ${weatherIconClass}"></i><span class="temp-highlight">${temperature}°</span>
  `;
}

setWeather();

setInterval(setWeather, 600000); // Update weather every 10 minutes (600000 ms)

window.addEventListener('settingsUpdated', (e) => {
  if (['apiKey', 'city', 'units', 'lang'].includes(e.detail)) {
    setWeather();
  }
});

window.addEventListener('languageChanged', setWeather);

const verifyWeatherVisibility = () => {
  const showWeather = localStorage.getItem('showWeather') !== 'false';
  presentationWeatherElement.style.display = showWeather ? 'block' : 'none';
};

verifyWeatherVisibility();

window.addEventListener('visibilityUpdated', (e) => {
  if (e.detail === 'showWeather') {
    verifyWeatherVisibility();
  }
});