/* ===== GESTIONNAIRE MODE SOMBRE/CLAIR ===== */

const DarkModeToggle = {
  DARK_MODE_KEY: 'dark_mode_enabled',
  TOGGLE_BUTTON_ID: 'theme-toggle-btn',
  PALETTE_DARK_MAP: {
    default: 'darkMode',
    ocean: 'darkBlue',
    sunset: 'midnight',
    forest: 'darkGreen',
    minimalist: 'slate',
    lavender: 'darkPurple',
    tropical: 'cyberpunk'
  },

  // Initialiser le mode sombre
  init: function() {
    this.createToggleButton();
    this.loadSavedMode();
    this.setupEventListeners();
  },

  // Créer le bouton de bascule
  createToggleButton: function() {
    // Vérifier si le bouton existe déjà
    if (document.getElementById(this.TOGGLE_BUTTON_ID)) {
      return;
    }

    // Créer le bouton
    const button = document.createElement('button');
    button.id = this.TOGGLE_BUTTON_ID;
    button.className = 'theme-toggle-btn';
    button.type = 'button';
    button.title = 'Basculer le mode clair/sombre';
    button.setAttribute('aria-label', 'Basculer le mode clair/sombre');
    
    // Contenu du bouton
    button.innerHTML = '<span class="toggle-icon">🌙</span>';
    
    // Ajouter le bouton au début du body
    document.body.insertBefore(button, document.body.firstChild);
  },

  // Charger le mode sauvegardé
  loadSavedMode: function() {
    const isDarkMode = localStorage.getItem(this.DARK_MODE_KEY) === 'true';
    if (isDarkMode) {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }
  },

  // Configurer les event listeners
  setupEventListeners: function() {
    const button = document.getElementById(this.TOGGLE_BUTTON_ID);
    if (button) {
      button.addEventListener('click', () => this.toggleMode());
    }
  },

  // Basculer le mode
  toggleMode: function() {
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDarkMode) {
      this.disableDarkMode();
    } else {
      this.enableDarkMode();
    }
  },

  // Activer le mode sombre
  enableDarkMode: function() {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.classList.add('dark-mode');
    localStorage.setItem(this.DARK_MODE_KEY, 'true');
    this.updateButtonIcon(true);

    // Appliquer la palette sombre si une palette sombre est sélectionnée
    if (window.ThemeManager) {
      const currentPalette = localStorage.getItem('current_palette') || 'default';
      const lastDarkPalette = localStorage.getItem('last_dark_palette') || 'darkMode';
      const isAlreadyDark = ThemeManager.isDarkPalette(currentPalette);
      const mappedDark = this.PALETTE_DARK_MAP[currentPalette];
      const targetPalette = isAlreadyDark ? currentPalette : (mappedDark || lastDarkPalette || 'darkMode');
      ThemeManager.applyPalette(targetPalette);
      localStorage.setItem('current_palette', targetPalette);
    }

    // Garantir un texte clair en mode sombre (après application de palette)
    this.forceTextContrast(true);
  },

  // Désactiver le mode sombre
  disableDarkMode: function() {
    document.documentElement.setAttribute('data-theme', 'light');
    document.body.classList.remove('dark-mode');
    localStorage.setItem(this.DARK_MODE_KEY, 'false');
    this.updateButtonIcon(false);

    // Revenir à une palette claire si on est en sombre
    if (window.ThemeManager) {
      const currentPalette = localStorage.getItem('current_palette') || 'default';
      const lastLightPalette = localStorage.getItem('last_light_palette') || 'default';
      const isDarkPalette = ThemeManager.isDarkPalette(currentPalette);
      if (isDarkPalette) {
        ThemeManager.applyPalette(lastLightPalette);
        localStorage.setItem('current_palette', lastLightPalette);
      }
    }

    // Garantir un texte foncé en mode clair (après application de palette)
    this.forceTextContrast(false);
  },

  // Mettre à jour l'icône du bouton
  updateButtonIcon: function(isDarkMode) {
    const button = document.getElementById(this.TOGGLE_BUTTON_ID);
    if (button) {
      const icon = button.querySelector('.toggle-icon');
      if (icon) {
        icon.textContent = isDarkMode ? '☀️' : '🌙';
      }
    }
  },

  // Forcer un contraste de texte lisible selon le mode
  forceTextContrast: function(isDarkMode) {
    const root = document.documentElement;
    root.style.setProperty('--text', isDarkMode ? '#f5f5f5' : '#1a1a1a');
    root.style.setProperty('--muted', isDarkMode ? '#cfd2d9' : '#666666');
  }
};

// Initialiser au chargement du DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => DarkModeToggle.init());
} else {
  DarkModeToggle.init();
}
