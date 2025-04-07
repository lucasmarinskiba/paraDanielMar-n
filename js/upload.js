// Manejo de la subida de archivos
document.getElementById('projectForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    const files = document.getElementById('formFile').files;
    
    for (let i = 0; i < files.length; i++) {
        if (files[i].size > 25 * 1024 * 1024) {
            alert(`El archivo ${files[i].name} excede el límite de 25MB`);
            return;
        }
        formData.append('files[]', files[i]);
    }

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Error:', error);
        alert('Error al subir archivos');
    }
});
