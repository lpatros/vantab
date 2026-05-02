const currentTheme = localStorage.getItem("theme");
const bodyElement = document.body;
const toogle = document.querySelector("#toogle-theme");


// Check if there is a saved theme in localStorage
// if (currentTheme) {
//   bodyElement.classList.add(currentTheme);
// }

// If not, check the operating system preference
// if (!currentTheme && window.matchMedia) {
//   if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
//     bodyElement.classList.add("dark-mode");
//     localStorage.setItem("theme", "dark-mode");
//   }
// }

// toggleIcon()

// Function to switch between themes, calling it when clicking the theme button
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
