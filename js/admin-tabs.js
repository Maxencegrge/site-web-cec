/* ===== GESTIONNAIRE D'ONGLETS ADMIN ===== */

class AdminTabManager {
  constructor() {
    this.currentTab = 'projects';
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadInitialData();
    this.showTab(this.currentTab);
  }

  setupEventListeners() {
    // Onglets
    const tabButtons = document.querySelectorAll('.admin-tab-button');
    tabButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const tabName = e.target.dataset.tab;
        this.showTab(tabName);
      });
    });

    // Profil
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
      profileForm.addEventListener('submit', (e) => this.handleProfileSave(e));
    }

    // Site Info
    const siteInfoForm = document.getElementById('site-info-form');
    if (siteInfoForm) {
      siteInfoForm.addEventListener('submit', (e) => this.handleSiteInfoSave(e));
    }

    // Contact Info
    const contactForm = document.getElementById('contact-info-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => this.handleContactSave(e));
    }

    // Changement de mot de passe
    const passwordForm = document.getElementById('password-change-form');
    if (passwordForm) {
      passwordForm.addEventListener('submit', (e) => this.handlePasswordChange(e));
    }

    // Éducation
    const addEducationBtn = document.getElementById('add-education-btn');
    if (addEducationBtn) {
      addEducationBtn.addEventListener('click', () => this.addEducationForm());
    }

    // Compétences
    const addSkillBtn = document.getElementById('add-skill-btn');
    if (addSkillBtn) {
      addSkillBtn.addEventListener('click', () => this.addSkillCategory());
    }
  }

  showTab(tabName) {
    // Masquer tous les onglets
    document.querySelectorAll('.admin-tab-content').forEach(tab => {
      tab.classList.remove('active');
    });

    // Retirer la classe active de tous les boutons
    document.querySelectorAll('.admin-tab-button').forEach(btn => {
      btn.classList.remove('active');
    });

    // Afficher l'onglet sélectionné
    const tabContent = document.getElementById(`tab-${tabName}`);
    if (tabContent) {
      tabContent.classList.add('active');
    }

    // Ajouter la classe active au bouton
    const tabButton = document.querySelector(`[data-tab="${tabName}"]`);
    if (tabButton) {
      tabButton.classList.add('active');
    }

    this.currentTab = tabName;
  }

  loadInitialData() {
    this.loadProfile();
    this.loadSiteInfo();
    this.loadContactInfo();
    this.loadEducation();
    this.loadSkills();
    this.loadColors();
    this.loadRecentProjects();
  }

  loadProfile() {
    const profile = SiteData.getProfile();
    document.getElementById('first-name').value = profile.firstName || '';
    document.getElementById('last-name').value = profile.lastName || '';
    document.getElementById('title').value = profile.title || '';
    document.getElementById('bio').value = profile.bio || '';
    document.getElementById('email').value = profile.email || '';
    document.getElementById('phone').value = profile.phone || '';
    document.getElementById('linkedin').value = profile.linkedin || '';
    document.getElementById('github').value = profile.github || '';
    document.getElementById('location').value = profile.location || '';
  }

  handleProfileSave(e) {
    e.preventDefault();
    const profile = {
      firstName: document.getElementById('first-name').value,
      lastName: document.getElementById('last-name').value,
      title: document.getElementById('title').value,
      bio: document.getElementById('bio').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      linkedin: document.getElementById('linkedin').value,
      github: document.getElementById('github').value,
      location: document.getElementById('location').value
    };
    SiteData.saveProfile(profile);
    this.showMessage('Profil mis à jour avec succès !', 'success');
  }

  loadSiteInfo() {
    const siteInfo = SiteData.getSiteInfo();
    document.getElementById('site-name').value = siteInfo.siteName || '';
    document.getElementById('site-description').value = siteInfo.siteDescription || '';
    document.getElementById('site-logo').value = siteInfo.logo || '';
  }

  handleSiteInfoSave(e) {
    e.preventDefault();
    const siteInfo = {
      siteName: document.getElementById('site-name').value,
      siteDescription: document.getElementById('site-description').value,
      logo: document.getElementById('site-logo').value,
      language: 'fr'
    };
    SiteData.saveSiteInfo(siteInfo);
    this.showMessage('Informations du site mises à jour !', 'success');
  }

  loadContactInfo() {
    const contact = SiteData.getContactInfo();
    document.getElementById('iut-name').value = contact.iutName || '';
    document.getElementById('iut-url').value = contact.iutUrl || '';
    document.getElementById('iut-address').value = contact.iutAddress || '';
  }

  handleContactSave(e) {
    e.preventDefault();
    const contact = {
      iutName: document.getElementById('iut-name').value,
      iutUrl: document.getElementById('iut-url').value,
      iutAddress: document.getElementById('iut-address').value
    };
    SiteData.saveContactInfo(contact);
    this.showMessage('Informations de contact mises à jour !', 'success');
  }

  loadEducation() {
    const education = SiteData.getEducation();
    const container = document.getElementById('education-list');
    container.innerHTML = '';
    
    education.forEach((item, index) => {
      this.renderEducationItem(item, index);
    });
  }

  renderEducationItem(item, index) {
    const container = document.getElementById('education-list');
    const div = document.createElement('div');
    div.className = 'education-item';
    div.innerHTML = `
      <div class="education-item-header">
        <div>
          <div class="education-item-title">${item.degree}</div>
          <div class="education-item-school">${item.school}</div>
        </div>
        <button type="button" class="btn-delete" onclick="adminTabs.deleteEducation(${index})">Supprimer</button>
      </div>
      <input type="text" placeholder="Domaine d'études" value="${item.field || ''}" onchange="adminTabs.updateEducationField(${index}, 'field', this.value)" />
      <input type="number" placeholder="Année" value="${item.year || ''}" onchange="adminTabs.updateEducationField(${index}, 'year', this.value)" />
    `;
    container.appendChild(div);
  }

  addEducationForm() {
    const education = SiteData.getEducation();
    education.push({ school: '', degree: '', field: '', year: new Date().getFullYear() });
    SiteData.saveEducation(education);
    this.loadEducation();
  }

  deleteEducation(index) {
    const education = SiteData.getEducation();
    education.splice(index, 1);
    SiteData.saveEducation(education);
    this.loadEducation();
  }

  updateEducationField(index, field, value) {
    const education = SiteData.getEducation();
    education[index][field] = value;
    SiteData.saveEducation(education);
  }

  loadSkills() {
    const skills = SiteData.getSkills();
    const container = document.getElementById('skills-list');
    container.innerHTML = '';
    
    skills.forEach((category, index) => {
      this.renderSkillCategory(category, index);
    });
  }

  renderSkillCategory(category, index) {
    const container = document.getElementById('skills-list');
    const div = document.createElement('div');
    div.className = 'skill-category';
    
    const skillsHtml = category.items.map((item, itemIndex) => `
      <span class="skill-tag">
        ${item}
        <button type="button" class="btn-delete" onclick="adminTabs.deleteSkill(${index}, ${itemIndex})" title="Supprimer">×</button>
      </span>
    `).join('');

    div.innerHTML = `
      <div class="skill-category-header">
        <input type="text" placeholder="Catégorie" value="${category.category || ''}" onchange="adminTabs.updateSkillCategory(${index}, this.value)" />
        <button type="button" class="btn-delete" onclick="adminTabs.deleteSkillCategory(${index})">Supprimer catégorie</button>
      </div>
      <div class="skill-items">
        ${skillsHtml}
      </div>
      <input type="text" placeholder="Ajouter une compétence..." onkeypress="adminTabs.handleAddSkill(event, ${index})" />
    `;
    
    container.appendChild(div);
  }

  addSkillCategory() {
    const skills = SiteData.getSkills();
    skills.push({ category: 'Nouvelle catégorie', items: [] });
    SiteData.saveSkills(skills);
    this.loadSkills();
  }

  deleteSkill(categoryIndex, itemIndex) {
    const skills = SiteData.getSkills();
    skills[categoryIndex].items.splice(itemIndex, 1);
    SiteData.saveSkills(skills);
    this.loadSkills();
  }

  deleteSkillCategory(index) {
    const skills = SiteData.getSkills();
    skills.splice(index, 1);
    SiteData.saveSkills(skills);
    this.loadSkills();
  }

  updateSkillCategory(index, newName) {
    const skills = SiteData.getSkills();
    skills[index].category = newName;
    SiteData.saveSkills(skills);
  }

  handleAddSkill(event, categoryIndex) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const input = event.target;
      const skillName = input.value.trim();
      
      if (skillName) {
        const skills = SiteData.getSkills();
        skills[categoryIndex].items.push(skillName);
        SiteData.saveSkills(skills);
        this.loadSkills();
      }
    }
  }

  // ===== GESTION DES COULEURS =====
  loadColors() {
    if (!window.ThemeManager) {
      console.error('ThemeManager n\'est pas chargé');
      return;
    }
    this.loadPalettes();
    this.renderColorPicker();
    this.highlightActivePalette();
  }
  
  highlightActivePalette() {
    // Marquer la palette actuellement appliquée
    const currentPaletteKey = localStorage.getItem('current_palette') || 'default';
    document.querySelectorAll('.palette-card').forEach(card => {
      if (card.dataset.palette === currentPaletteKey) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  }

  loadPalettes() {
    if (!window.ThemeManager) return;
    
    const palettes = ThemeManager.getPalettes();
    const container = document.getElementById('palette-selector');
    if (!container) return;
    
    container.innerHTML = '<div class="palette-selector-title">Palettes prédéfinies</div>';
    
    Object.keys(palettes).forEach(paletteKey => {
      const palette = palettes[paletteKey];
      const colors = palette.colors;
      
      const card = document.createElement('div');
      card.className = 'palette-card';
      card.dataset.palette = paletteKey;
      
      // Créer l'aperçu de la palette
      let previewHtml = '<div class="palette-preview">';
      const colorKeys = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'bg', 'surface', 'text'];
      colorKeys.forEach(key => {
        if (colors[key]) {
          previewHtml += `<div class="palette-color-swatch" style="background-color: ${colors[key]};"></div>`;
        }
      });
      previewHtml += '</div>';
      
      card.innerHTML = previewHtml + `<div class="palette-name">${palette.name}</div>`;
      
      // Ajouter l'événement de clic
      card.addEventListener('click', () => {
        this.applyPaletteAndUpdate(paletteKey, card);
      });
      
      container.appendChild(card);
    });
  }

  applyPaletteAndUpdate(paletteKey, cardElement) {
    if (!window.ThemeManager) return;
    
    ThemeManager.applyPalette(paletteKey);
    
    // Sauvegarder la palette actuellement appliquée
    localStorage.setItem('current_palette', paletteKey);
    
    // Mettre à jour l'affichage
    document.querySelectorAll('.palette-card').forEach(card => {
      card.classList.remove('active');
    });
    cardElement.classList.add('active');
    
    this.renderColorPicker();
    this.showMessage(`Palette "${ThemeManager.getPalettes()[paletteKey].name}" appliquée !`, 'success');
  }

  renderColorPicker() {
    if (!window.ThemeManager) return;
    
    const colors = ThemeManager.getColors();
    const container = document.getElementById('color-palette');
    if (!container) return;
    
    container.innerHTML = '';
    Object.keys(colors).forEach(colorKey => {
      const colorValue = colors[colorKey];
      const item = document.createElement('div');
      item.className = 'color-item';
      
      // Input color
      const colorInput = document.createElement('input');
      colorInput.type = 'color';
      colorInput.id = `color-${colorKey}`;
      colorInput.value = colorValue;
      colorInput.className = 'color-input-real';
      
      // Événements pour mise à jour en temps réel et sauvegarde
      colorInput.addEventListener('input', (e) => {
        // Mise à jour en temps réel
        const colors = ThemeManager.getColors();
        colors[colorKey] = e.target.value;
        ThemeManager.saveColors(colors);
        ThemeManager.applyColors();
        swatch.style.backgroundColor = e.target.value;
      });
      
      colorInput.addEventListener('change', (e) => {
        // Sauvegarde confirmée
        this.updateColor(colorKey, e.target.value);
      });
      
      // Swatch visuelle
      const swatch = document.createElement('div');
      swatch.className = 'color-swatch';
      swatch.style.backgroundColor = colorValue;
      swatch.addEventListener('click', () => {
        colorInput.click();
      });
      
      const label = document.createElement('div');
      label.className = 'color-label';
      label.textContent = colorKey;
      
      // Hex value display
      const hexDisplay = document.createElement('div');
      hexDisplay.className = 'color-hex-display';
      hexDisplay.textContent = colorValue;
      
      item.appendChild(label);
      
      const inputGroup = document.createElement('div');
      inputGroup.className = 'color-input-group';
      inputGroup.appendChild(swatch);
      inputGroup.appendChild(colorInput);
      inputGroup.appendChild(hexDisplay);
      
      item.appendChild(inputGroup);
      
      container.appendChild(item);
    });
  }

  updateColor(colorKey, newValue) {
    if (!window.ThemeManager) return;
    
    // Valider le format hex
    if (!this.isValidHex(newValue)) {
      this.showMessage('Format de couleur invalide. Utilisez #RRGGBB', 'error');
      return;
    }

    const colors = ThemeManager.getColors();
    colors[colorKey] = newValue;
    ThemeManager.saveColors(colors);
    
    // Appliquer la couleur immédiatement
    ThemeManager.applyColors();
    
    // Mettre à jour le picker visuel
    const hexDisplay = document.querySelector(`#color-${colorKey}`)?.parentElement?.querySelector('.color-hex-display');
    if (hexDisplay) {
      hexDisplay.textContent = newValue;
    }
    
    this.showMessage(`Couleur ${colorKey} mise à jour !`, 'success');
  }

  isValidHex(hex) {
    return /^#[0-9A-F]{6}$/i.test(hex);
  }

  resetTheme() {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser toutes les couleurs aux valeurs par défaut ?')) {
      ThemeManager.resetToDefault();
      localStorage.removeItem('current_palette'); // Réinitialiser aussi la palette sauvegardée
      this.loadColors();
      this.showMessage('✨ Thème réinitialisé aux couleurs par défaut', 'success');
    }
  }

  showMessage(text, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message`;
    messageDiv.textContent = text;
    
    const container = document.querySelector('.admin-container') || document.querySelector('main');
    container.insertBefore(messageDiv, container.firstChild);
    
    setTimeout(() => {
      messageDiv.remove();
    }, 3000);
  }

  // Gestion des projets récents
  loadRecentProjects() {
    const projects = window.ProjectManager ? ProjectManager.getProjects() : [];
    const recentIds = window.ProjectManager ? ProjectManager.getRecentProjects() : [1, 2];
    
    // Mise à jour du compteur
    const countSpan = document.getElementById('recent-count');
    if (countSpan) {
      countSpan.textContent = recentIds.length;
    }
    
    // Projets sélectionnés
    const selectedList = document.getElementById('recent-selected-list');
    if (selectedList) {
      const recentProjects = projects.filter(p => recentIds.includes(p.id));
      if (recentProjects.length > 0) {
        selectedList.innerHTML = recentProjects.map(project => this.renderRecentCard(project, true)).join('');
      } else {
        selectedList.innerHTML = '';
      }
    }
    
    // Tous les projets disponibles
    const availableList = document.getElementById('recent-available-list');
    if (availableList) {
      availableList.innerHTML = projects.map(project => this.renderRecentCard(project, recentIds.includes(project.id))).join('');
      
      // Ajouter les événements de clic
      availableList.querySelectorAll('.recent-project-card').forEach(card => {
        card.addEventListener('click', (e) => {
          const projectId = parseInt(card.dataset.id);
          if (window.ProjectManager) {
            ProjectManager.toggleRecentProject(projectId);
            this.loadRecentProjects();
            
            // Afficher un message
            const isRecent = ProjectManager.isRecent(projectId);
            const message = isRecent ? 'Projet ajouté aux récents !' : 'Projet retiré des récents';
            this.showMessage(message, 'success');
          }
        });
      });
    }
  }

  renderRecentCard(project, isRecent) {
    return `
      <div class="recent-project-card ${isRecent ? 'is-recent' : ''}" data-id="${project.id}">
        <div class="recent-card-star">${isRecent ? '★' : '☆'}</div>
        <img src="${project.image}" alt="${project.title}" class="recent-card-image" onerror="this.src='images/projects/placeholder.jpeg'" />
        <div class="recent-card-body">
          <h4 class="recent-card-title">${project.title}</h4>
          <p class="recent-card-desc">${project.description}</p>
        </div>
      </div>
    `;
  }

  // ===== GESTION DU MOT DE PASSE =====
  handlePasswordChange(event) {
    event.preventDefault();

    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorDiv = document.getElementById('password-error');

    // Réinitialiser le message d'erreur
    errorDiv.style.display = 'none';
    errorDiv.textContent = '';

    // Vérifier que les mots de passe correspondent
    if (newPassword !== confirmPassword) {
      errorDiv.textContent = 'Les mots de passe ne correspondent pas';
      errorDiv.style.display = 'block';
      return;
    }

    // Changer le mot de passe via AdminAuth
    if (window.AdminAuth) {
      const result = AdminAuth.changePassword(currentPassword, newPassword);
      
      if (result.success) {
        // Vider le formulaire
        document.getElementById('password-change-form').reset();
        this.showMessage('🔒 ' + result.message, 'success');
      } else {
        errorDiv.textContent = result.message;
        errorDiv.style.display = 'block';
      }
    }
  }
}

// Initialiser le gestionnaire d'onglets
let adminTabs;
document.addEventListener('DOMContentLoaded', () => {
  adminTabs = new AdminTabManager();
});
