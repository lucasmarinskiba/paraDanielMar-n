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

// Logo clickeable dinámico
document.addEventListener('DOMContentLoaded', function() {
    const logoLink = document.querySelector('.logo-link');
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            if (!window.location.pathname.endsWith('index.html')) {
                window.location.href = 'index.html'; // Redirige solo si NO es la página principal
            }
            // Si ya está en index.html, no hace nada
        });
    }
});

// Función para cambiar contraseña
// Versión mejorada con validaciones
function changePassword() {
    const currentUser = sessionStorage.getItem('username');
    if (!currentUser) return;

    const isAdmin = users[currentUser]?.role === 'admin';
    const newPass = document.getElementById('newPass').value;

    // Validar nueva contraseña
    if (newPass.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres');
        return;
    }

    if (isAdmin) {
        const targetUser = document.getElementById('targetUser').value;
        users[targetUser].password = newPass;
    } else {
        const currentPass = document.getElementById('currentPass').value;
        if (users[currentUser].password !== currentPass) {
            alert('Contraseña actual incorrecta');
            return;
        }
        users[currentUser].password = newPass;
    }

    // Guardar y notificar
    localStorage.setItem('users', JSON.stringify(users));
    logActivity(currentUser, 'password_change', `Contraseña actualizada`);
    alert('¡Contraseña actualizada!');
    window.location.href = 'menu.html'; // Redirigir después del cambio
}

// Ejemplo: Requerir mayúsculas y números
if (!/[A-Z]/.test(newPass) || !/[0-9]/.test(newPass)) {
    alert('La contraseña debe incluir mayúsculas y números');
    return;
}

// Añade esto al guardar la contraseña
users[targetUser].password = btoa(newPass); // Encripta en Base64 (no es segura, pero mejora la simulación)

// Y al verificar:
if (users[currentUser].password !== btoa(currentPass)) { ... }
