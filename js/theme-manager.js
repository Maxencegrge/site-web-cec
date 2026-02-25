/* ===== GESTIONNAIRE DE THÈME/COULEURS ===== */

const ThemeManager = {
  // Couleurs par défaut du site
  defaultColors: {
    bg: '#0b1220',
    surface: '#111827',
    text: '#ffffff',
    muted: '#cbd5e1',
    border: '#1f2937',
    primary: '#60a5fa',
    secondary: '#93c5fd',
    success: '#4ade80',
    danger: '#f87171',
    warning: '#fbbf24',
    info: '#38bdf8'
  },

  // Palettes prédéfinies
  predefinedPalettes: {
    slate: {
      name: 'Ardoise',
      colors: {
        bg: '#0b1220',
        surface: '#111827',
        text: '#ffffff',
        muted: '#cbd5e1',
        border: '#1f2937',
        primary: '#60a5fa',
        secondary: '#93c5fd',
        success: '#4ade80',
        danger: '#f87171',
        warning: '#fbbf24',
        info: '#38bdf8'
      }
    }
  },

  // Charger les couleurs sauvegardées ou les par défaut
  getColors: function() {
    const stored = localStorage.getItem('site_colors');
    return stored ? JSON.parse(stored) : this.defaultColors;
  },

  // Sauvegarder les couleurs
  saveColors: function(colors) {
    localStorage.setItem('site_colors', JSON.stringify(colors));
    this.applyColors(colors);
  },

  // Appliquer les couleurs au DOM
  applyColors: function(colors) {
    const root = document.documentElement;
    Object.keys(colors).forEach(key => {
      root.style.setProperty(`--${key}`, colors[key]);
    });
  },

  // Initialiser le thème au chargement
  init: function() {
    this.applyPalette('slate');
  },

  // Réinitialiser aux couleurs par défaut
  resetToDefault: function() {
    this.saveColors(this.defaultColors);
  },

  // Appliquer une palette prédéfinie
  applyPalette: function(paletteKey) {
    if (this.predefinedPalettes[paletteKey]) {
      const palette = this.predefinedPalettes[paletteKey];
      this.saveColors(palette.colors);
      // Memorise la palette courante pour la bascule clair/sombre
      localStorage.setItem('current_palette', paletteKey);
      const paletteCategory = this.isDarkPalette(paletteKey) ? 'last_dark_palette' : 'last_light_palette';
      localStorage.setItem(paletteCategory, paletteKey);
      return true;
    }
    return false;
  },

  // Déterminer si une palette est sombre
  isDarkPalette: function(paletteKey) {
    return paletteKey === 'slate';
  },

  // Obtenir toutes les palettes
  getPalettes: function() {
    return this.predefinedPalettes;
  }
};

// Initialiser le thème au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
});

// Export pour utilisation globale
window.ThemeManager = ThemeManager;
