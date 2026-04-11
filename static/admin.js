let reviewQueue = [];
let currentReview = null;

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

  loadPendingReviews();
});

function loadPendingReviews() {
  fetch('/pending_reviews')
    .then(res => res.json())
    .then(data => {
      reviewQueue = data;
      showNextReview();
    })
    .catch(() => {
      document.getElementById('placeholder-text').textContent = 'Failed to load reviews.';
    });
}

function showNextReview() {
  const video = document.getElementById('evidence-video');
  const placeholder = document.getElementById('video-placeholder');

  if (reviewQueue.length === 0) {
    currentReview = null;
    video.style.display = 'none';
    video.src = '';
    placeholder.style.display = 'flex';
    document.getElementById('placeholder-text').textContent = 'No pending reviews.';
    document.getElementById('player-name').textContent = '—';
    document.getElementById('target-name').textContent = '—';
    return;
  }

  currentReview = reviewQueue.shift();
  document.getElementById('player-name').textContent = currentReview.player;
  document.getElementById('target-name').textContent = currentReview.target;

  placeholder.style.display = 'none';
  video.src = currentReview.video_evidence_path;
  video.style.display = 'block';
  video.load();
  video.play().catch(() => {});
}

function submitDecision(decision) {
  if (!currentReview) return;

  fetch('/review_decision', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ log_id: currentReview.id, decision }),
  })
    .then(res => res.json())
    .then(() => showNextReview())
    .catch(() => alert('Failed to submit decision. Try again.'));
}

function signOut() {
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_picture');

    google.accounts.id.disableAutoSelect();

    window.location.href = 'login.html';
}
