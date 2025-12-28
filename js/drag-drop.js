// ===== DRAG & DROP IMAGE UPLOAD =====

function initDragDrop(zoneId, fileInputId, hiddenInputId, feedbackId) {
  const dragZone = document.getElementById(zoneId);
  const fileInput = document.getElementById(fileInputId);
  const hiddenInput = document.getElementById(hiddenInputId);
  const feedback = document.getElementById(feedbackId);

  if (!dragZone || !fileInput || !hiddenInput) return;

  // Click to select file
  dragZone.addEventListener('click', function() {
    fileInput.click();
  });

  dragZone.querySelector('.drag-drop-link').addEventListener('click', function(e) {
    e.stopPropagation();
    fileInput.click();
  });

  // File selected via input
  fileInput.addEventListener('change', function() {
    if (this.files.length > 0) {
      handleFileUpload(this.files[0], dragZone, hiddenInput, feedback);
    }
  });

  // Drag & Drop
  dragZone.addEventListener('dragover', function(e) {
    e.preventDefault();
    e.stopPropagation();
    dragZone.classList.add('drag-over');
  });

  dragZone.addEventListener('dragleave', function(e) {
    e.preventDefault();
    e.stopPropagation();
    dragZone.classList.remove('drag-over');
  });

  dragZone.addEventListener('drop', function(e) {
    e.preventDefault();
    e.stopPropagation();
    dragZone.classList.remove('drag-over');

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      // Mettre à jour l'input file
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInput.files = dataTransfer.files;
      
      handleFileUpload(file, dragZone, hiddenInput, feedback);
    }
  });
}

function handleFileUpload(file, dragZone, hiddenInput, feedback) {
  // Vérifier le type de fichier
  if (!file.type.startsWith('image/')) {
    showError(feedback, 'Veuillez sélectionner une image valide');
    return;
  }

  // Vérifier la taille (5MB)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    showError(feedback, 'L\'image est trop volumineuse (max 5MB)');
    return;
  }

  // Lire le fichier et convertir en base64
  const reader = new FileReader();
  reader.onload = function(e) {
    const base64 = e.target.result;
    hiddenInput.value = base64;

    // Afficher le feedback
    showSuccess(feedback, `Image sélectionnée: ${file.name}`);
    dragZone.classList.remove('drag-over');
  };

  reader.onerror = function() {
    showError(feedback, 'Erreur lors de la lecture du fichier');
  };

  reader.readAsDataURL(file);
}

function showSuccess(feedback, message) {
  feedback.textContent = '✓ ' + message;
  feedback.classList.remove('error');
  feedback.style.display = 'block';
}

function showError(feedback, message) {
  feedback.textContent = '✗ ' + message;
  feedback.classList.add('error');
  feedback.style.display = 'block';
}

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', function() {
  // Admin page
  if (document.getElementById('drag-drop-admin')) {
    initDragDrop('drag-drop-admin', 'project-image-file', 'project-image', 'image-name');
  }

  // Quick add modal (projets.html)
  if (document.getElementById('drag-drop-quick')) {
    initDragDrop('drag-drop-quick', 'quick-image-file', 'quick-image', 'quick-image-name');
  }
});
