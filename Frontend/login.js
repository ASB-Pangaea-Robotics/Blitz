window.onload = function () {
  google.accounts.id.initialize({
    client_id: "1023634013834-k2fe7pksm8mea6f16rj66pqaih6in439.apps.googleusercontent.com",
    callback: handleCredentialResponse,
    ux_mode: 'popup'
  });

  // Render an actual Google button inside your existing button
  google.accounts.id.renderButton(
    document.getElementById('google-btn'),
    { theme: 'outline', size: 'large', width: 360 }
  );
};

function handleCredentialResponse(response) {
  const payload = parseJwt(response.credential);

  localStorage.setItem('user_name',    payload.name);
  localStorage.setItem('user_email',   payload.email);
  localStorage.setItem('user_picture', payload.picture);

  window.location.href = 'operations.html';
}

function parseJwt(token) {
  const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(atob(base64));
}