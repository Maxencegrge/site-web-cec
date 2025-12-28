# Guide d'Administration du Site - Maxence Grégoire

## Vue d'ensemble

L'interface d'administration complète permet de gérer tous les aspects de votre site web sans modifier le code. Elle est accessible via `/admin.html` et protégée par un mot de passe.

## Accès à l'administration

1. Allez sur `admin-login.html`
2. Entrez le mot de passe : **1234**
3. Vous avez 1 heure de session avant de devoir vous reconnecter

## 5 Onglets de gestion

### 1. **Projets** 📋
Gérez votre portfolio de projets.

**Fonctionnalités:**
- ➕ Ajouter un nouveau projet
- 📝 Modifier le titre et la description
- 🖼️ Uploader une image (drag & drop ou clic)
- ❌ Supprimer un projet
- 🔄 Réorganiser les projets par drag-drop

**Comment ajouter un projet:**
1. Cliquez sur l'onglet "Projets"
2. Remplissez le titre et la description
3. Uploadez une image en glissant-déposant dans la zone ou en cliquant
4. Cliquez sur "Ajouter le projet"

---

### 2. **Profil** 👤
Gérez vos informations personnelles.

**Section Informations personnelles:**
- Prénom et nom
- Titre professionnel (ex: "Étudiant en GEII")
- Bio / Présentation personnelle
- Localisation

**Section Contacts et réseaux:**
- Email
- Téléphone
- LinkedIn (URL complète du profil)
- GitHub (URL complète du profil)

Ces informations s'affichent sur la page d'accueil et la page contact.

---

### 3. **Éducation** 🎓
Gérez votre formation et vos études.

**Pour chaque formation:**
- École/Université
- Diplôme obtenu
- Domaine d'études
- Année de graduation

**Actions:**
- ➕ Ajouter une formation
- ❌ Supprimer une formation
- ✏️ Modifier les champs en temps réel

---

### 4. **Compétences** 🛠️
Organisez vos compétences par catégories.

**Structure:**
- Catégories (ex: "Électronique", "Programmation", "Outils")
- Liste de compétences par catégorie

**Actions:**
- ➕ Ajouter une catégorie
- ➕ Ajouter une compétence dans une catégorie (tapez et appuyez sur Entrée)
- ❌ Supprimer une compétence
- ❌ Supprimer une catégorie entière

---

### 5. **Paramètres** ⚙️
Configurez les paramètres généraux de votre site.

**Informations du site:**
- Nom du site
- Description (pour le SEO)
- Logo/Initiales

**Informations de contact:**
- Nom de l'IUT/École
- URL de l'IUT/École
- Adresse

Ces informations s'affichent comme section partenaire en bas de la page d'accueil.

---

## Stockage des données

Toutes les données sont stockées dans le navigateur (localStorage) et persistent entre les sessions. Les données sont sauvegardées automatiquement quand vous cliquez sur "Enregistrer".

## Points importants

- ✅ Les modifications sont automatiquement sauvegardées dans localStorage
- 🔒 Le mot de passe d'accès à l'admin est : **1234**
- ⏱️ Votre session expire après 1 heure d'inactivité
- 📱 L'interface est responsive et fonctionne sur mobile
- 💾 Les données sont stockées localement dans votre navigateur

## Dépannage

**Problème: Mes données ne sont pas sauvegardées**
- Assurez-vous que localStorage n'est pas désactivé dans votre navigateur
- Vérifiez que vous avez de l'espace disque disponible

**Problème: Les images n'upload pas**
- La taille maximale est de 5 MB
- Les formats acceptés sont : PNG, JPG, GIF, WebP
- Assurez-vous que le fichier est une image valide

**Problème: Je ne peux plus accéder à l'admin**
- Votre session a peut-être expiré (1 heure maximum)
- Allez sur `admin-login.html` et reconnectez-vous avec le mot de passe

## Conseils d'utilisation

1. **Gardez vos informations à jour** : Les visiteurs verront vos infos en temps réel
2. **Utilisez des descriptions pertinentes** : Décrivez clairement vos projets
3. **Organisez vos compétences** : Groupez-les par catégorie logique
4. **Images de bonne qualité** : Utilisez des images claires et professionnelles
5. **LinkedIn à jour** : Maintenez votre profil LinkedIn à jour pour les liens

## Fonctionnalités futures envisagées

- 📊 Statistiques des visiteurs
- 🗂️ Gestion de fichiers/CV
- 💬 Messages de visiteurs
- 🎨 Personnalisation des couleurs du site
- 🌐 Support multilingue
