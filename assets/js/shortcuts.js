const shortcutsContainer = document.querySelector('#shortcuts-container');

const shortcuts = [
    {
        name: 'Gemini',
        url: 'https://gemini.google.com/app',
    },
    {
        name: 'Gmail',
        url: 'https://mail.google.com',
    },
    {
        name: 'YouTube',
        url: 'https://www.youtube.com',
    },
    {
        name: 'GitHub',
        url: 'https://www.github.com',
    },
];

const searchUrlFavicon = (url, size=64) => {

    const googleUrl = 'https://www.google.com/s2/favicons';

    return `${googleUrl}?sz=${size}&domain=${url}`;
}

shortcutsContainer.innerHTML = shortcuts.map((shortcut, index) => `
    <a href="${shortcut.url}" class="shortcut" title="${shortcut.name}" style="animation-delay: ${(index + 1) * 300}ms;" >
        <div class="shortcut-icon-container">
          <img src="${searchUrlFavicon(shortcut.url)}" class="shortcut-icon" alt="${shortcut.name} icon">
        </div>
        <span class="shortcut-label">${shortcut.name}</span>
    </a>
`).join('');