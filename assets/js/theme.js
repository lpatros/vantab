const currentTheme = localStorage.getItem("theme");
const bodyElement = document.body;
const toogle = document.querySelector("#toogle-theme");


// Verifica se há um tema salvo no localStorage
// if (currentTheme) {
//   bodyElement.classList.add(currentTheme);
// }

// Se nao tiver, verifica a preferência do sistema operacional
// if (!currentTheme && window.matchMedia) {
//   if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
//     bodyElement.classList.add("dark-mode");
//     localStorage.setItem("theme", "dark-mode");
//   }
// }

// toggleIcon()

// Função para alternar entre os temas, chamando-a ao clicar no botão de tema
const switchTheme = () => {

  if (bodyElement.classList.contains("dark-mode")) {
    bodyElement.classList.remove("dark-mode");
    bodyElement.classList.add("light-mode");
    localStorage.setItem("theme", "light-mode");

  } else {
    bodyElement.classList.add("dark-mode");
    bodyElement.classList.remove("light-mode");
    localStorage.setItem("theme", "dark-mode");
  }

  // toggleIcon()
}

// const toggleIcon = () => {

//   if (bodyElement.classList.contains("dark-mode")) {
//     toogle.style.color = "white";
//   } else {
//     toogle.style.color = "black";
//   }

// }
