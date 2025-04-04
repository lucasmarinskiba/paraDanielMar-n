// Cargar y mostrar proyectos
function loadProjects() {
    fetch('../data/projects.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('projectsList');
            container.innerHTML = data.proyectos.length > 0 
                ? data.proyectos.map(project => `
                    <div class="project-item">
                        <span class="project-name">${project.nombre}</span>
                        <span class="project-status">${project.estado}</span>
                    </div>
                `).join('')
                : '<div class="no-projects">Sin proyectos activos</div>';
        });
}

document.addEventListener('DOMContentLoaded', loadProjects);
