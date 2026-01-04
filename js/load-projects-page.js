/* ===== CHARGEMENT DYNAMIQUE DE LA PAGE PROJETS ===== */

// Fonction utilitaire: récupérer tous les projets avec repli sur défauts
function getAllProjectsWithFallback() {
  const stored = localStorage.getItem('projects');
  let parsed = [];
  if (stored) {
    try {
      let patched = false;
      parsed = JSON.parse(stored).map(p => {
        if (p.image === 'images/projects/projet banc de test .jpeg') {
          patched = true;
          return { ...p, image: 'images/projects/projet-banc-de-test.jpeg' };
        }
        return p;
      });
      if (patched) {
        localStorage.setItem('projects', JSON.stringify(parsed));
      }
    } catch (e) {
      parsed = [];
    }
  }

  // Si aucune donnée ou tableau vide, utiliser les projets par défaut
  if (!Array.isArray(parsed) || parsed.length === 0) {
    if (typeof ProjectData !== 'undefined' && Array.isArray(ProjectData.defaultProjects)) {
      return ProjectData.defaultProjects;
    }
    // Repli minimal si ProjectData n'est pas disponible
    return [
      {
        id: 1,
        title: 'Projet EN',
        description: "J'ai conçu et simulé un filtre de lissage conforme au cahier des charges, en respectant la bande passante imposée et la structure de Rauch. J'ai ensuite participé au routage du circuit imprimé et à son implantation, puis j'ai testé le filtre avec la carte Nucleo pour vérifier son rôle dans la chaîne d'acquisition audio et valider son fonctionnement avant intégration dans le système complet.",
        image: 'images/projects/EN.jpeg',
        link: 'project-en.html'
      },
      {
        id: 2,
        title: 'Projet banc de test',
        description: "J'ai caractérisé une ligne microstrip, réalisé des mesures HF sur un capteur de liquide et étudié l'impact d'une fiole sur l'admittance. J'ai aussi analysé la documentation de l'ARV et rédigé une fiche d'aide expliquant comment reproduire les tests manuels, étape préparatoire à l'automatisation sous Python.",
        image: 'images/projects/projet-banc-de-test.jpeg',
        link: 'project-banc-de-test.html'
      },
      {
        id: 3,
        title: 'SmartCar',
        description: "Carte électronique dédiée, microcontrôleur embarqué et pilotage à distance.",
        image: 'images/projects/projet-rm.jpeg',
        link: 'project-smartcar.html'
      },
      {
        id: 4,
        title: 'Projet ECG',
        description: "Création d'un ECG en groupe : acquisition du signal, filtrage analogique et affichage.",
        image: 'images/projects/ECG.jpeg',
        link: 'project-ecg.html'
      },
      {
        id: 5,
        title: 'Projet IE — Dino Game',
        description: "Dans le cadre de notre SAE IE à l'IUT GEII Toulouse, en collaboration avec Nathan Boumadi, nous avons développé un petit jeu inspiré du célèbre Dino Game de Google Chrome. Un projet mêlant programmation et créativité.",
        image: 'images/projects/IE.jpeg',
        link: 'project-dino-game.html'
      }
    ];
  }
  return parsed;
}

// Fonction pour charger le projet vedette (hero)
function loadFeaturedProject() {
  const heroImage = document.getElementById('hero-image');
  const heroTitle = document.getElementById('hero-project-title');
  const heroDesc = document.getElementById('hero-project-desc');
  const heroLink = document.getElementById('hero-link');
  
  if (!heroImage || !heroTitle || !heroDesc) return;
  
  // Récupérer tous les projets
  const allProjectsArr = getAllProjectsWithFallback();
  const featuredId = localStorage.getItem('featured_project');
  
  let projectId = 3; // ID par défaut (SmartCar)
  const projects = allProjectsArr;
  
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
    if (heroLink) {
      const fallbackLink = {
        1: 'project-en.html',
        2: 'project-banc-de-test.html',
        3: 'project-smartcar.html',
        4: 'project-ecg.html',
        5: 'project-dino-game.html'
      }[featuredProject.id];
      heroLink.href = featuredProject.link || fallbackLink || 'projets.html';
      heroLink.title = featuredProject.title;
    }
  }
}

// Fonction pour charger les projets récents
function loadRecentProjectsPage() {
  const recentGrid = document.getElementById('dynamic-projects');
  
  if (!recentGrid) return;
  
  // Récupérer tous les projets
  const projects = getAllProjectsWithFallback();
  const recentIds = localStorage.getItem('recent_projects');
  let recentProjectIds = [1, 2]; // Par défaut
  
  if (recentIds) {
    try {
      recentProjectIds = JSON.parse(recentIds);
    } catch (e) {
      recentProjectIds = [1, 2];
    }
  }
  
  // Filtrer les projets récents
  const recentProjects = projects.filter(p => recentProjectIds.includes(p.id));
  const recentWithLinks = recentProjects.map(p => {
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
  const displayProjects = recentWithLinks.slice(0, 2);
  
  // Générer le HTML pour les projets récents
  if (displayProjects.length > 0) {
    recentGrid.innerHTML = displayProjects.map(project => `
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
  } else {
    recentGrid.innerHTML = '<p class="empty-message">Aucun projet récent sélectionné. Allez dans l\'admin pour en choisir.</p>';
  }
}

// Fonction pour charger tous les projets dans la galerie
function loadGalleryProjects() {
  const galleryGrid = document.getElementById('dynamic-gallery');
  
  if (!galleryGrid) return;
  
  // Récupérer tous les projets
  const projects = getAllProjectsWithFallback();
  const recentIds = localStorage.getItem('recent_projects');
  let recentProjectIds = [1, 2]; // Par défaut
  
  if (recentIds) {
    try {
      recentProjectIds = JSON.parse(recentIds);
    } catch (e) {
      recentProjectIds = [1, 2];
    }
  }
  
  // Filtrer les projets pour exclure les projets récents
  const galleryProjects = projects.filter(p => !recentProjectIds.includes(p.id));
  const galleryWithLinks = galleryProjects.map(p => {
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
  
  // Générer le HTML pour la galerie complète (sans les projets récents)
  if (galleryProjects.length > 0) {
    galleryGrid.innerHTML = galleryWithLinks.map(project => `
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
