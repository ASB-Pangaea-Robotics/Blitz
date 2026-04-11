const buttons = document.querySelectorAll('.tab-btn');

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

buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('active'));

    button.classList.add('active');
    requestData();
  })
});

function requestData() {
  fetch('/api/leaderboard')
      .then(response => response.json())
      .then(data => {
        console.log('Backend Repoonse: ', data);

        displayLeaderboard(data);
      })
      .catch(error => {
        console.error('Login: FAILED', error);
      });
}

function displayLeaderboard(items) {
  const leaderboardBody = document.getElementById('leaderboard-body');

  leaderboardBody.innerHTML = '';

  items.forEach(item => {
    const row = document.createElement('tr');

    row.innerHTML = `
    <td>
      <div class="rank-cell">
        <span class="rank-num top">#${item.ranking}</span>
      </div>
    </td>
    <td><span class="player-name top">${item.name}</span></td>
    <td class="elim-cell top">${item.eliminations}</td>
    `;

    leaderboardBody.appendChild(row);
  })
}