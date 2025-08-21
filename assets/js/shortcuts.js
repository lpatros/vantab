const shortcutsContainer = document.querySelector('#shortcuts-container');

const shortcuts = [
    {
        name: 'Gemini',
        url: 'https://gemini.google.com/app',
        icon: 'assets/icons/gemini_icon.png',
    },
    {
        name: 'Gmail',
        url: 'https://mail.google.com',
        icon: 'assets/icons/Gmail_icon_(2020).svg.png',
    },
    {
        name: 'YouTube',
        url: 'https://www.youtube.com',
        icon: 'fa-brands fa-youtube fa-xl',
    },
    {
        name: 'GitHub',
        url: 'https://www.github.com',
        icon: 'fa-brands fa-github fa-xl',
    },
];

shortcutsContainer.innerHTML = shortcuts.map((shortcut, index) => `
    <a href="${shortcut.url}" class="shortcut" title="${shortcut.name}" style="animation-delay: ${(index + 1) * 300}ms;" >
        <div class="shortcut-icon-container">
          ${shortcut.icon.startsWith('fa-') ? `<i class="${shortcut.icon}"></i>` : `<img src="${shortcut.icon}" class="shortcut-icon" alt="${shortcut.name} icon">`}
        </div>
        <span class="shortcut-label">${shortcut.name}</span>
    </a>
`).join('');