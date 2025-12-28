// ===== ADMIN LOGIN =====

const AdminAuth = {
  PASSWORD: '1234',
  SESSION_KEY: 'admin_authenticated',
  STORED_PASSWORD_KEY: 'admin_password',
  SESSION_DURATION: 3600000, // 1 heure en millisecondes

  // Initialiser le mot de passe stocké au premier lancement
  init: function() {
    if (!localStorage.getItem(this.STORED_PASSWORD_KEY)) {
      localStorage.setItem(this.STORED_PASSWORD_KEY, this.PASSWORD);
    }
  },

  // Obtenir le mot de passe actuellement stocké
  getStoredPassword: function() {
    return localStorage.getItem(this.STORED_PASSWORD_KEY) || this.PASSWORD;
  },

  // Vérifier si l'utilisateur est authentifié
  isAuthenticated() {
    const session = localStorage.getItem(this.SESSION_KEY);
    if (!session) return false;

    const { timestamp } = JSON.parse(session);
    const now = Date.now();

    // Vérifier si la session n'a pas expiré
    if (now - timestamp > this.SESSION_DURATION) {
      localStorage.removeItem(this.SESSION_KEY);
      return false;
    }

    return true;
  },

  // Authentifier l'utilisateur
  authenticate(password) {
    const storedPassword = this.getStoredPassword();
    if (password === storedPassword) {
      const session = {
        timestamp: Date.now(),
        authenticated: true
      };
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
      return true;
    }
    return false;
  },

  // Changer le mot de passe
  changePassword(oldPassword, newPassword) {
    const storedPassword = this.getStoredPassword();
    
    // Vérifier l'ancien mot de passe
    if (oldPassword !== storedPassword) {
      return {
        success: false,
        message: 'L\'ancien mot de passe est incorrect'
      };
    }

    // Valider le nouveau mot de passe
    if (!newPassword || newPassword.length < 4) {
      return {
        success: false,
        message: 'Le nouveau mot de passe doit contenir au moins 4 caractères'
      };
    }

    // Sauvegarder le nouveau mot de passe
    localStorage.setItem(this.STORED_PASSWORD_KEY, newPassword);
    
    return {
      success: true,
      message: 'Mot de passe changé avec succès ✓'
    };
  },

  // Déconnecter
  logout() {
    localStorage.removeItem(this.SESSION_KEY);
  }
};

// Initialiser au chargement
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => AdminAuth.init());
} else {
  AdminAuth.init();
}

// ===== PAGE DE CONNEXION =====

if (window.location.pathname.includes('admin-login.html')) {
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');

    // Si déjà authentifié, rediriger
    if (AdminAuth.isAuthenticated()) {
      window.location.href = 'admin.html';
      return;
    }

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const password = passwordInput.value;

      if (AdminAuth.authenticate(password)) {
        // Authentification réussie
        errorMessage.style.display = 'none';
        // Rediriger vers la page admin
        window.location.href = 'admin.html';
      } else {
        // Authentification échouée
        errorMessage.textContent = 'Mot de passe incorrect. Veuillez réessayer.';
        errorMessage.style.display = 'block';
        passwordInput.value = '';
        passwordInput.focus();
      }
    });
  });
}

// ===== PROTECTION DE LA PAGE ADMIN =====

// Vérifier l'authentification au chargement de la page admin
if (window.location.pathname.includes('admin.html')) {
  if (!AdminAuth.isAuthenticated()) {
    // Rediriger vers la page de login
    window.location.href = 'admin-login.html';
  }
}
