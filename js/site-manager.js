/* ===== GESTIONNAIRE DE SITE COMPLET ===== */

// Structure pour stocker toutes les données du site
const SiteData = {
  // Données personnelles
  profile: {
    firstName: 'Maxence',
    lastName: 'Grégoire',
    title: 'Étudiant en GEII',
    bio: 'Passionné par l\'électronique, la programmation et les projets innovants.',
    email: 'maxence.gregoire@example.com',
    phone: '+33 6 12 34 56 78',
    linkedin: 'https://www.linkedin.com/in/maxence-gregoire-8345722ba/',
    github: '',
    location: 'Toulouse, France'
  },

  // CV et éducation
  education: [
    { school: 'IUT GEII', degree: 'Diplôme Universitaire de Technologie', field: 'Génie Électrique et Informatique Industrielle', year: 2025 }
  ],

  // Compétences
  skills: [
    { category: 'Électronique', items: ['Arduino', 'C/C++', 'Circuit design'] },
    { category: 'Programmation', items: ['Python', 'JavaScript', 'HTML/CSS'] },
    { category: 'Outils', items: ['Git', 'VS Code', 'Circuit design tools'] }
  ],

  // Informations du site
  siteInfo: {
    siteName: 'Maxence Grégoire',
    siteDescription: 'Portfolio personnel - Projets et réalisations',
    logo: 'MG',
    language: 'fr'
  },

  // Paramètres de contact
  contactInfo: {
    iutName: 'IUT Génie Électrique',
    iutUrl: 'https://iut-ge2i.univ-tlse3.fr/integer-notre-formation',
    iutAddress: 'Toulouse, France'
  },

  getProfile: function() {
    const stored = localStorage.getItem('site_profile');
    return stored ? JSON.parse(stored) : this.profile;
  },

  saveProfile: function(data) {
    localStorage.setItem('site_profile', JSON.stringify(data));
  },

  getEducation: function() {
    const stored = localStorage.getItem('site_education');
    return stored ? JSON.parse(stored) : this.education;
  },

  saveEducation: function(data) {
    localStorage.setItem('site_education', JSON.stringify(data));
  },

  getSkills: function() {
    const stored = localStorage.getItem('site_skills');
    return stored ? JSON.parse(stored) : this.skills;
  },

  saveSkills: function(data) {
    localStorage.setItem('site_skills', JSON.stringify(data));
  },

  getSiteInfo: function() {
    const stored = localStorage.getItem('site_info');
    return stored ? JSON.parse(stored) : this.siteInfo;
  },

  saveSiteInfo: function(data) {
    localStorage.setItem('site_info', JSON.stringify(data));
  },

  getContactInfo: function() {
    const stored = localStorage.getItem('site_contact');
    return stored ? JSON.parse(stored) : this.contactInfo;
  },

  saveContactInfo: function(data) {
    localStorage.setItem('site_contact', JSON.stringify(data));
  }
};

// Export pour utilisation globale
window.SiteData = SiteData;
