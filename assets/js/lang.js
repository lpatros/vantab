const translations = {
  pt_br: {
    // General
    "page_title": "Nova Guia",
    "settings_btn": "Configurações",
    "footer_created_by": "criado por ",
    
    // Settings headers
    "settings_title": "Configurações",
    "settings_general": "Geral",
    "settings_visibility": "Visibilidade",
    "settings_links": "Links Rápidos",
    
    // Settings - General
    "label_name": "Nome",
    "placeholder_name": "Seu nome",
    "label_apikey": "API Key (OpenWeatherMap)",
    "placeholder_apikey": "Sua API Key",
    "label_city": "Cidade",
    "placeholder_city": "Ex: São Paulo",
    "label_unit": "Unidade",
    "label_lang": "Idioma",
    
    // Settings - Visibility
    "visibility_clock": "Relógio",
    "visibility_date": "Data",
    "visibility_greeting": "Saudação",
    "visibility_weather": "Clima",
    "visibility_links": "Links Rápidos",
    "visibility_settings_btn": "Botão de configurações",
    
    // Settings - Links
    "link_new_title": "Novo Link",
    "link_edit_title": "Atualizar Link",
    "placeholder_link_name": "Nome (Ex: GitHub)",
    "placeholder_link_url": "URL (Ex: github.com)",
    "btn_add": "Adicionar",
    "btn_update": "Atualizar",
    "btn_add_new": "Adicionar Novo",
    "icon_edit": "Editar",
    "icon_delete": "Excluir",
    
    // Greetings
    "greeting_morning": "Bom dia",
    "greeting_afternoon": "Boa tarde",
    "greeting_evening": "Boa noite",
    "greeting_default": "Olá",
    
    // Weather
    "weather_currently": "Atualmente faz",
    "weather_no_api": "API key ou cidade não informados.",
    "weather_unavailable": "Dados do clima indisponíveis."
  },
  en: {
    // General
    "page_title": "New Tab",
    "settings_btn": "Settings",
    "footer_created_by": "created by ",
    
    // Settings headers
    "settings_title": "Settings",
    "settings_general": "General",
    "settings_visibility": "Visibility",
    "settings_links": "Quick Links",
    
    // Settings - General
    "label_name": "Name",
    "placeholder_name": "Your name",
    "label_apikey": "API Key (OpenWeatherMap)",
    "placeholder_apikey": "Your API Key",
    "label_city": "City",
    "placeholder_city": "Ex: New York",
    "label_unit": "Unit",
    "label_lang": "Language",
    
    // Settings - Visibility
    "visibility_clock": "Clock",
    "visibility_date": "Date",
    "visibility_greeting": "Greeting",
    "visibility_weather": "Weather",
    "visibility_links": "Quick Links",
    "visibility_settings_btn": "Settings Button",
    
    // Settings - Links
    "link_new_title": "New Link",
    "link_edit_title": "Update Link",
    "placeholder_link_name": "Name (Ex: GitHub)",
    "placeholder_link_url": "URL (Ex: github.com)",
    "btn_add": "Add",
    "btn_update": "Update",
    "btn_add_new": "Add New",
    "icon_edit": "Edit",
    "icon_delete": "Delete",
    
    // Greetings
    "greeting_morning": "Good morning",
    "greeting_afternoon": "Good afternoon",
    "greeting_evening": "Good evening",
    "greeting_default": "Hello",
    
    // Weather
    "weather_currently": "Currently it is",
    "weather_no_api": "API key or city not provided.",
    "weather_unavailable": "Weather data unavailable."
  }
};

const getLang = () => {
  const lang = localStorage.getItem('lang') || 'pt_br';
  return translations[lang] ? lang : 'pt_br';
};

const t = (key) => {
  const lang = getLang();
  return translations[lang][key] || key;
};

const updateAppLanguage = () => {
  // Update document title
  document.title = t('page_title');

  // Update elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      // Check if it has child elements (we don't want to overwrite icons, like in buttons)
      // Usually it's better to wrap text in a span.
      if (el.tagName === 'SPAN' || el.tagName === 'LABEL' || el.tagName === 'H2' || el.tagName === 'BUTTON' || el.tagName === 'DIV') {
         // But wait, some buttons have icons. We should only replace the text nodes or specifically structured spans.
         // In index.html, the text for settings button is inside <span class="settings-text">
         el.textContent = t(key);
      }
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key) {
      el.placeholder = t(key);
    }
  });

  // Dispatch event for other scripts to update if needed
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: getLang() }));
};

// Listen to settings changes specifically for language
window.addEventListener('settingsUpdated', (e) => {
  if (e.detail === 'lang') {
    updateAppLanguage();
  }
});

// Initial update
document.addEventListener('DOMContentLoaded', updateAppLanguage);
