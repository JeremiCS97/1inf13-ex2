-- Consultas útiles para testing y verificación del sistema veterinario

USE ex1;

-- 1. Consulta para ver todos los tutores y sus mascotas
SELECT 
    t.dni as tutor_dni,
    t.nombre as tutor_nombre,
    t.telefono,
    p.nombre as mascota_nombre,
    p.especie,
    p.raza,
    p.edad,
    p.estado
FROM tutor t
LEFT JOIN paciente p ON t.id = p.idTutor
ORDER BY t.nombre, p.nombre;

-- 2. Consulta para ver todas las citas médicas programadas
SELECT 
    c.id as cita_id,
    c.fecha,
    p.nombre as paciente,
    p.especie,
    t.nombre as tutor,
    t.telefono as telefono_tutor,
    m.nombre as medico,
    m.especialidad,
    c.motivo
FROM citamedica c
JOIN paciente p ON c.idPaciente = p.id
JOIN tutor t ON p.idTutor = t.id
JOIN medico m ON c.idMedico = m.id
ORDER BY c.fecha ASC;

-- 3. Consulta para ver pacientes por estado
SELECT 
    estado,
    COUNT(*) as cantidad_pacientes,
    GROUP_CONCAT(nombre SEPARATOR ', ') as nombres_pacientes
FROM paciente
GROUP BY estado;

-- 4. Consulta para ver la carga de trabajo por médico
SELECT 
    m.nombre as medico,
    m.especialidad,
    COUNT(c.id) as total_citas,
    DATE(MIN(c.fecha)) as primera_cita,
    DATE(MAX(c.fecha)) as ultima_cita
FROM medico m
LEFT JOIN citamedica c ON m.id = c.idMedico
GROUP BY m.id, m.nombre, m.especialidad
ORDER BY total_citas DESC;

-- 5. Consulta para ver tutores con múltiples mascotas
SELECT 
    t.nombre as tutor,
    t.telefono,
    t.direccion,
    COUNT(p.id) as cantidad_mascotas,
    GROUP_CONCAT(CONCAT(p.nombre, ' (', p.especie, ')') SEPARATOR ', ') as mascotas
FROM tutor t
JOIN paciente p ON t.id = p.idTutor
GROUP BY t.id
HAVING cantidad_mascotas > 1
ORDER BY cantidad_mascotas DESC;

-- 6. Consulta para ver próximas citas (futuras)
SELECT 
    c.fecha,
    p.nombre as paciente,
    p.especie,
    p.raza,
    t.nombre as tutor,
    t.telefono,
    m.nombre as medico,
    c.motivo
FROM citamedica c
JOIN paciente p ON c.idPaciente = p.id
JOIN tutor t ON p.idTutor = t.id
JOIN medico m ON c.idMedico = m.id
WHERE c.fecha >= CURDATE()
ORDER BY c.fecha ASC;

-- 7. Consulta para ver pacientes en tratamiento
SELECT 
    p.nombre as paciente,
    p.especie,
    p.raza,
    p.edad,
    t.nombre as tutor,
    t.telefono,
    COUNT(c.id) as total_citas
FROM paciente p
JOIN tutor t ON p.idTutor = t.id
LEFT JOIN citamedica c ON p.id = c.idPaciente
WHERE p.estado = 'En tratamiento'
GROUP BY p.id
ORDER BY total_citas DESC;

-- 8. Resumen estadístico del sistema
SELECT 
    'Tutores' as entidad,
    COUNT(*) as total
FROM tutor
UNION ALL
SELECT 
    'Médicos' as entidad,
    COUNT(*) as total
FROM medico
UNION ALL
SELECT 
    'Pacientes' as entidad,
    COUNT(*) as total
FROM paciente
UNION ALL
SELECT 
    'Citas Médicas' as entidad,
    COUNT(*) as total
FROM citamedica;

-- 9. Insertar datos adicionales si es necesario para testing

-- Más tutores
INSERT IGNORE INTO tutor (dni, nombre, direccion, telefono) VALUES
('11223344', 'Diana Paredes Vega', 'Av. Colonial 852, Callao', '988776655'),
('22334455', 'Héctor Ramos Silva', 'Jr. Huancayo 963, San Miguel', '977665544');

-- Más pacientes
INSERT IGNORE INTO paciente (idTutor, nombre, especie, raza, edad, estado) VALUES
(11, 'Coco', 'Perro', 'Chihuahua', 1, 'Saludable'),
(12, 'Garfield', 'Gato', 'Naranja Doméstico', 3, 'Saludable');

-- Más citas para testing
INSERT IGNORE INTO citamedica (idPaciente, idMedico, motivo, fecha) VALUES
(16, 1, 'Primera consulta de cachorro', '2025-02-10'),
(17, 3, 'Chequeo dermatológico preventivo', '2025-02-11');
