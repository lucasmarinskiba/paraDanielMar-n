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

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('projectForm');
    const fileInput = document.getElementById('projectFiles');
    const filePreview = document.getElementById('filePreview');

    // Vista previa de archivos
    fileInput.addEventListener('change', function() {
        filePreview.innerHTML = '';
        const files = this.files;
        
        if (files.length > 0) {
            const list = document.createElement('ul');
            list.className = 'list-group';
            
            Array.from(files).forEach((file, index) => {
                if (file.size > 25 * 1024 * 1024) { // 25MB
                    alert(`El archivo ${file.name} excede el tamaño máximo de 25MB`);
                    return;
                }
                
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
                
                listItem.innerHTML = `
                    <div>
                        <i class="${getFileIcon(file)} me-2"></i>
                        ${file.name} (${formatFileSize(file.size)})
                    </div>
                    <button type="button" class="btn btn-sm btn-danger remove-file" data-index="${index}">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                
                list.appendChild(listItem);
            });
            
            filePreview.appendChild(list);
        }
    });

    // Eliminar archivos de la vista previa
    filePreview.addEventListener('click', function(e) {
        if (e.target.closest('.remove-file')) {
            const index = e.target.closest('.remove-file').dataset.index;
            removeFileFromInput(index);
            e.target.closest('li').remove();
        }
    });

    // Envío del formulario
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const projectName = document.getElementById('projectName').value;
        
        if (!projectName) {
            alert('Por favor ingresa un nombre para el proyecto');
            return;
        }
        
        formData.append('projectName', projectName);
        
        try {
            // Cambia esta URL por tu endpoint real
            const response = await fetch('tu_endpoint_de_subida.php', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                alert('Proyecto creado y archivos subidos exitosamente!');
                form.reset();
                filePreview.innerHTML = '';
            } else {
                alert('Error: ' + (result.message || 'Error al subir archivos'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al conectar con el servidor');
        }
    });

    // Funciones auxiliares
    function getFileIcon(file) {
        const type = file.type.split('/')[0];
        const extension = file.name.split('.').pop().toLowerCase();
        
        const icons = {
            image: 'fas fa-file-image',
            application: {
                pdf: 'fas fa-file-pdf',
                msword: 'fas fa-file-word',
                'vnd.openxmlformats-officedocument.wordprocessingml.document': 'fas fa-file-word',
                'vnd.ms-excel': 'fas fa-file-excel',
                'vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'fas fa-file-excel',
                'vnd.ms-powerpoint': 'fas fa-file-powerpoint',
                'vnd.openxmlformats-officedocument.presentationml.presentation': 'fas fa-file-powerpoint',
                zip: 'fas fa-file-archive',
                'x-rar-compressed': 'fas fa-file-archive'
            },
            text: 'fas fa-file-alt'
        };
        
        if (type === 'image') return icons.image;
        if (type === 'text') return icons.text;
        if (icons.application[extension] || icons.application[file.type.split('/')[1]]) {
            return icons.application[extension] || icons.application[file.type.split('/')[1]];
        }
        
        return 'fas fa-file';
    }
    
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    function removeFileFromInput(index) {
        const dt = new DataTransfer();
        const files = fileInput.files;
        
        for (let i = 0; i < files.length; i++) {
            if (index !== i.toString()) dt.items.add(files[i]);
        }
        
        fileInput.files = dt.files;
    }
});
