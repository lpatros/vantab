function updateClock() {
  const now = new Date();
  const timeElement = document.getElementById('time');
  const dateElement = document.getElementById('date');

  // Formato: (HH:MM)
  const hours = now.getHours()
  const minutes = now.getMinutes()
  timeElement.textContent = `${hours}:${minutes}`;

  // Formato: "quinta-feira, 29 de maio"
  const optionsDate = { weekday: 'long', day: 'numeric', month: 'long' };
  const formattedDate = now.toLocaleDateString('pt-BR', optionsDate);

  dateElement.textContent = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1).replace(/\bde\b\s(\w)/, (match, p1) => `de ${p1.toUpperCase()}`);
}

// Atualiza o relógio a cada segundo
setInterval(updateClock, 1000);

// Chamada inicial para exibir o relógio imediatamente
updateClock();
