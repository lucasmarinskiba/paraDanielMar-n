const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Crear carpeta uploads si no existe
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

app.post('/upload', upload.array('files[]'), (req, res) => {
    try {
        // Mover archivos a ubicación permanente
        req.files.forEach(file => {
            fs.renameSync(file.path, `uploads/${file.originalname}`);
        });
        
        res.json({ 
            success: true,
            message: 'Archivos subidos correctamente'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error al procesar archivos'
        });
    }
});

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));
