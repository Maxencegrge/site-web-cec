/* ===== GESTIONNAIRE DE THÈME/COULEURS ===== */

const ThemeManager = {
  // Couleurs par défaut du site
  defaultColors: {
    bg: '#f5f5f5',
    surface: '#ffffff',
    text: '#1e1e1e',
    muted: '#666',
    border: '#e5e5e5',
    primary: '#6C63FF',
    secondary: '#ff6b6b',
    success: '#51cf66',
    danger: '#e63946',
    warning: '#ffa500',
    info: '#4ecdc4'
  },

  // Palettes prédéfinies
  predefinedPalettes: {
    default: {
      name: 'Défaut (Bleu Violet)',
      colors: {
        bg: '#f5f5f5',
        surface: '#ffffff',
        text: '#1e1e1e',
        muted: '#666',
        border: '#e5e5e5',
        primary: '#6C63FF',
        secondary: '#ff6b6b',
        success: '#51cf66',
        danger: '#e63946',
        warning: '#ffa500',
        info: '#4ecdc4'
      }
    },
    ocean: {
      name: 'Océan',
      colors: {
        bg: '#e8f4f8',
        surface: '#ffffff',
        text: '#0c3a47',
        muted: '#5a7a82',
        border: '#b8d4dd',
        primary: '#0088cc',
        secondary: '#ff6b9d',
        success: '#26a65b',
        danger: '#c0392b',
        warning: '#f39c12',
        info: '#3498db'
      }
    },
    sunset: {
      name: 'Coucher de Soleil',
      colors: {
        bg: '#fff5f0',
        surface: '#ffffff',
        text: '#3d2817',
        muted: '#8b6f5f',
        border: '#f0dfd5',
        primary: '#ff6b35',
        secondary: '#ff006e',
        success: '#2a9d8f',
        danger: '#d62828',
        warning: '#f4a261',
        info: '#e9c46a'
      }
    },
    forest: {
      name: 'Forêt',
      colors: {
        bg: '#f0f5f1',
        surface: '#ffffff',
        text: '#1b3a2a',
        muted: '#4a6b5c',
        border: '#d4e5dc',
        primary: '#2d6a4f',
        secondary: '#d62828',
        success: '#52b788',
        danger: '#ae2012',
        warning: '#bb3e03',
        info: '#1b4332'
      }
    },
    cyberpunk: {
      name: 'Cyberpunk',
      colors: {
        bg: '#0a0e27',
        surface: '#16213e',
        text: '#e0ff00',
        muted: '#a0d8ff',
        border: '#2d3748',
        primary: '#00ff88',
        secondary: '#ff006e',
        success: '#00ff88',
        danger: '#ff0055',
        warning: '#ffaa00',
        info: '#00ddff'
      }
    },
    minimalist: {
      name: 'Minimaliste',
      colors: {
        bg: '#fafafa',
        surface: '#ffffff',
        text: '#1a1a1a',
        muted: '#666666',
        border: '#e0e0e0',
        primary: '#333333',
        secondary: '#999999',
        success: '#4caf50',
        danger: '#f44336',
        warning: '#ff9800',
        info: '#2196f3'
      }
    },
    lavender: {
      name: 'Lavande',
      colors: {
        bg: '#f5f3ff',
        surface: '#ffffff',
        text: '#2d1b4e',
        muted: '#6b5b7f',
        border: '#e0d5f0',
        primary: '#8b7aa8',
        secondary: '#d891ef',
        success: '#7cb342',
        danger: '#e91e63',
        warning: '#fbc02d',
        info: '#00bcd4'
      }
    },
    tropical: {
      name: 'Tropical',
      colors: {
        bg: '#fef5e7',
        surface: '#ffffff',
        text: '#1a2332',
        muted: '#5a6c7d',
        border: '#f9e79f',
        primary: '#e74c3c',
        secondary: '#3498db',
        success: '#27ae60',
        danger: '#c0392b',
        warning: '#f39c12',
        info: '#16a085'
      }
    },
    darkMode: {
      name: 'Mode Sombre',
      colors: {
        bg: '#1a1a1a',
        surface: '#2d2d2d',
        text: '#e0e0e0',
        muted: '#a0a0a0',
        border: '#404040',
        primary: '#6C63FF',
        secondary: '#ff6b6b',
        success: '#51cf66',
        danger: '#e63946',
        warning: '#ffa500',
        info: '#4ecdc4'
      }
    },
    darkBlue: {
      name: 'Bleu Nuit',
      colors: {
        bg: '#0f1419',
        surface: '#1c2938',
        text: '#e3f2fd',
        muted: '#90caf9',
        border: '#37474f',
        primary: '#42a5f5',
        secondary: '#ec407a',
        success: '#66bb6a',
        danger: '#ef5350',
        warning: '#ffca28',
        info: '#26c6da'
      }
    },
    darkPurple: {
      name: 'Violet Obscur',
      colors: {
        bg: '#120d1f',
        surface: '#1e1535',
        text: '#e8def8',
        muted: '#b39ddb',
        border: '#3d2a5c',
        primary: '#9c27b0',
        secondary: '#e91e63',
        success: '#00e676',
        danger: '#ff1744',
        warning: '#ffc107',
        info: '#00e5ff'
      }
    },
    darkGreen: {
      name: 'Vert Forêt Sombre',
      colors: {
        bg: '#0d1b0f',
        surface: '#1a2f1e',
        text: '#c8e6c9',
        muted: '#81c784',
        border: '#2e4f32',
        primary: '#4caf50',
        secondary: '#ff5722',
        success: '#76ff03',
        danger: '#d32f2f',
        warning: '#ffab00',
        info: '#00bcd4'
      }
    },
    slate: {
      name: 'Ardoise',
      colors: {
        bg: '#1e293b',
        surface: '#334155',
        text: '#f1f5f9',
        muted: '#94a3b8',
        border: '#475569',
        primary: '#38bdf8',
        secondary: '#f472b6',
        success: '#4ade80',
        danger: '#f87171',
        warning: '#fbbf24',
        info: '#60a5fa'
      }
    },
    midnight: {
      name: 'Minuit',
      colors: {
        bg: '#0a0a0f',
        surface: '#1a1a2e',
        text: '#eaeaea',
        muted: '#bebebe',
        border: '#2a2a3e',
        primary: '#16f2b3',
        secondary: '#ff2e63',
        success: '#00d9ff',
        danger: '#ff5964',
        warning: '#ffbd39',
        info: '#08d9d6'
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
    // Vérifier si une palette a été sauvegardée
    const savedPalette = localStorage.getItem('current_palette');
    if (savedPalette && this.predefinedPalettes[savedPalette]) {
      this.applyPalette(savedPalette);
    } else {
      // Sinon, charger les couleurs personnalisées ou par défaut
      const colors = this.getColors();
      this.applyColors(colors);
    }
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
    const darkPalettes = new Set(['darkMode', 'darkBlue', 'darkPurple', 'darkGreen', 'slate', 'midnight', 'cyberpunk']);
    return darkPalettes.has(paletteKey);
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
