/* ===== CHARGEMENT DYNAMIQUE DE LA PAGE PROJETS ===== */

// Fonction pour charger le projet vedette (hero)
function loadFeaturedProject() {
  const heroImage = document.getElementById('hero-image');
  const heroTitle = document.getElementById('hero-project-title');
  const heroDesc = document.getElementById('hero-project-desc');
  
  if (!heroImage || !heroTitle || !heroDesc) return;
  
  // Récupérer tous les projets
  const allProjects = localStorage.getItem('projects');
  const featuredId = localStorage.getItem('featured_project');
  
  let projects = [];
  let projectId = 3; // ID par défaut (SmartCar)
  
  if (allProjects) {
    try {
      projects = JSON.parse(allProjects);
    } catch (e) {
      console.error('Erreur lors du chargement des projets:', e);
      return;
    }
  }
  
  if (featuredId) {
    try {
      projectId = parseInt(featuredId);
    } catch (e) {
      projectId = 3;
    }
  }
  
  // Trouver le projet vedette
  const featuredProject = projects.find(p => p.id === projectId);
  
  if (featuredProject) {
    heroImage.src = featuredProject.image;
    heroImage.alt = featuredProject.title;
    heroTitle.textContent = featuredProject.title;
    heroDesc.textContent = featuredProject.description;
  }
}

// Fonction pour charger les projets récents
function loadRecentProjectsPage() {
  const recentGrid = document.getElementById('dynamic-projects');
  
  if (!recentGrid) return;
  
  // Récupérer tous les projets
  const allProjects = localStorage.getItem('projects');
  const recentIds = localStorage.getItem('recent_projects');
  
  let projects = [];
  let recentProjectIds = [1, 2]; // Par défaut
  
  if (allProjects) {
    try {
      projects = JSON.parse(allProjects);
    } catch (e) {
      console.error('Erreur lors du chargement des projets:', e);
      return;
    }
  }
  
  if (recentIds) {
    try {
      recentProjectIds = JSON.parse(recentIds);
    } catch (e) {
      recentProjectIds = [1, 2];
    }
  }
  
  // Filtrer les projets récents
  const recentProjects = projects.filter(p => recentProjectIds.includes(p.id));
  
  // Si pas assez de projets, utiliser les premiers
  if (recentProjects.length === 0 && projects.length > 0) {
    recentProjects.push(...projects.slice(0, 2));
  }
  
  // Limiter à 2 projets
  const displayProjects = recentProjects.slice(0, 2);
  
  // Générer le HTML pour les projets récents
  if (displayProjects.length > 0) {
    recentGrid.innerHTML = displayProjects.map(project => `
      <article class="card">
        <div class="card-thumb" aria-hidden="true">
          <img src="${project.image}" alt="${project.title}" onerror="this.src='images/projects/placeholder.jpeg'" />
        </div>
        <div class="card-body">
          <h3 class="card-title">${project.title}</h3>
          <p class="card-desc">${project.description}</p>
        </div>
      </article>
    `).join('');
  } else {
    recentGrid.innerHTML = '<p class="empty-message">Aucun projet récent sélectionné. Allez dans l\'admin pour en choisir.</p>';
  }
}

// Fonction pour charger tous les projets dans la galerie
function loadGalleryProjects() {
  const galleryGrid = document.getElementById('dynamic-gallery');
  
  if (!galleryGrid) return;
  
  // Récupérer tous les projets
  const allProjects = localStorage.getItem('projects');
  const recentIds = localStorage.getItem('recent_projects');
  
  let projects = [];
  let recentProjectIds = [1, 2]; // Par défaut
  
  if (allProjects) {
    try {
      projects = JSON.parse(allProjects);
    } catch (e) {
      console.error('Erreur lors du chargement des projets:', e);
      return;
    }
  }
  
  if (recentIds) {
    try {
      recentProjectIds = JSON.parse(recentIds);
    } catch (e) {
      recentProjectIds = [1, 2];
    }
  }
  
  // Filtrer les projets pour exclure les projets récents
  const galleryProjects = projects.filter(p => !recentProjectIds.includes(p.id));
  
  // Générer le HTML pour la galerie complète (sans les projets récents)
  if (galleryProjects.length > 0) {
    galleryGrid.innerHTML = galleryProjects.map(project => `
      <article class="card">
        <div class="card-thumb" aria-hidden="true">
          <img src="${project.image}" alt="${project.title}" onerror="this.src='images/projects/placeholder.jpeg'" />
        </div>
        <div class="card-body">
          <h3 class="card-title">${project.title}</h3>
          <p class="card-desc">${project.description}</p>
        </div>
      </article>
    `).join('');
  } else {
    galleryGrid.innerHTML = '<p class="empty-message">Tous les projets sont affichés dans la section récents.</p>';
  }
}

// Charger les projets au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
  loadFeaturedProject();
  loadRecentProjectsPage();
  loadGalleryProjects();
  
  // Gérer le bouton d'ajout de projet
  const addBtn = document.getElementById('add-project-btn');
  if (addBtn) {
    addBtn.addEventListener('click', function() {
      window.location.href = 'admin.html';
    });
  }
});
