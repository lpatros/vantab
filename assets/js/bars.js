const barsContainer = document.querySelector('#bars-container');

barsContainer.innerHTML = `
    <button class="hamburger" id="bars-button">
      <i class="fa-solid fa-bars fa-xl" style="color: #ffffff;"></i>
    </button>

    <div class="dropdown" id="dropdown-menu">
      <button onclick="switchTheme()">
        <i class="fa-solid fa-moon" id="toogle-theme"></i>
        <span>Dark mode</span>
      </button>
      <a href="./settings.html">
        <i class="fa-solid fa-gear"></i>
        <span>Settings</span>
      </a>
    </div>
`;

const barsButton = document.querySelector('#bars-button');
const dropdownMenu = document.querySelector('#dropdown-menu');

barsButton.addEventListener('click', () => {
  dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

// Close menu if clicked outside
window.addEventListener('click', (e) => {
  if (!barsButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.style.display = 'none';
  }
});
