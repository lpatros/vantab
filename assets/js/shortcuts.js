const shortcutsContainer = document.querySelector('#shortcuts-container');
const linkManagerList = document.querySelector('#link-manager-list');
const linkManagerForm = document.querySelector('#link-manager-form');
const linkFormContainer = document.querySelector('#link-form-container');
const toggleAddLinkFormBtn = document.querySelector('#toggle-add-link-form-btn');
const closeLinkFormBtn = document.querySelector('#close-link-form-btn');
const linkFormTitle = document.querySelector('#link-form-title');

let currentEditIndex = null;


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

    // Render settings manager
    if (linkManagerList) {
        linkManagerList.innerHTML = '';
        
        // Handle dragover on the container for the edges (top/bottom)
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
                // Optional: set a drag image or ghost effect
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
                    saveShortcuts(newOrder);
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
            editIcon.title = 'Editar';
            editIcon.addEventListener('click', () => {
                const nameInput = document.querySelector('#linkName');
                const urlInput = document.querySelector('#linkUrl');
                const addBtn = document.querySelector('#add-link-btn');
                
                if (linkFormContainer) linkFormContainer.style.display = 'block';
                if (toggleAddLinkFormBtn) toggleAddLinkFormBtn.style.display = 'none';
                if (linkFormTitle) linkFormTitle.textContent = 'Atualizar Link';
                
                nameInput.value = shortcut.name;
                urlInput.value = shortcut.url;
                currentEditIndex = index;
                if (addBtn) addBtn.textContent = 'Atualizar';
                nameInput.focus();
            });

            const deleteIcon = document.createElement('i');
            deleteIcon.className = 'fa-solid fa-trash';
            deleteIcon.title = 'Excluir';
            deleteIcon.addEventListener('click', () => {
                const newShortcuts = shortcuts.filter((_, i) => i !== index);
                saveShortcuts(newShortcuts);
                // Reset edit mode if deleting the currently edited item
                if (currentEditIndex === index) {
                    currentEditIndex = null;
                    document.querySelector('#linkName').value = '';
                    document.querySelector('#linkUrl').value = '';
                    const addBtn = document.querySelector('#add-link-btn');
                    if (addBtn) addBtn.textContent = 'Adicionar';
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
    }
};

const verifyShortcutsVisibility = () => {
    const showLinks = localStorage.getItem('showLinks') !== 'false';
    shortcutsContainer.style.display = showLinks ? 'flex' : 'none';
};

const linkManagerFormHandler = document.querySelector('#link-manager-form');

if (toggleAddLinkFormBtn) {
    toggleAddLinkFormBtn.addEventListener('click', () => {
        if (linkFormContainer) linkFormContainer.style.display = 'block';
        toggleAddLinkFormBtn.style.display = 'none';
        document.querySelector('#linkName').value = '';
        document.querySelector('#linkUrl').value = '';
        const addBtn = document.querySelector('#add-link-btn');
        if (addBtn) addBtn.textContent = 'Adicionar';
        if (linkFormTitle) linkFormTitle.textContent = 'Novo Link';
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

if (linkManagerFormHandler) {
    linkManagerFormHandler.addEventListener('submit', (e) => {
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
            
            const shortcuts = getShortcuts();
            
            if (currentEditIndex !== null) {
                shortcuts[currentEditIndex] = { name, url };
                currentEditIndex = null;
                const addBtn = document.querySelector('#add-link-btn');
                if (addBtn) addBtn.textContent = 'Adicionar';
            } else {
                shortcuts.push({ name, url });
            }
            
            saveShortcuts(shortcuts);
            
            nameInput.value = '';
            urlInput.value = '';
            
            if (linkFormContainer) linkFormContainer.style.display = 'none';
            if (toggleAddLinkFormBtn) toggleAddLinkFormBtn.style.display = 'block';
        } else {
            // A little visual feedback or just focus on the missing input
            if (!name) nameInput.focus();
            else if (!url) urlInput.focus();
        }
    });
}

window.addEventListener('visibilityUpdated', (e) => {
    if (e.detail === 'showLinks') {
        verifyShortcutsVisibility();
    }
});

renderShortcuts();
verifyShortcutsVisibility();