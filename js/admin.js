// ===== PROJECT MANAGEMENT SYSTEM =====

// Structure de données pour les projets
const ProjectManager = {
  // Projets par défaut (de l'index)
  defaultProjects: [
    {
      id: 1,
      title: 'Projet EN',
      description: 'J\'ai conçu et simulé un filtre de lissage conforme au cahier des charges, en respectant la bande passante imposée et la structure de Rauch. J\'ai ensuite participé au routage du circuit imprimé et à son implantation, puis j\'ai testé le filtre avec la carte Nucleo pour vérifier son rôle dans la chaîne d\'acquisition audio et valider son fonctionnement avant intégration dans le système complet.',
      image: 'images/projects/EN.jpeg'
    },
    {
      id: 2,
      title: 'Projet banc de test',
      description: 'J\'ai caractérisé une ligne microstrip, réalisé des mesures HF sur un capteur de liquide et étudié l\'impact d\'une fiole sur l\'admittance. J\'ai aussi analysé la documentation de l\'ARV et rédigé une fiche d\'aide expliquant comment reproduire les tests manuels, étape préparatoire à l\'automatisation sous Python.',
      image: 'images/projects/projet-banc-de-test.jpeg'
    },
    {
      id: 3,
      title: 'SmartCar',
      description: 'Carte électronique dédiée, microcontrôleur embarqué et pilotage à distance.',
      image: 'images/projects/projet-rm.jpeg'
    },
    {
      id: 4,
      title: 'Projet ECG',
      description: 'Création d\'un ECG en groupe : acquisition du signal, filtrage analogique et affichage.',
      image: 'images/projects/ECG.jpeg'
    },
    {
      id: 5,
      title: 'Projet IE — Dino Game',
      description: 'Dans le cadre de notre SAE IE à l\'IUT GEII Toulouse, en collaboration avec Nathan Boumadi, nous avons développé un petit jeu inspiré du célèbre Dino Game de Google Chrome. Un projet mêlant programmation et créativité.',
      image: 'images/projects/IE.jpeg'
    }
  ],

  // Charger les projets du localStorage ou utiliser les projets par défaut
  getProjects() {
    const stored = localStorage.getItem('projects');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return this.defaultProjects;
      }
    }
    return this.defaultProjects;
  },

  // Sauvegarder les projets
  saveProjects(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
  },

  // Ajouter un projet
  addProject(title, description, image) {
    const projects = this.getProjects();
    const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    const newProject = { id: newId, title, description, image };
    projects.push(newProject);
    this.saveProjects(projects);
    return newProject;
  },

  // Supprimer un projet
  deleteProject(id) {
    let projects = this.getProjects();
    projects = projects.filter(p => p.id !== id);
    this.saveProjects(projects);
  },

  // Réorganiser les projets
  reorderProjects(projects) {
    this.saveProjects(projects);
  },

  // Gérer les projets récents (max 2)
  getRecentProjects() {
    const stored = localStorage.getItem('recent_projects');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return [1, 2]; // IDs par défaut
      }
    }
    return [1, 2]; // IDs par défaut
  },

  saveRecentProjects(projectIds) {
    localStorage.setItem('recent_projects', JSON.stringify(projectIds));
  },

  toggleRecentProject(projectId) {
    let recentIds = this.getRecentProjects();
    const index = recentIds.indexOf(projectId);
    
    if (index > -1) {
      // Retirer des récents
      recentIds.splice(index, 1);
    } else {
      // Ajouter aux récents (max 2)
      if (recentIds.length >= 2) {
        // Retirer le plus ancien
        recentIds.shift();
      }
      recentIds.push(projectId);
    }
    
    this.saveRecentProjects(recentIds);
    return recentIds;
  },

  isRecent(projectId) {
    return this.getRecentProjects().includes(projectId);
  },

  // Gérer le projet vedette (hero)
  getFeaturedProject() {
    const stored = localStorage.getItem('featured_project');
    if (stored) {
      try {
        return parseInt(stored);
      } catch (e) {
        return 3; // ID par défaut (SmartCar)
      }
    }
    return 3; // ID par défaut
  },

  setFeaturedProject(projectId) {
    localStorage.setItem('featured_project', projectId.toString());
  },

  isFeatured(projectId) {
    return this.getFeaturedProject() === projectId;
  },

  toggleFeaturedProject(projectId) {
    const currentFeatured = this.getFeaturedProject();
    if (currentFeatured === projectId) {
      // Si c'est déjà le projet vedette, on ne fait rien
      return false;
    }
    this.setFeaturedProject(projectId);
    return true;
  }
};

// ===== DOM MANAGEMENT =====

let draggedElement = null;

function renderProjects() {
  const projectsList = document.getElementById('projects-list');
  const projects = ProjectManager.getProjects();
  const recentCount = ProjectManager.getRecentProjects().length;

  if (projects.length === 0) {
    projectsList.innerHTML = '<p class="empty-message">Aucun projet pour le moment. Ajoutez-en un !</p>';
    return;
  }

  projectsList.innerHTML = `
    <div class="recent-info">
      <p><strong>Projets récents :</strong> ${recentCount}/2 sélectionnés (affichés sur la page d'accueil)</p>
    </div>
  ` + projects.map(project => {
    const isRecent = ProjectManager.isRecent(project.id);
    const isFeatured = ProjectManager.isFeatured(project.id);
    return `
    <div class="project-item ${isRecent ? 'is-recent' : ''} ${isFeatured ? 'is-featured' : ''}" draggable="true" data-id="${project.id}">
      <div class="project-thumb">
        <img src="${project.image}" alt="${project.title}" onerror="this.src='images/projects/placeholder.jpeg'" />
      </div>
      <div class="project-info">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
      <div class="project-actions">
        <button class="btn-featured ${isFeatured ? 'active' : ''}" data-id="${project.id}" title="${isFeatured ? 'Projet vedette actuel' : 'Définir comme projet vedette'}">
          ${isFeatured ? '🏆' : '○'}
        </button>
        <button class="btn-recent ${isRecent ? 'active' : ''}" data-id="${project.id}" title="${isRecent ? 'Retirer des récents' : 'Marquer comme récent'}">
          ${isRecent ? '★' : '☆'}
        </button>
        <span class="drag-handle">⋮</span>
        <button class="btn-delete" data-id="${project.id}">Supprimer</button>
      </div>
    </div>
  `}).join('');

  // Ajouter les événements aux boutons "vedette"
  projectsList.querySelectorAll('.btn-featured').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = parseInt(this.getAttribute('data-id'));
      ProjectManager.toggleFeaturedProject(id);
      renderProjects();
    });
  });

  // Ajouter les événements aux boutons "récent"
  projectsList.querySelectorAll('.btn-recent').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = parseInt(this.getAttribute('data-id'));
      ProjectManager.toggleRecentProject(id);
      renderProjects();
    });
  });

  // Ajouter les événements aux boutons de suppression
  projectsList.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = parseInt(this.getAttribute('data-id'));
      if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
        ProjectManager.deleteProject(id);
        renderProjects();
      }
    });
  });

  // Ajouter les événements drag & drop
  projectsList.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragend', handleDragEnd);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('drop', handleDrop);
    item.addEventListener('dragleave', handleDragLeave);
  });
}

function handleDragStart(e) {
  draggedElement = this;
  this.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
  draggedElement = null;
  this.classList.remove('dragging');
  document.querySelectorAll('.project-item').forEach(item => {
    item.classList.remove('drag-over');
  });
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';
  if (this !== draggedElement) {
    this.classList.add('drag-over');
  }
  return false;
}

function handleDragLeave(e) {
  this.classList.remove('drag-over');
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }

  if (draggedElement !== this) {
    const projects = ProjectManager.getProjects();
    const draggedId = parseInt(draggedElement.getAttribute('data-id'));
    const targetId = parseInt(this.getAttribute('data-id'));

    const draggedIndex = projects.findIndex(p => p.id === draggedId);
    const targetIndex = projects.findIndex(p => p.id === targetId);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      [projects[draggedIndex], projects[targetIndex]] = [projects[targetIndex], projects[draggedIndex]];
      ProjectManager.reorderProjects(projects);
      renderProjects();
    }
  }

  return false;
}

// ===== FORM HANDLING =====

document.getElementById('project-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const title = document.getElementById('project-title').value.trim();
  const description = document.getElementById('project-desc').value.trim();
  const image = document.getElementById('project-image').value.trim();

  if (!title || !description || !image) {
    alert('Veuillez remplir tous les champs');
    return;
  }

  ProjectManager.addProject(title, description, image);
  
  // Réinitialiser le formulaire
  this.reset();
  
  // Rafraîchir la liste
  renderProjects();

  alert('Projet ajouté avec succès !');
});

// ===== INITIALIZATION =====

document.addEventListener('DOMContentLoaded', function() {
  // Année dynamique
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Charger et afficher les projets
  renderProjects();

  // Gestion de la déconnexion
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        // Récupérer AdminAuth depuis admin-login.js
        if (typeof AdminAuth !== 'undefined') {
          AdminAuth.logout();
        } else {
          localStorage.removeItem('admin_authenticated');
        }
        window.location.href = 'admin-login.html';
      }
    });
  }
});
