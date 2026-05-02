const clockContainer = document.querySelector('#clock-container');

const timeElement = document.createElement('div');
timeElement.id = 'time';
clockContainer.appendChild(timeElement);

const dateElement = document.createElement('div');
dateElement.id = 'date';
clockContainer.appendChild(dateElement);

const setClock = () => {
  const now = new Date();

  // Format: (HH:MM)
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  timeElement.textContent = `${hours}:${minutes}`;

  // Format: "quinta-feira, 29 de maio"
  const optionsDate = { weekday: 'long', day: 'numeric', month: 'long' };
  const formattedDate = now.toLocaleDateString('pt-BR', optionsDate);
  dateElement.textContent = formattedDate;
}

let clockInterval;

const verifyClockVisibility = () => {
  const showClock = localStorage.getItem('showClock') !== 'false';
  const showDate = localStorage.getItem('showDate') !== 'false';

  timeElement.style.display = showClock ? 'block' : 'none';
  dateElement.style.display = (showClock && showDate) ? 'block' : 'none';

  if (!showClock) {
    clockContainer.style.display = 'none';
  } else {
    clockContainer.style.display = 'block';
  }
}

// Start the clock
setClock();
clockInterval = setInterval(setClock, 1000);
verifyClockVisibility();

window.addEventListener('visibilityUpdated', (e) => {
  if (['showClock', 'showDate'].includes(e.detail)) {
    verifyClockVisibility();
  }
});