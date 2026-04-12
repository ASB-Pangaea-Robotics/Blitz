let currentLogId = null;

window.addEventListener('DOMContentLoaded', function () {
  const name = localStorage.getItem('blitzer_name');

  // if (!name) {
  //   window.location.href = LOGIN_URL;
  //   return;
  // }

  document.getElementById('nav-username').textContent = name || 'USER_NAME';

  document.getElementById('video-file-input').addEventListener('change', handleFileSelected);
});

async function renderTargetLog() {
  try{
    const res = await fetch('/api/operations');

    if(!res.ok) {
      throw new Error(`Fetching target log failed: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    document.querySelector('.target-name').textContent = data.target_name;
    document.querySelector('.target-grade-badge').textContent = "Grade: " + data.target_grade;
  }
  catch(error) {
    console.error('Fetching target log failed: ', error);
    alert('Failed to load target log. Please try again.');
  }
}

function openVideoUpload(logId) {
  currentLogId = logId;
  document.getElementById('video-file-input').click();
}

async function handleFileSelected(event) {
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

  try{
    const res = await fetch('/upload_video', {
      method: 'POST',
      body: formData,
    });

    if(!res.ok) {
      throw new Error(`Upload failed: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    if (data.success) {
          status.textContent = 'Transmission successful. Evidence logged.';
    } else {
          status.textContent = `Upload failed: ${data.error}`;
    }
  }
  catch(error) {
    status.textContent = 'Transmission error. Check connection.';
  }
  finally {
    closeBtn.style.display = 'inline-block';
    event.target.value = '';
  }
}

async function closeUploadModal() {
  document.getElementById('upload-modal').style.display = 'none';
}

async function signOut() {
    localStorage.removeItem('blitzer_name');
    localStorage.removeItem('blitzer_email');
    localStorage.removeItem('blitzer_grade');
    localStorage.removeItem('token');

    google.accounts.id.disableAutoSelect();

    window.location.href = LOGIN_URL;
}
