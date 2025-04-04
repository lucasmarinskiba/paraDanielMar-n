document.addEventListener('DOMContentLoaded', () => {
    // Ocultar enlace de Administración si no es admin
    const user = sessionStorage.getItem('username');
    const isAdmin = JSON.parse(localStorage.getItem('users'))[user]?.role === 'admin';
    document.getElementById('adminLink').style.display = isAdmin ? 'block' : 'none';
});
