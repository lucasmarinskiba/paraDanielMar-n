// Base de datos de usuarios (simulada)
// Base de datos de usuarios (almacenada en localStorage)
// auth.js - Versión corregida
let users = JSON.parse(localStorage.getItem('users')) || {
    'admin': { password: 'admin123', role: 'admin' },
    'usuario': { password: 'clave123', role: 'user' }
};

// Función de registro de actividades
function logActivity(username, action, details) {
    const activityLog = JSON.parse(localStorage.getItem('activityLog')) || [];
    activityLog.push({
        timestamp: new Date().toISOString(),
        username,
        action,
        details
    });
    localStorage.setItem('activityLog', JSON.stringify(activityLog));
}

// Verificación de sesión en todas las páginas
document.addEventListener('DOMContentLoaded', () => {
    if (!window.location.pathname.endsWith('index.html')) {
        const username = sessionStorage.getItem('username');
        if (!username || !users[username]) {
            window.location.href = 'index.html';
        }
    }
});
