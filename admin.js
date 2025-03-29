// Llenar tabla de usuarios
function loadUsersTable() {
    const table = document.getElementById('usersTable');
    table.innerHTML = `
        <tr>
            <th>Usuario</th>
            <th>Rol</th>
            <th>Acciones</th>
        </tr>
    `;
    
    Object.keys(users).forEach(username => {
        const user = users[username];
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${username}</td>
            <td>${user.role}</td>
            <td>
                <button onclick="showResetPass('${username}')">Reset Pass</button>
                ${checkPermission('admin') ? 
                    `<button onclick="deleteUser('${username}')">Eliminar</button>` : ''}
            </td>
        `;
        
        table.appendChild(row);
    });
}

// Agregar nuevo usuario
document.getElementById('addUserForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = this.elements[0].value
