// Credenciales válidas (en un caso real, esto vendría de una base de datos o servicio)
const validUsers = {
    'admin': 'admin123',
    'usuario': 'clave123'
};

// Verificar si el usuario ya está autenticado
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.endsWith('menu.html')) {
        const username = sessionStorage.getItem('username');
        if (!username || !validUsers[username]) {
            window.location.href = 'index.html';
        } else {
            document.getElementById('loggedInUser').textContent = `Usuario: ${username}`;
        }
    }
});

// Manejar el formulario de login
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (validUsers[username] && validUsers[username] === password) {
            // Credenciales válidas
            sessionStorage.setItem('username', username);
            window.location.href = 'menu.html';
        } else {
            // Credenciales inválidas
            document.getElementById('errorMessage').textContent = 'Usuario o contraseña incorrectos';
        }
    });
}

// Manejar el logout
if (document.getElementById('logoutButton')) {
    document.getElementById('logoutButton').addEventListener('click', function() {
        sessionStorage.removeItem('username');
        window.location.href = 'index.html';
    });
}
