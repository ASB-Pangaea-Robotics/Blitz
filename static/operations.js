window.addEventListener('DOMContentLoaded', function () {
  const name    = localStorage.getItem('user_name');
  const picture = localStorage.getItem('user_picture');

  // if (!name) {
  //   window.location.href = 'login.html';
  //   return;
  // }

  document.getElementById('nav-username').textContent = name;

  const avatar = document.getElementById('nav-avatar');
  avatar.src = picture;
  avatar.style.display = 'block';

  document.getElementById('video-file-input').addEventListener('change', handleFileSelected);
});

fetch('/api/operations')
  .then(response => response.json())
  .then(data => {
    console.log('Backend Response: ', data);

    document.querySelector('.target-image').src = data.target_image;
    document.querySelector('.target-name').textContent = data.target_name;
    document.querySelector('.target-grade-badge').textContent = data.target_grade;
  })
  .catch(error => {
    console.error('Login: FAILED', error);
  })

let currentLogId = null;

function openVideoUpload(logId) {
  currentLogId = logId;
  document.getElementById('video-file-input').click();
}

function handleFileSelected(event) {
  const file = event.target.files[0];
  if (!file) return;

  const modal = document.getElementById('upload-modal');
  const status = document.getElementById('upload-status');
  const closeBtn = document.getElementById('upload-close-btn');

  modal.style.display = 'flex';
  status.textContent = 'Transmitting evidence...';
  closeBtn.style.display = 'none';

  const formData = new FormData();
  formData.append('file', file);
  formData.append('log_id', currentLogId);

  fetch('/upload_video', {
    method: 'POST',
    body: formData,
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        status.textContent = 'Transmission successful. Evidence logged.';
      } else {
        status.textContent = `Upload failed: ${data.error}`;
      }
    })
    .catch(() => {
      status.textContent = 'Transmission error. Check connection.';
    })
    .finally(() => {
      closeBtn.style.display = 'inline-block';
      event.target.value = '';
    });
}

function closeUploadModal() {
  document.getElementById('upload-modal').style.display = 'none';
}

function signOut() {
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_picture');

    google.accounts.id.disableAutoSelect();

    window.location.href = 'login.html';
}
