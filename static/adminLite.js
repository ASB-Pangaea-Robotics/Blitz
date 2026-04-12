let reviewQueue = [];
let currentReview = null;

window.addEventListener('DOMContentLoaded', function () {
  const name = localStorage.getItem('blitzer_name');

  // if (!name) {
  //   window.location.href = LOGIN_URL;
  //   return;
  // }

  document.getElementById('nav-username').textContent = name || 'USER_NAME';
  document.getElementById('user-name').textContent = name || 'USER_NAME';

  //Load Video Reviews
  loadPendingReviews();
});

//Video review stuff
async function loadPendingReviews() {
  try{
    const res = fetch('/pending_reviews');

    if(!res.ok) {
      throw new Error('Failed to load reviews: ', res.status, res.statusText);
    }

    const data = await res.json();

    reviewQueue = data;
    showNextReview();
  }
  catch(error) {
    console.error('Failed to load reviews: ', error);
    document.getElementById('placeholder-text').textContent = 'Failed to load reviews.';
  }
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

async function submitDecision(decision) {
  if (!currentReview) return;
  try{
    const res = await fetch('/api/review_decision', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ log_id: currentReview.id, decision, token: localStorage.getItem('token') }),
    });

    if(!res.ok) {
      throw new Error('Failed to submit decision: ', res.status, res.statusText);
    }

    const data = await res.json();
    showNextReview();
  }
  catch(error) {
    console.log('Failed to submit decision: ', error);
    alert('Failed to submit decision. Try again.');
  }
}

// Google sign out
function signOut() {
    localStorage.removeItem('blitzer_name');
    localStorage.removeItem('blitzer_email');
    localStorage.removeItem('blitzer_grade');
    localStorage.removeItem('token');

    google.accounts.id.disableAutoSelect();

    window.location.href = LOGIN_URL;
}