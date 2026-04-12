const aliveButtons = document.querySelectorAll('.alive .tab-btn');
const allButtons = document.querySelectorAll('.all .tab-btn');

window.addEventListener('DOMContentLoaded', function () {
  const name = localStorage.getItem('blitzer_name');

  // if (!name) {
  //   window.location.href = LOGIN_URL;
  //   return;
  // }

  document.getElementById('nav-username').textContent = name || 'USER_NAME';

  requestData("ALIVE", "GRADE 9");
  requestData("ALL", "GRADE 9");
});

aliveButtons.forEach(button => {
  button.addEventListener('click', () => {
    aliveButtons.forEach(btn => btn.classList.remove('active'));

    button.classList.add('active');
    requestData(button.textContent.trim(), "alive");
  })
});

allButtons.forEach(button => {
  button.addEventListener('click', () => {
    allButtons.forEach(btn => btn.classList.remove('active'));

    button.classList.add('active');
    requestData(button.textContent.trim(), "all");
  })
});

async function requestData(group, type) {
  try{
    const res = await fetch('/api/leaderboard', {
      method: 'POST', 
      body: JSON.stringify({
        leaderboard_group: group,
        leaderboard_type: type,
        token: localStorage.getItem('token')
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if(!res.ok) {
      throw new Error('Failed to fetch leaderboard data: ', res.status, res.statusText);
    }

    const data = await res.json();
    displayLeaderboard(data, type);
  }
  catch(error) {
    console.error('Error fetching leaderboard data: ', error);
  }
}

function displayLeaderboard(items, type) {
  const leaderboardBody = type === "ALIVE" ? document.getElementById('leaderboard-body-alive') : document.getElementById('leaderboard-body-all');

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

function signOut() {
    localStorage.removeItem('blitzer_name');
    localStorage.removeItem('blitzer_email');
    localStorage.removeItem('blitzer_grade');
    localStorage.removeItem('token');

    google.accounts.id.disableAutoSelect();

    window.location.href = LOGIN_URL;
}