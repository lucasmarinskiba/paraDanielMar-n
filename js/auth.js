// Base de datos de usuarios (simulada)
let users = JSON.parse(localStorage.getItem('users')) || {
    'admin': {
        password: 'admin123',
        role: 'admin',
        email: 'admin@empresa.com'
    },
    'usuario': {
        password: 'clave123',
        role: 'user',
        email: 'usuario@empresa.com'
    }
};

// Registro de actividades
let activityLog = JSON.parse(localStorage.getItem('activityLog')) || [];

// Función para registrar actividades
function logActivity(username, action, details) {
    const entry = {
        timestamp: new Date().toISOString(),
        username,
        action,
        details
    };
    activityLog.push(entry);
    localStorage.setItem('activityLog', JSON.stringify(activityLog));
}

// Manejo del login
document.addEventListener('DOMContentLoaded', function() {
    // Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            
            if (users[username] && users[username].password === password) {
                sessionStorage.setItem('username', username);
                logActivity(username, 'login', 'Inicio de sesión exitoso');
                window.location.href = 'menu.html';
            } else {
                document.getElementById('errorMessage').textContent = 'Usuario o contraseña incorrectos';
            }
        });
    }
    
    // Logout
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            const username = sessionStorage.getItem('username');
            logActivity(username, 'logout', 'Cierre de sesión');
            sessionStorage.removeItem('username');
            window.location.href = 'index.html';
        });
    }
    
    // Protección de rutas
    if (!window.location.pathname.endsWith('index.html')) {
        const username = sessionStorage.getItem('username');
        if (!username || !users[username]) {
            window.location.href = 'index.html';
        }
    }
});
