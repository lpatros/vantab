const currentTheme = localStorage.getItem("theme");
const bodyElement = document.body;
const toogle = document.querySelector("#toogle-theme");


// Verifica se há um tema salvo no localStorage
if (currentTheme) {
  bodyElement.classList.add(currentTheme);
}

// Se nao tiver, verifica a preferência do sistema operacional
if (!currentTheme && window.matchMedia) {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    bodyElement.classList.add("dark-mode");
    localStorage.setItem("theme", "dark-mode");
  }
}

toggleIcon()

// Função para alternar entre os temas, chamando-a ao clicar no botão de tema
function switchTheme() {
  if (bodyElement.classList.contains("dark-mode")) {
    bodyElement.classList.remove("dark-mode");
    localStorage.setItem("theme", "light-mode");
  } else {
    bodyElement.classList.add("dark-mode");
    localStorage.setItem("theme", "dark-mode");
  }
  toggleIcon()
}

function toggleIcon() {
  if (bodyElement.classList.contains("dark-mode")) {
    toogle.classList.remove("fa-moon", "fa-regular");
    toogle.classList.add("fa-sun", "fa-solid");
    toogle.style.color = "white";
    toogle.style.color = "#edc01d";
  } else {
    toogle.classList.remove("fa-sun", "fa-solid");
    toogle.classList.add("fa-moon", "fa-regular");
    toogle.style.color = "";
  }
}
