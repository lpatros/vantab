const presentationWeatherElement = document.querySelector('#weather');

// Mapeia códigos de ícone do OpenWeatherMap para Font Awesome
const getWeatherIcon = (iconCode) => {
  
  const iconMap = {
    "01d": "fas fa-sun",                      // céu limpo dia
    "01n": "fas fa-moon",                     // céu limpo noite
    "02d": "fas fa-cloud-sun",                // poucas nuvens dia
    "02n": "fas fa-cloud-moon",               // poucas nuvens noite
    "03d": "fas fa-cloud",                    // nuvens dispersas dia
    "03n": "fas fa-cloud",                    // nuvens dispersas noite
    "04d": "fas fa-cloud",                    // nuvens quebradas dia (tambem poderia ser fa-cloud-meatball)
    "04n": "fas fa-cloud-meatball",           // nuvens quebradas noite
    "09d": "fas fa-cloud-showers-heavy",      // chuva de banho dia
    "09n": "fas fa-cloud-showers-heavy",      // chuva de banho noite
    "10d": "fas fa-cloud-sun-rain",           // chuva dia
    "10n": "fas fa-cloud-moon-rain",          // chuva noite
    "11d": "fas fa-bolt",                     // trovoada dia
    "11n": "fas fa-bolt",                     // trovoada noite
    "13d": "fas fa-snowflake",                // neve dia
    "13n": "fas fa-snowflake",                // neve noite
    "50d": "fas fa-smog",                     // névoa dia
    "50n": "fas fa-smog",                     // névoa noite
  };
  
  return iconMap[iconCode] || "fas fa-question-circle"; // Ícone padrão caso não encontre
}

const fetchWeather = async (apiKey) => {
  const city = localStorage.getItem('city');
  const units = localStorage.getItem('units') || 'metric';
  const lang = localStorage.getItem('lang') || "pt_br";
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}&lang=${lang}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data;
    
  } catch (error) {
    console.error("Falha ao buscar dados do tempo:", error);
    presentationWeatherElement.textContent = "Não foi possível carregar o tempo.";
  }
}

const setWeather = async () => {
  
  const apiKey = localStorage.getItem('apiKey');
  
  if (!apiKey) {
    console.error("Chave da API não fornecida.");
    presentationWeatherElement.textContent = "Chave da API não fornecida.";
    return;
  }
  
  const data = await fetchWeather(apiKey);
  
  if (!data) {
    console.error("Dados do tempo indisponíveis.");
    presentationWeatherElement.textContent = "Dados do tempo indisponíveis.";
    return;
  }
  
  const description = data.weather[0].description;
  const temperature = Math.round(data.main.temp);
  const iconCode = data.weather[0].icon;
  
  const weatherIconClass = getWeatherIcon(iconCode);
  
  // Formata a primeira letra da descrição para maiúscula
  const formattedDescription = description.charAt(0).toUpperCase() + description.slice(1);
  
  presentationWeatherElement.innerHTML = `
  ${formattedDescription}. Atualmente faz ${temperature}°<br>
  <i class="weather-icon ${weatherIconClass}"></i><span class="temp-highlight">${temperature}°</span>
  `;
}

setWeather();

setInterval(fetchWeather, 600000); // Atualiza o tempo a cada 10 minutos (600000 ms)