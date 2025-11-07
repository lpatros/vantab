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

shortcuts.forEach((shortcut, index) => {
    const a = document.createElement('a');
    a.href = shortcut.url;
    a.className = 'shortcut';
    a.title = shortcut.name;
    a.style.animationDelay = `${(index + 1) * 300}ms`;

    const iconContainer = document.createElement('div');
    iconContainer.className = 'shortcut-icon-container';

    const img = document.createElement('img');
    img.src = searchUrlFavicon(shortcut.url);
    img.className = 'shortcut-icon';
    img.alt = `${shortcut.name} icon`;
    iconContainer.appendChild(img);

    a.appendChild(iconContainer);

    const span = document.createElement('span');
    span.className = 'shortcut-label';
    span.textContent = shortcut.name;
    a.appendChild(span);

    shortcutsContainer.appendChild(a);
});