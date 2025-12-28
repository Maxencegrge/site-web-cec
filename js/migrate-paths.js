/* ===== MIGRATION DES CHEMINS D'IMAGES ===== */

// Fonction pour mettre à jour les chemins d'images dans localStorage
function migrateImagePaths() {
  // Mettre à jour les projets stockés
  const projectsKey = 'projects';
  const stored = localStorage.getItem(projectsKey);
  
  if (stored) {
    try {
      let projects = JSON.parse(stored);
      let updated = false;
      
      projects = projects.map(project => {
        if (project.image && project.image.startsWith('image /')) {
          // Remplacer 'image /' par 'images/projects/'
          project.image = project.image.replace('image /', 'images/projects/');
          updated = true;
        }
        return project;
      });
      
      if (updated) {
        localStorage.setItem(projectsKey, JSON.stringify(projects));
        console.log('✅ Chemins d\'images mis à jour');
      }
    } catch (e) {
      console.error('Erreur lors de la migration:', e);
    }
  }
}

// Exécuter la migration au chargement
document.addEventListener('DOMContentLoaded', migrateImagePaths);
