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

async function handleCredentialResponse(response) {
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      }, 
      body: JSON.stringify({
        token: response.credential
      }) 
    });

    if(!res.ok) {
      throw new Error( `Login failed: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    console.log('Backend Response:', data);
    localStorage.setItem('user_name', data.name);
    localStorage.setItem('user_email', data.email);
    localStorage.setItem('user_picture', data.picture);
    localStorage.setItem('user_grade', data.grade);
    localStorage.setItem('token', data.token);
  }
  catch(error) {
    console.error('Login error: ', error);
    alert('Login failed. Please try again.');
  }
}