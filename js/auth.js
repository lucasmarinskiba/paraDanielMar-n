document.addEventListener('DOMContentLoaded', function() {
    // Cargar usuarios desde localStorage
    let users = JSON.parse(localStorage.getItem('users')) || {
        'admin': { password: 'admin123', role: 'admin' },
        'usuario': { password: 'clave123', role: 'user' }
    };

    // Guardar usuarios iniciales si no existen
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Depuración: Mostrar usuarios cargados
    console.log('Usuarios cargados:', users);

    // Manejar login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;

            // Depuración: Verificar credenciales ingresadas
            console.log('Intento de login:', { username, password });

            const user = users[username];
            if (user && user.password === password) {
                // Guardar sesión
                sessionStorage.setItem('username', username);
                console.log('Login exitoso. Redirigiendo...');
                
                // Redirección absoluta para GitHub Pages
                window.location.href = '/paraDanielMar-n/menu.html';
            } else {
                document.getElementById('errorMessage').textContent = 'Credenciales incorrectas';
                console.error('Error: Credenciales no válidas');
            }
        });
    }

    // Verificar sesión en otras páginas
    if (!window.location.pathname.includes('index.html')) {
        const username = sessionStorage.getItem('username');
        if (!username || !users[username]) {
            console.warn('Usuario no autenticado. Redirigiendo...');
            window.location.href = '/paraDanielMar-n/index.html';
        }
    }
});
