/* ===== CHARGEMENT DYNAMIQUE DES PROJETS RÉCENTS ===== */

// Fonction pour charger les projets récents sur la page d'accueil
function loadRecentProjects() {
  const projectsGrid = document.querySelector('.projects-grid');
  
  if (!projectsGrid) return; // Pas sur la page d'accueil
  
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
  
  // Générer le HTML
  if (displayProjects.length > 0) {
    projectsGrid.innerHTML = displayProjects.map(project => `
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
  }
}

// Charger les projets au chargement de la page
document.addEventListener('DOMContentLoaded', loadRecentProjects);
