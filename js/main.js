// Navegación del menú lateral
document.querySelectorAll('.menu-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = this.getAttribute('href');
    });
});

// Control de botones de acción rápida
document.getElementById('uploadBtn').addEventListener('click', () => {
    window.location.href = 'sections/upload.html';
});

document.getElementById('meetingBtn').addEventListener('click', () => {
    window.location.href = 'sections/meetings.html';
});

document.getElementById('messageBtn').addEventListener('click', () => {
    window.location.href = 'sections/messages.html';
});
