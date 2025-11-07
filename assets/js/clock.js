const clockContainer = document.querySelector('#clock-container');

const timeElement = document.createElement('div');
timeElement.id = 'time';
clockContainer.appendChild(timeElement);

const dateElement = document.createElement('div');
dateElement.id = 'date';
clockContainer.appendChild(dateElement);

const setClock = () => {

  const now = new Date();

  // Formato: (HH:MM)
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  timeElement.textContent = `${hours}:${minutes}`;

  // Formato: "quinta-feira, 29 de maio"
  const optionsDate = { weekday: 'long', day: 'numeric', month: 'long' };
  const formattedDate = now.toLocaleDateString('pt-BR', optionsDate);
  dateElement.textContent = formattedDate;
}

let clockInterval;
const verifyClockVisibility = () => {
  
  const showClock = localStorage.getItem('showClock');

  clearInterval(clockInterval);
  
  if (showClock === 'false') {
    clockContainer.style.display = 'none';
    return;
  }
  
  setClock();
  clockInterval = setInterval(setClock, 1000);
  clockContainer.removeAttribute('style');

  if (showClock === null) {
    localStorage.setItem('showClock', 'true');
  }
}

const clockInput = document.querySelector('#settingsClock');

clockInput.addEventListener('change', () => {
  const isChecked = clockInput.checked;

  localStorage.setItem('showClock', isChecked);

  verifyClockVisibility();
});

verifyClockVisibility();