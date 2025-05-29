function updateClock() {
  const now = new Date();
  const timeElement = document.getElementById('time');
  const dateElement = document.getElementById('date');

  // Format Time (HH:MM)
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  timeElement.textContent = `${hours}:${minutes}`;

  // Format Date (e.g., "quinta-feira, 29 de maio")
  const optionsDate = { weekday: 'long', day: 'numeric', month: 'long' };
  const formattedDate = now.toLocaleDateString('pt-BR', optionsDate);

  // Capitalize the first letter of the weekday and month if needed by toLocaleDateString behavior
  // For 'pt-BR', it usually already capitalizes the weekday and month.
  // If not, manual capitalization might be needed for perfect match.
  // Example: dateParts = formattedDate.split(', ');
  // weekday = dateParts[0].charAt(0).toUpperCase() + dateParts[0].slice(1);
  // dayMonth = dateParts[1]; // Potentially capitalize month if needed
  // dateElement.textContent = `${weekday}, ${dayMonth}`;

  dateElement.textContent = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1).replace(/\bde\b\s(\w)/, (match, p1) => `de ${p1.toUpperCase()}`);


  // For more precise control like the image (e.g. "quinta-feira, 29 de maio"):
  const day = now.getDate();
  const weekday = now.toLocaleDateString('pt-BR', { weekday: 'long' });
  const month = now.toLocaleDateString('pt-BR', { month: 'long' });
  dateElement.textContent = `${weekday.charAt(0).toUpperCase() + weekday.slice(1)}, ${day} de ${month}`;


}

// Update the clock every second
setInterval(updateClock, 1000);

// Initial call to display clock immediately
updateClock();
