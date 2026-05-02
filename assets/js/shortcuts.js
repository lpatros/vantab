const shortcutsContainer = document.querySelector('#shortcuts-container');


const defaultShortcuts = [
    { name: 'Gemini', url: 'https://gemini.google.com/app' },
    { name: 'Gmail', url: 'https://mail.google.com' },
    { name: 'YouTube', url: 'https://www.youtube.com' },
    { name: 'GitHub', url: 'https://www.github.com' }
];

const getShortcuts = () => {
    try {
        const stored = localStorage.getItem('shortcuts');
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
                return parsed;
            }
        }
    } catch (e) {
        console.error('Error parsing shortcuts:', e);
    }
    localStorage.setItem('shortcuts', JSON.stringify(defaultShortcuts));
    return defaultShortcuts;
};

const saveShortcuts = (shortcuts) => {
    localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
    renderShortcuts();
    window.dispatchEvent(new CustomEvent('shortcutsUpdated'));
};

const searchUrlFavicon = (url, size=64) => {
    const googleUrl = 'https://www.google.com/s2/favicons';
    return `${googleUrl}?sz=${size}&domain=${url}`;
}

const renderShortcuts = () => {
    const shortcuts = getShortcuts();
    
    // Render main container
    shortcutsContainer.innerHTML = '';
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

    // Render settings manager - REMOVED (now in settings.js)
};

const verifyShortcutsVisibility = () => {
    const showLinks = localStorage.getItem('showLinks') !== 'false';
    shortcutsContainer.style.display = showLinks ? 'flex' : 'none';
};

// Link manager form handlers - REMOVED (now in settings.js)

window.addEventListener('visibilityUpdated', (e) => {
    if (e.detail === 'showLinks') {
        verifyShortcutsVisibility();
    }
});

renderShortcuts();
verifyShortcutsVisibility();