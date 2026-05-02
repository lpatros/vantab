const presentationTextElement = document.querySelector('#greeting');

const setGreeting = () => {
  const userName = localStorage.getItem('userName') || null;
  const now = new Date();
  const hour = now.getHours();
  let greeting = t("greeting_default");
  
  if (hour >= 5 && hour < 12) {
    greeting = t("greeting_morning");
  } else if (hour >= 12 && hour < 18) {
    greeting = t("greeting_afternoon");
  } else {
    greeting = t("greeting_evening");
  }
  
  // Show greeting with user name if available
  presentationTextElement.textContent = userName ? `${greeting}, ${userName}` : `${greeting}`;
}

window.addEventListener('languageChanged', setGreeting);

const verifyGreetingVisibility = () => {
  const showGreeting = localStorage.getItem('showGreeting') !== 'false';
  presentationTextElement.style.display = showGreeting ? 'block' : 'none';
}

setGreeting();
verifyGreetingVisibility();

setInterval(setGreeting, 60000); // Update greeting every minute

window.addEventListener('settingsUpdated', (e) => {
  if (e.detail === 'userName') {
    setGreeting();
  }
});

window.addEventListener('visibilityUpdated', (e) => {
  if (e.detail === 'showGreeting') {
    verifyGreetingVisibility();
  }
});