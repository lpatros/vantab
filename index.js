const settingsDivContainer = document.createElement('div');
settingsDivContainer.id = 'settingsDivContainer';
settingsDivContainer.style.display = 'none';

const settingsDiv = document.createElement('div');
settingsDiv.id = 'settingsDiv';

const settingsHeader = document.createElement('section');
settingsHeader.id = 'settingsHeader';

const settingsSpan = document.createElement('span');
settingsSpan.innerText = 'Settings';
settingsHeader.appendChild(settingsSpan);

settingsHeader.innerHTML = `
    ${settingsHeader.innerHTML}
    <i class="fa-solid fa-circle-xmark fa-lg" id="close-settings"></i>
`;

const closeSettingsIcon = settingsHeader.querySelector('#close-settings');

settingsDiv.appendChild(settingsHeader);

closeSettingsIcon.addEventListener('click', () => {
    settingsDivContainer.style.display = 'none';
});

const settingsClockSection = document.createElement('section');

const settingsClocklabel = document.createElement('label');
settingsClocklabel.for = 'settingsClock';
settingsClocklabel.className = 'settingsItemTittle';
settingsClocklabel.innerText = 'Clock';

const settingsClockText = document.createElement('span');
settingsClockText.className = 'settingsItemText';
settingsClockText.innerText = 'Ativar';

const settingsSwitchLabel = document.createElement('label');
settingsSwitchLabel.className = 'switch';

const settingsClockInput = document.createElement('input');
settingsClockInput.type = 'checkbox';
settingsClockInput.id = 'settingsClock';
settingsClockInput.checked = localStorage.getItem('showClock') === 'true';

const settingsClockSlider = document.createElement('span');
settingsClockSlider.className = 'slider';

settingsSwitchLabel.appendChild(settingsClockInput);
settingsSwitchLabel.appendChild(settingsClockSlider);

const settingsClockItem = document.createElement('div');
settingsClockItem.className = 'settingsItem';
settingsClockItem.appendChild(settingsClockText);
settingsClockItem.appendChild(settingsSwitchLabel);

settingsClockSection.appendChild(settingsClocklabel);
settingsClockSection.appendChild(settingsClockItem);

settingsDiv.appendChild(settingsClockSection);
settingsDivContainer.appendChild(settingsDiv);

document.body.appendChild(settingsDivContainer);

const settingsButton = document.querySelector('#settings-button');

settingsButton.addEventListener('click', () => {
    settingsDivContainer.removeAttribute('style');
});