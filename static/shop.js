window.addEventListener('DOMContentLoaded', function () {
  const name = localStorage.getItem('blitzer_name');

  // if (!name) {
  //   window.location.href = LOGIN_URL;
  //   return;
  // }

  document.getElementById('nav-username').textContent = name || 'USER_NAME';
});

function openPrivateBountyModal() {
  const selectTarget = document.getElementById('private-target-select');
  //selectTarget.innerHTML = [ADD_FROM_BACKEND_TARGETS]

  const selectHunter = document.getElementById('private-hunter-select');
  //selectHunter.innerHTML = [ADD_FROM_BACKEND_HUNTERS]
  document.getElementById('private-bounty-modal').classList.add('open');
}

function closePrivateBountyModal() {
  document.getElementById('private-bounty-modal').classList.remove('open');
}

function confirmPrivateBounty() {
  const target = document.getElementById('private-target-select').value;
  const hunter = document.getElementById('private-hunter-select').value;

  // TODO: send to backend
  console.log('Purchase confirmed:', {
    item:     "PRIVATE_BOUNTY",
    target:   target,
    hunter:   hunter,
    total:    500,
  });

  closePrivateBountyModal();
  alert(`Purchase confirmed!\nPRIVATE_BOUNTY for ${target}\nHunter: ${hunter}\nTotal: ₹500`);
}

// Close modal when clicking the dark overlay background
document.getElementById('private-bounty-modal').addEventListener('click', function (e) {
  if (e.target === this) closePrivateBountyModal();
});

function openPublicBountyModal() {
  const selectTarget = document.getElementById('public-target-select');
  //selectTarget.innerHTML = [ADD_FROM_BACKEND_TARGETS]

  document.getElementById('public-bounty-modal').classList.add('open');
}

function closePublicBountyModal() {
  document.getElementById('public-bounty-modal').classList.remove('open');
}

function confirmPublicBounty() {
  const target = document.getElementById('public-target-select').value;

  // TODO: send to backend
  console.log('Purchase confirmed:', {
    item:     "PUBLIC_BOUNTY",
    target:   target,
    total:    2000,
  });

  closePublicBountyModal();
  alert(`Purchase confirmed!\nPUBLIC_BOUNTY for ${target}\nTotal: ₹2,000`);
}

// Close modal when clicking the dark overlay background
document.getElementById('public-bounty-modal').addEventListener('click', function (e) {
  if (e.target === this) closePublicBountyModal();
});


function openReviveModal() {
  document.getElementById('revive-modal').classList.add('open');
}

function closeReviveModal() {
  document.getElementById('revive-modal').classList.remove('open');
}

function confirmRevive() {
  // TODO: send to backend
  console.log('Purchase confirmed:', {
    item:     "Revive",
    quantity: 1,
    target:   localStorage.getItem('user_name'),
    total:    2000,
  });

  closeReviveModal();
  alert(`Purchase confirmed!\nREVIVE\nTotal: ₹2,000 `);
}

document.getElementById('revive-modal').addEventListener('click', function (e) {
  if (e.target === this) closeReviveModal();
});

function signOut() {
  localStorage.removeItem('blitzer_name');
  localStorage.removeItem('blitzer_email');
  localStorage.removeItem('blitzer_grade');
  localStorage.removeItem('token');

  google.accounts.id.disableAutoSelect();
  window.location.href = LOGIN_URL;
}