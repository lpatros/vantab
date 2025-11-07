const presentationTextElement = document.querySelector('#greeting');
const userName = localStorage.getItem('userName') || null;

const setGreeting = () => {
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
  
  // Exibir saudação com o nome do usuário, se houver
  presentationTextElement.textContent = userName && `${greeting}, ${userName}` || `${greeting}`;
}

setGreeting();

setInterval(setGreeting, 60000); // Atualiza a saudação a cada minuto