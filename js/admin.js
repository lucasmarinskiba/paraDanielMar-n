document.addEventListener('DOMContentLoaded', function() {
    loadUsersTable();
    
    // Agregar nuevo usuario
    document.getElementById('addUserForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('newUsername').value.trim();
        const password = document.getElementById('newPassword').value;
        const role = document.getElementById('newUserRole').value;
        
        if (!users[username]) {
            users[username] = { password, role, email: '' };
            localStorage.setItem('users', JSON.stringify(users));
            
            const currentUser = sessionStorage.getItem('username');
            logActivity(currentUser, 'user_create', `Usuario creado: ${username}`);
            
            alert('Usuario creado con éxito');
            loadUsersTable();
        } else {
            alert('El usuario ya existe');
        }
    });
});

function loadUsersTable() {
    const tbody = document.querySelector('#usersTable tbody');
    tbody.innerHTML = '';
    
    Object.keys(users).forEach(username => {
        const user = users[username];
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${username}</td>
            <td>${user.role}</td>
            <td>
                <button onclick="resetPassword('${username}')">Resetear Pass</button>
                ${users[sessionStorage.getItem('username')].role === 'admin' ? 
                    `<button onclick="deleteUser('${username}')">Eliminar</button>` : ''}
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

function resetPassword(username) {
    if (confirm(`¿Resetear contraseña de ${username} a "temp123"?`)) {
        users[username].password = 'temp123';
        localStorage.setItem('users', JSON.stringify(users));
        
        const currentUser = sessionStorage.getItem('username');
        logActivity(currentUser, 'password_reset', `Contraseña reseteada para ${username}`);
        
        alert('Contraseña reseteada');
        loadUsersTable();
    }
}

function deleteUser(username) {
    if (username === 'admin') {
        alert('No se puede eliminar al administrador principal');
        return;
    }
    
    if (confirm(`¿Eliminar permanentemente al usuario ${username}?`)) {
        delete users[username];
        localStorage.setItem('users', JSON.stringify(users));
        
        const currentUser = sessionStorage.getItem('username');
        logActivity(currentUser, 'user_delete', `Usuario eliminado: ${username}`);
        
        alert('Usuario eliminado');
        loadUsersTable();
    }
}
