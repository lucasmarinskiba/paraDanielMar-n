document.addEventListener('DOMContentLoaded', () => {
    loadLogs();
    loadUserFilter();
    
    document.getElementById('dateFilter').addEventListener('change', filterLogs);
    document.getElementById('userFilter').addEventListener('change', filterLogs);
});

function loadLogs() {
    const logs = JSON.parse(localStorage.getItem('activityLog')) || [];
    renderLogs(logs);
}

function loadUserFilter() {
    const select = document.getElementById('userFilter');
    const users = new Set(JSON.parse(localStorage.getItem('activityLog')).map(log => log.username));
    
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user;
        option.textContent = user;
        select.appendChild(option);
    });
}

function filterLogs() {
    const date = document.getElementById('dateFilter').value;
    const user = document.getElementById('userFilter').value;
    
    let logs = JSON.parse(localStorage.getItem('activityLog'));
    
    if (date) logs = logs.filter(log => log.timestamp.startsWith(date));
    if (user !== 'all') logs = logs.filter(log => log.username === user);
    
    renderLogs(logs);
}

function renderLogs(logs) {
    const tbody = document.querySelector('#logsTable tbody');
    tbody.innerHTML = '';
    
    logs.forEach(log => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${new Date(log.timestamp).toLocaleString()}</td>
            <td>${log.username}</td>
            <td>${log.action}</td>
            <td>${log.details}</td>
        `;
        tbody.appendChild(row);
    });
}
