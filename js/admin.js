document.addEventListener('DOMContentLoaded', () => {
    loadUsersTable();
    
    document.getElementById('addUserForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('newUsername').value.trim();
        const password = document.getElementById('newPassword').value;
        const role = document.getElementById('newUserRole').value;
        
        if (!users[username]) {
            users[username] = { password, role, email: '' };
            localStorage.setItem('users', JSON.stringify(users));
            logActivity(sessionStorage.getItem('username'), 'user_create', `Creó al usuario ${username}`);
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
                <button onclick="resetPassword('${username}')">Resetear</button>
                ${users[sessionStorage.getItem('username')].role === 'admin' ? 
                    `<button onclick="deleteUser('${username}')">Eliminar</button>` : ''}
            </td>
        `;
        tbody.appendChild(row);
    });
}

function resetPassword(username) {
    users[username].password = 'temp123';
    localStorage.setItem('users', JSON.stringify(users));
    logActivity(sessionStorage.getItem('username'), 'password_reset', `Reseteó contraseña de ${username}`);
    alert('Contraseña reseteada a "temp123"');
}

function deleteUser(username) {
    if (username === 'admin') return alert('No se puede eliminar al admin');
    delete users[username];
    localStorage.setItem('users', JSON.stringify(users));
    logActivity(sessionStorage.getItem('username'), 'user_delete', `Eliminó al usuario ${username}`);
    loadUsersTable();
}
