document.addEventListener('DOMContentLoaded', () => {
  const presentationTextElement = document.getElementById('presentation-text');
  const presentationWeatherElement = document.getElementById('presentation-weather');

  // Preencha os valores abaixo com suas informações
  const userName = ""; // Nome do usuário para saudação
  const apiKey = ""; // Chave de API aqui
  const city = ""; // Cidade para a qual você deseja obter o tempo
  const units = "metric"; // Para Celsius
  const lang = "pt_br"; // Idioma para a descrição do tempo

  // 1. Definir Saudação
  function setGreeting() {
    const now = new Date();
    const hour = now.getHours();
    let greeting = "Olá";

    if (hour >= 5 && hour < 12) {
      greeting = "Bom dia";
    } else if (hour >= 12 && hour < 18) {
      greeting = "Boa tarde";
    } else {
      greeting = "Boa noite";
    }
    presentationTextElement.textContent = `${greeting}, ${userName}`;
  }

  // 2. Buscar e Exibir Dados do Tempo
  const fetchWeather = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}&lang=${lang}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      const data = await response.json();

      const description = data.weather[0].description;
      const temperature = Math.round(data.main.temp);
      const iconCode = data.weather[0].icon;

      const weatherIconClass = getWeatherIcon(iconCode);

      // Formata a primeira letra da descrição para maiúscula
      const formattedDescription = description.charAt(0).toUpperCase() + description.slice(1);

      // Constrói o HTML para as informações do tempo
      // Linha 1: Descrição. Atualmente faz Xº
      // Linha 2: Ícone Temperaturaº
      presentationWeatherElement.innerHTML = `
        ${formattedDescription}. Atualmente faz ${temperature}°<br>
        <i class="weather-icon ${weatherIconClass}"></i><span class="temp-highlight">${temperature}°</span>
      `;

    } catch (error) {
      console.error("Falha ao buscar dados do tempo:", error);
      presentationWeatherElement.textContent = "Não foi possível carregar o tempo.";
    }
  }

  // Mapeia códigos de ícone do OpenWeatherMap para Font Awesome
  function getWeatherIcon(iconCode) {
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

  // Inicializar
  setGreeting();
  fetchWeather();

  // Atualizar a saudação e o tempo periodicamente (opcional)
  // Saudação muda menos frequentemente, a cada minuto para pegar a hora certa.
  setInterval(setGreeting, 60000); // Atualiza a saudação a cada minuto
  setInterval(fetchWeather, 600000); // Atualiza o tempo a cada 10 minutos (600000 ms)
});