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
});

function signOut() {
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_picture');
    
    google.accounts.id.disableAutoSelect();

    window.location.href = 'login.html';
}