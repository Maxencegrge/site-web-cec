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
      let patched = false;
      projects = JSON.parse(allProjects).map(p => {
        if (p.image === 'images/projects/projet banc de test .jpeg') {
          patched = true;
          return { ...p, image: 'images/projects/projet-banc-de-test.jpeg' };
        }
        return p;
      });
      if (patched) {
        localStorage.setItem('projects', JSON.stringify(projects));
      }
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

  // Ajouter un lien par défaut vers les pages dédiées si absent
  const withLinks = recentProjects.map(p => {
    if (p.link) return p;
    const fallbackLink = {
      1: 'project-en.html',
      2: 'project-banc-de-test.html',
      3: 'project-smartcar.html',
      4: 'project-ecg.html',
      5: 'project-dino-game.html'
    }[p.id];
    return { ...p, link: fallbackLink || 'projets.html' };
  });
  
  // Si pas assez de projets, utiliser les premiers
  if (recentProjects.length === 0 && projects.length > 0) {
    recentProjects.push(...projects.slice(0, 2));
  }
  
  // Limiter à 2 projets
  const displayProjects = withLinks.slice(0, 2);
  
  // Générer le HTML
  if (displayProjects.length > 0) {
    projectsGrid.innerHTML = displayProjects.map(project => `
      <article class="card">
        <a href="${project.link || 'projets.html'}" class="card-thumb" aria-label="${project.title}">
          <img src="${project.image}" alt="${project.title}" onerror="this.src='images/projects/placeholder.jpeg'" />
          <span class="card-overlay">${project.title}</span>
        </a>
        <div class="card-body">
          <h3 class="card-title"><a href="${project.link || 'projets.html'}">${project.title}</a></h3>
          <p class="card-desc">${project.description}</p>
        </div>
      </article>
    `).join('');
  }
}

// Charger les projets au chargement de la page
document.addEventListener('DOMContentLoaded', loadRecentProjects);
