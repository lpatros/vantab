const settingsDivContainer = document.querySelector('#settingsDivContainer');
const settingsButton = document.querySelector('#settings-button');
const closeSettingsIcon = document.querySelector('#close-settings');

// Opens settings
if (settingsButton) {
    settingsButton.addEventListener('click', () => {
        settingsDivContainer.removeAttribute('style');
    });
}

// Close settings when clicking on X
if (closeSettingsIcon) {
    closeSettingsIcon.addEventListener('click', () => {
        settingsDivContainer.style.display = 'none';
    });
}

// Close settings when clicking outside (in the dark overlay)
if (settingsDivContainer) {
    settingsDivContainer.addEventListener('click', (e) => {
        if (e.target === settingsDivContainer) {
            settingsDivContainer.style.display = 'none';
        }
    });
}

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

// Custom Dropdowns Logic
document.querySelectorAll('.custom-select').forEach(dropdown => {
    const trigger = dropdown.querySelector('.select-trigger');
    const options = dropdown.querySelectorAll('.select-option');
    const selectedText = dropdown.querySelector('.selected-text');
    const storageKey = dropdown.dataset.storageKey;

    // Load initial value
    const storedValue = localStorage.getItem(storageKey);
    if (storedValue) {
        const matchingOption = Array.from(options).find(opt => opt.dataset.value === storedValue);
        if (matchingOption) {
            selectedText.textContent = matchingOption.textContent;
            options.forEach(opt => opt.classList.remove('selected'));
            matchingOption.classList.add('selected');
        }
    }

    // Toggle dropdown
    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        
        const isOpen = dropdown.classList.contains('open');
        const section = dropdown.closest('.settings-section');
        
        // Close other dropdowns and remove section classes
        document.querySelectorAll('.custom-select').forEach(other => {
            other.classList.remove('open');
        });
        document.querySelectorAll('.settings-section').forEach(sec => {
            sec.classList.remove('has-open-dropdown');
        });
        
        if (!isOpen) {
            dropdown.classList.add('open');
            if (section) section.classList.add('has-open-dropdown');
        }
    });

    // Option selection
    options.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const value = option.dataset.value;
            const text = option.textContent;

            selectedText.textContent = text;
            localStorage.setItem(storageKey, value);
            
            options.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            
            dropdown.classList.remove('open');
            const section = dropdown.closest('.settings-section');
            if (section) section.classList.remove('has-open-dropdown');
            
            window.dispatchEvent(new CustomEvent('settingsUpdated', { detail: storageKey }));
        });
    });
});

// Close custom dropdowns when clicking outside
document.addEventListener('click', () => {
    document.querySelectorAll('.custom-select').forEach(dropdown => {
        dropdown.classList.remove('open');
    });
    document.querySelectorAll('.settings-section').forEach(section => {
        section.classList.remove('has-open-dropdown');
    });
});

// Toggles visibility
const togglesToSync = [
    { id: 'settingsClock', storageKey: 'showClock', default: 'true' },
    { id: 'settingsDate', storageKey: 'showDate', default: 'true' },
    { id: 'settingsGreeting', storageKey: 'showGreeting', default: 'true' },
    { id: 'settingsWeather', storageKey: 'showWeather', default: 'true' },
    { id: 'settingsLinks', storageKey: 'showLinks', default: 'true' },
    { id: 'settingsShowSettingsBtn', storageKey: 'showSettingsBtn', default: 'true' },
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

const verifySettingsBtnVisibility = () => {
    if (!settingsButton) return;
    const show = localStorage.getItem('showSettingsBtn') !== 'false';
    if (show) {
        settingsButton.classList.add('always-visible');
    } else {
        settingsButton.classList.remove('always-visible');
    }
};

verifySettingsBtnVisibility();

window.addEventListener('visibilityUpdated', (e) => {
    if (e.detail === 'showSettingsBtn') {
        verifySettingsBtnVisibility();
    }
});

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

// --- Link Manager (Shortcuts CRUD) ---

const linkManagerList = document.querySelector('#link-manager-list');
const linkManagerForm = document.querySelector('#link-manager-form');
const linkFormContainer = document.querySelector('#link-form-container');
const toggleAddLinkFormBtn = document.querySelector('#toggle-add-link-form-btn');
const closeLinkFormBtn = document.querySelector('#close-link-form-btn');
const linkFormTitle = document.querySelector('#link-form-title');

let currentEditIndex = null;

const renderLinkManager = () => {
    if (!linkManagerList) return;
    
    // getShortcuts should be available globally from shortcuts.js
    const shortcuts = typeof getShortcuts === 'function' ? getShortcuts() : [];
    
    linkManagerList.innerHTML = '';
    
    // Handle dragover on the container
    linkManagerList.addEventListener('dragover', (e) => {
        e.preventDefault();
        const draggingItem = document.querySelector('.dragging');
        if (!draggingItem) return;
        
        const items = [...linkManagerList.querySelectorAll('.link-item:not(.dragging)')];
        if (items.length === 0) {
            linkManagerList.appendChild(draggingItem);
            return;
        }

        const firstItem = items[0];
        const firstRect = firstItem.getBoundingClientRect();
        if (e.clientY < firstRect.top + firstRect.height / 2) {
            linkManagerList.insertBefore(draggingItem, firstItem);
        }

        const lastItem = items[items.length - 1];
        const lastRect = lastItem.getBoundingClientRect();
        if (e.clientY > lastRect.top + lastRect.height / 2) {
            linkManagerList.appendChild(draggingItem);
        }
    });

    shortcuts.forEach((shortcut, index) => {
        const item = document.createElement('div');
        item.className = 'link-item';
        item.draggable = true;
        item.dataset.index = index;
        
        // Drag events
        item.addEventListener('dragstart', (e) => {
            item.classList.add('dragging');
            e.dataTransfer.setData('text/plain', index);
        });

        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
            
            // Save new order based on DOM
            const items = [...linkManagerList.querySelectorAll('.link-item')];
            const newOrder = items.map(el => {
                const originalIndex = parseInt(el.dataset.index);
                return shortcuts[originalIndex];
            });
            
            // Only save if the order actually changed
            if (JSON.stringify(newOrder) !== JSON.stringify(shortcuts)) {
                // saveShortcuts should be available globally from shortcuts.js
                if (typeof saveShortcuts === 'function') saveShortcuts(newOrder);
            }
        });

        item.addEventListener('dragover', (e) => {
            e.preventDefault();
            const draggingItem = document.querySelector('.dragging');
            if (!draggingItem || draggingItem === item) return;

            const rect = item.getBoundingClientRect();
            const offset = e.clientY - rect.top;
            
            if (offset < rect.height / 2) {
                if (item.previousElementSibling !== draggingItem) {
                    linkManagerList.insertBefore(draggingItem, item);
                }
            } else {
                if (item.nextElementSibling !== draggingItem) {
                    linkManagerList.insertBefore(draggingItem, item.nextElementSibling);
                }
            }
        });

        const gripIcon = document.createElement('i');
        gripIcon.className = 'fa-solid fa-grip-vertical';

        const text = document.createElement('span');
        text.textContent = shortcut.name;
        
        const actions = document.createElement('div');
        actions.className = 'link-item-actions';
        
        const editIcon = document.createElement('i');
        editIcon.className = 'fa-solid fa-pen';
        editIcon.title = typeof t === 'function' ? t('icon_edit') : 'Editar';
        editIcon.addEventListener('click', () => {
            const nameInput = document.querySelector('#linkName');
            const urlInput = document.querySelector('#linkUrl');
            const addBtn = document.querySelector('#add-link-btn');
            
            if (linkFormContainer) linkFormContainer.style.display = 'block';
            if (toggleAddLinkFormBtn) toggleAddLinkFormBtn.style.display = 'none';
            if (linkFormTitle) linkFormTitle.textContent = typeof t === 'function' ? t('link_edit_title') : 'Atualizar Link';
            
            nameInput.value = shortcut.name;
            urlInput.value = shortcut.url;
            currentEditIndex = index;
            if (addBtn) addBtn.textContent = typeof t === 'function' ? t('btn_update') : 'Atualizar';
            nameInput.focus();
        });

        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'fa-solid fa-trash';
        deleteIcon.title = typeof t === 'function' ? t('icon_delete') : 'Excluir';
        deleteIcon.addEventListener('click', () => {
            const newShortcuts = shortcuts.filter((_, i) => i !== index);
            if (typeof saveShortcuts === 'function') saveShortcuts(newShortcuts);
            
            // Reset edit mode if deleting the currently edited item
            if (currentEditIndex === index) {
                currentEditIndex = null;
                document.querySelector('#linkName').value = '';
                document.querySelector('#linkUrl').value = '';
                const addBtn = document.querySelector('#add-link-btn');
                if (addBtn) addBtn.textContent = typeof t === 'function' ? t('btn_add') : 'Adicionar';
            } else if (currentEditIndex !== null && index < currentEditIndex) {
                currentEditIndex--;
            }
        });
        
        actions.appendChild(editIcon);
        actions.appendChild(deleteIcon);
        
        item.appendChild(gripIcon);
        item.appendChild(text);
        item.appendChild(actions);
        linkManagerList.appendChild(item);
    });
};

if (toggleAddLinkFormBtn) {
    toggleAddLinkFormBtn.addEventListener('click', () => {
        if (linkFormContainer) linkFormContainer.style.display = 'block';
        toggleAddLinkFormBtn.style.display = 'none';
        document.querySelector('#linkName').value = '';
        document.querySelector('#linkUrl').value = '';
        const addBtn = document.querySelector('#add-link-btn');
        if (addBtn) addBtn.textContent = typeof t === 'function' ? t('btn_add') : 'Adicionar';
        if (linkFormTitle) linkFormTitle.textContent = typeof t === 'function' ? t('link_new_title') : 'Novo Link';
        currentEditIndex = null;
        document.querySelector('#linkName').focus();
    });
}

if (closeLinkFormBtn) {
    closeLinkFormBtn.addEventListener('click', () => {
        if (linkFormContainer) linkFormContainer.style.display = 'none';
        if (toggleAddLinkFormBtn) toggleAddLinkFormBtn.style.display = 'block';
        currentEditIndex = null;
    });
}

if (linkManagerForm) {
    linkManagerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.querySelector('#linkName');
        const urlInput = document.querySelector('#linkUrl');
        
        let name = nameInput.value.trim();
        let url = urlInput.value.trim();
        
        if (name && url) {
            // Smart URL correction
            if (!/^https?:\/\//i.test(url)) {
                url = 'https://' + url;
            }
            
            const shortcuts = typeof getShortcuts === 'function' ? getShortcuts() : [];
            
            if (currentEditIndex !== null) {
                shortcuts[currentEditIndex] = { name, url };
                currentEditIndex = null;
                const addBtn = document.querySelector('#add-link-btn');
                if (addBtn) addBtn.textContent = typeof t === 'function' ? t('btn_add') : 'Adicionar';
            } else {
                shortcuts.push({ name, url });
            }
            
            if (typeof saveShortcuts === 'function') saveShortcuts(shortcuts);
            
            nameInput.value = '';
            urlInput.value = '';
            
            if (linkFormContainer) linkFormContainer.style.display = 'none';
            if (toggleAddLinkFormBtn) toggleAddLinkFormBtn.style.display = 'block';
        } else {
            if (!name) nameInput.focus();
            else if (!url) urlInput.focus();
        }
    });
}

// Initial render
renderLinkManager();

// Listen for shortcut updates to re-render the manager
window.addEventListener('shortcutsUpdated', () => {
    renderLinkManager();
});

// Re-render when language changes to update dynamic titles
window.addEventListener('languageChanged', () => {
    renderLinkManager();
});
