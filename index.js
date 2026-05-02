const settingsDivContainer = document.querySelector('#settingsDivContainer');
const settingsButton = document.querySelector('#settings-button');
const closeSettingsIcon = document.querySelector('#close-settings');

// Opens settings
settingsButton.addEventListener('click', () => {
    settingsDivContainer.removeAttribute('style');
});

// Close settings when clicking on X
closeSettingsIcon.addEventListener('click', () => {
    settingsDivContainer.style.display = 'none';
});

// Close settings when clicking outside (in the dark overlay)
settingsDivContainer.addEventListener('click', (e) => {
    if (e.target === settingsDivContainer) {
        settingsDivContainer.style.display = 'none';
    }
});

// Collapsible logic (accordions)
document.querySelectorAll('.collapsible-tittle').forEach(title => {
    title.addEventListener('click', () => {
        const content = title.nextElementSibling;
        const icon = title.querySelector('i');
        
        content.classList.toggle('collapsed');
        
        if (content.classList.contains('collapsed')) {
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        } else {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        }
    });
});

// Text inputs
const inputsToSync = [
    { id: 'settingsName', storageKey: 'userName' },
    { id: 'settingsApiKey', storageKey: 'apiKey' },
    { id: 'settingsCity', storageKey: 'city' }
];

inputsToSync.forEach(input => {
    const el = document.querySelector(`#${input.id}`);
    if (el) {
        // Initializes
        const stored = localStorage.getItem(input.storageKey);
        if (stored) el.value = stored;

        // Saves on change/blur
        el.addEventListener('change', (e) => {
            localStorage.setItem(input.storageKey, e.target.value);
            window.dispatchEvent(new CustomEvent('settingsUpdated', { detail: input.storageKey }));
        });
    }
});

// Toggles visibility
const togglesToSync = [
    { id: 'settingsClock', storageKey: 'showClock', default: 'true' },
    { id: 'settingsDate', storageKey: 'showDate', default: 'true' },
    { id: 'settingsGreeting', storageKey: 'showGreeting', default: 'true' },
    { id: 'settingsWeather', storageKey: 'showWeather', default: 'true' },
    { id: 'settingsLinks', storageKey: 'showLinks', default: 'true' },
];

togglesToSync.forEach(toggle => {
    const el = document.querySelector(`#${toggle.id}`);
    if (el) {
        // Initializes
        let stored = localStorage.getItem(toggle.storageKey);
        if (stored === null) {
            stored = toggle.default;
            localStorage.setItem(toggle.storageKey, stored);
        }
        el.checked = stored === 'true';

        // Saves on change
        el.addEventListener('change', (e) => {
            localStorage.setItem(toggle.storageKey, e.target.checked);
            window.dispatchEvent(new CustomEvent('visibilityUpdated', { detail: toggle.storageKey }));
        });
    }
});

const settingsClockEl = document.querySelector('#settingsClock');
const settingsDateContainer = document.querySelector('#settingsDateContainer');

const verifyDateToggleState = () => {
    if (!settingsClockEl || !settingsDateContainer) return;
    
    if (!settingsClockEl.checked) {
        settingsDateContainer.classList.add('disabled');
    } else {
        settingsDateContainer.classList.remove('disabled');
    }
};

if (settingsClockEl) {
    settingsClockEl.addEventListener('change', verifyDateToggleState);
    verifyDateToggleState();
}

// Toggle API Key visibility
const toggleApiKeyVisibility = document.querySelector('#toggleApiKeyVisibility');
const settingsApiKey = document.querySelector('#settingsApiKey');
const eyeIcon = document.querySelector('#eyeIcon');

if (toggleApiKeyVisibility && settingsApiKey && eyeIcon) {
    toggleApiKeyVisibility.addEventListener('click', () => {
        if (settingsApiKey.type === 'password') {
            settingsApiKey.type = 'text';
            eyeIcon.classList.remove('fa-eye');
            eyeIcon.classList.add('fa-eye-slash');
        } else {
            settingsApiKey.type = 'password';
            eyeIcon.classList.remove('fa-eye-slash');
            eyeIcon.classList.add('fa-eye');
        }
    });
}