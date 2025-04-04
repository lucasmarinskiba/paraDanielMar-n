// Navegación del menú lateral
document.querySelectorAll('.menu-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetSection = this.getAttribute('href').substring(1);
        
        // Ocultar todas las secciones
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.add('hidden');
        });
        
        // Mostrar sección seleccionada
        document.getElementById(targetSection).classList.remove('hidden');
        
        // Actualizar clase activa
        document.querySelectorAll('.menu-nav li').forEach(item => {
            item.classList.remove('active');
        });
        this.parentElement.classList.add('active');
    });
});

// Funcionalidad de Accesos Rápidos
document.addEventListener('DOMContentLoaded', () => {
    // Control de modales
    const modals = {
        'uploadModal': document.getElementById('uploadModal'),
        'meetingModal': document.getElementById('meetingModal'),
        'messageModal': document.getElementById('messageModal')
    };

    // Mostrar modal
    window.showModal = (modalId) => {
        Object.values(modals).forEach(modal => modal.style.display = 'none');
        if(modals[modalId]) modals[modalId].style.display = 'block';
    }

    // Cerrar modal
    window.closeModal = (modalId) => {
        if(modals[modalId]) modals[modalId].style.display = 'none';
    }

    // Eventos para botones de acción
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const action = this.dataset.action;
            if(action) showModal(action);
        });
    });

    // Cerrar modales al hacer clic fuera
    window.onclick = function(e) {
        if(e.target.classList.contains('modal-container')) {
            e.target.style.display = 'none';
        }
    }

    // Inicialización de secciones
    document.getElementById('dashboard').classList.remove('hidden');
    document.querySelector('.menu-nav li:first-child').classList.add('active');
});

// Lógica para formularios (ejemplo para reuniones)
document.getElementById('meetingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const meetingData = {
        title: document.getElementById('meetingTitle').value,
        date: document.getElementById('meetingTime').value,
        participants: Array.from(document.getElementById('participants').selectedOptions)
                        .map(option => option.value),
        topic: document.getElementById('meetingTopic').value
    };
    
    // Guardar en localStorage
    const meetings = JSON.parse(localStorage.getItem('meetings')) || [];
    meetings.push(meetingData);
    localStorage.setItem('meetings', JSON.stringify(meetings));
    
    closeModal('meetingModal');
    alert('¡Reunión programada con éxito!');
});
