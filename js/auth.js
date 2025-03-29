// Base de datos simulada
const users = {
    'admin': {
        password: 'admin123',
        role: 'admin',
        email: 'admin@empresa.com'
    },
    'usuario': {
        password: 'clave123',
        role: 'usuario',
        email: 'usuario@empresa.com'
    }
};

// Registro de actividades
const activityLog = [];

function logActivity(username, action, details) {
    activityLog.push({
        timestamp: new Date().toISOString(),
        username,
        action,
        details
    });
    // En un sistema real, enviarías esto al servidor
    localStorage.setItem('activityLog', JSON.stringify(activityLog));
}

// Verificar permisos
function checkPermission(requiredRole) {
    const user = sessionStorage.getItem('username');
    return users[user] && 
           (users[user].role === 'admin' || users[user].role === requiredRole);
}
