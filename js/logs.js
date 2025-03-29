document.addEventListener('DOMContentLoaded', function() {
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
    const users = new Set();
    
    const logs = JSON.parse(localStorage.getItem('activityLog')) || [];
    logs.forEach(log => users.add(log.username));
    
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user;
        option.textContent = user;
        select.appendChild(option);
    });
}

function filterLogs() {
    const dateFilter = document.getElementById('dateFilter').value;
    const userFilter = document.getElementById('userFilter').value;
    
    let logs = JSON.parse(localStorage.getItem('activityLog')) || [];
    
    if (dateFilter) {
        logs = logs.filter(log => log.timestamp.startsWith(dateFilter));
    }
    
    if (userFilter !== 'all') {
        logs = logs.filter(log => log.username === userFilter);
    }
    
    renderLogs(logs);
}

function renderLogs(logs) {
    const tbody = document.querySelector('#logsTable tbody');
    tbody.innerHTML = '';
    
    logs.forEach(log => {
        const row = document.createElement('tr');
        
        const date = new Date(log.timestamp);
        const formattedDate = date.toLocaleString();
        
        row.innerHTML = `
            <td>${formattedDate}</td>
            <td>${log.username}</td>
            <td>${log.action}</td>
            <td>${log.details}</td>
        `;
        
        tbody.appendChild(row);
    });
}
