window.onload = function () {
  google.accounts.id.initialize({
    client_id: "1023634013834-k2fe7pksm8mea6f16rj66pqaih6in439.apps.googleusercontent.com",
    callback: handleCredentialResponse,
    ux_mode: 'popup'
  });

  google.accounts.id.renderButton(
    document.getElementById('google-btn'),
    { theme: 'outline', size: 'large', width: 360 }
  );
};

function handleCredentialResponse(response) {
  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    }, 
    body: JSON.stringify({
      token: response.credential
    }) 
  })
  .then(res => res.json())
  .then(data => {
    console.log('Backend Response:', data);
    localStorage.setItem('user_name', data.name);
    localStorage.setItem('user_email', data.email);
    localStorage.setItem('user_picture', data.picture);
    localStorage.setItem('user_grade', data.grade);

    window.location.href = 'operations.html';
  })
  .catch(error => {
    console.error('Login: FAILED', error);
  })
}