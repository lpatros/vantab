const clockContainer = document.querySelector('#clock-container');
clockContainer.innerHTML = `
  <div class="clock-container">
    <div id="time"></div>
    <div id="date"></div>
  </div>
  `;

const setClock = () => {
  const now = new Date();
  const timeElement = document.querySelector('#time');
  const dateElement = document.querySelector('#date');


  // Formato: (HH:MM)
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  timeElement.textContent = `${hours}:${minutes}`;

  // Formato: "quinta-feira, 29 de maio"
  const optionsDate = { weekday: 'long', day: 'numeric', month: 'long' };
  const formattedDate = now.toLocaleDateString('pt-BR', optionsDate);
  dateElement.textContent = formattedDate;
}

setInterval(setClock, 1000);
setClock();