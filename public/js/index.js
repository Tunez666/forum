function toggleSidebar() {
  const sidebar = document.querySelector('.admin-sidebar');
  sidebar.classList.toggle('closed');
}

// ============================================
// Smooth Scroll to Section
// ============================================
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// ============================================
// Character Form - Image Upload
// ============================================
const imageInput = document.getElementById('character-image');
const imageUploadArea = document.getElementById('image-upload-area');
//const imagePreview = document.getElementById('image-preview');
//const previewImage = document.getElementById('preview-image');

// Drag and drop
imageUploadArea.addEventListener('dragover', function (e) {
  e.preventDefault();
  this.classList.add('dragover');
});

imageUploadArea.addEventListener('dragleave', function () {
  this.classList.remove('dragover');
});

imageUploadArea.addEventListener('drop', function (e) {
  e.preventDefault();
  this.classList.remove('dragover');

  const files = e.dataTransfer.files;
  if (files.length > 0 && files[0].type.startsWith('image/')) {
    handleImageFile(files[0]);
  }
});

imageInput.addEventListener('change', function () {
  if (this.files.length > 0) {
    handleImageFile(this.files[0]);
  }
});

function handleImageFile(file) {
  const reader = new FileReader();
  reader.onload = function (e) {
    previewImage.src = e.target.result;
    imagePreview.style.display = 'block';
    imageUploadArea.querySelector('.upload-placeholder').style.display = 'none';
  };
  reader.readAsDataURL(file);
}

function removeImage() {
  imageInput.value = '';
  imagePreview.style.display = 'none';
  imageUploadArea.querySelector('.upload-placeholder').style.display = 'flex';
}

// ===============================
// OPEN CREATE MODAL
// ===============================
function openCreateModal() {
  const modal = document.getElementById('event-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// ===============================
// CLOSE CREATE MODAL
// ===============================
function closeCreateModal() {
  const modal = document.getElementById('event-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// ===============================
// CLOSE BY OVERLAY CLICK
// ===============================
function closeModalOnOverlayEdit(event) {
  if (event.target.id === 'event-modal') {
    closeCreateModal();
  }
}
// ===============================
// OPEN EDIT MODAL
// ===============================
function openEditModal(id, name, date, description) {
  document.getElementById('edit-event-id').value = id;
  document.getElementById('edit-event-name').value = name;
  document.getElementById('edit-event-date').value = date;
  document.getElementById('edit-event-description').value = description;

  const modal = document.getElementById('edit-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// ===============================
// CLOSE EDIT MODAL
// ===============================
function closeEditModal() {
  const modal = document.getElementById('edit-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// ===============================
// CLOSE BY OVERLAY CLICK
// ===============================
function closeModalOnOverlayEdit(event) {
  if (event.target.id === 'edit-modal') {
    closeEditModal();
  }
}

// ===============================
// OPEN DELETE MODAL
// ===============================
function openDeleteModal(id) {
  document.getElementById('delete-event-id').value = id;

  const modal = document.getElementById('delete-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// ===============================
// CLOSE DELETE MODAL
// ===============================
function closeDeleteModal() {
  const modal = document.getElementById('delete-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// ===============================
// CLOSE BY OVERLAY CLICK
// ===============================
function closeModalOnOverlayEdit(event) {
  if (event.target.id === 'delete-modal') {
    closeDeleteModal();
  }
}