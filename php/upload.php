<?php
header('Content-Type: application/json');

try {
    // Verificar si hay archivos
    if (empty($_FILES['projectFiles'])) {
        throw new Exception('No se recibieron archivos');
    }

    $projectName = $_POST['projectName'] ?? 'proyecto_sin_nombre';
    $uploadDir = 'uploads/' . $projectName . '/';
    
    // Crear directorio si no existe
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $uploadedFiles = [];
    $errors = [];

    // Procesar cada archivo
    foreach ($_FILES['projectFiles']['tmp_name'] as $key => $tmpName) {
        $fileName = basename($_FILES['projectFiles']['name'][$key]);
        $targetFile = $uploadDir . $fileName;
        
        // Verificar tamaño (25MB máximo)
        if ($_FILES['projectFiles']['size'][$key] > 25 * 1024 * 1024) {
            $errors[] = "El archivo $fileName excede el tamaño máximo de 25MB";
            continue;
        }
        
        // Mover el archivo
        if (move_uploaded_file($tmpName, $targetFile)) {
            $uploadedFiles[] = $fileName;
        } else {
            $errors[] = "Error al subir el archivo $fileName";
        }
    }

    // Respuesta
    echo json_encode([
        'success' => empty($errors),
        'uploadedFiles' => $uploadedFiles,
        'errors' => $errors,
        'message' => empty($errors) ? 'Archivos subidos correctamente' : 'Algunos archivos no se pudieron subir'
    ]);

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
