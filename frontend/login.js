document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    document.getElementById('loginMessage').innerText = result.msg || 'User logged in successfully';

    if (response.ok) {
        localStorage.setItem('token', result.token);
        window.location.href = 'dashboard.html';
    }
});
