-- Script completo para resetear y poblar la base de datos veterinaria
-- Ejecutar este archivo para tener un conjunto completo de datos de prueba

-- Eliminar y recrear el schema
DROP SCHEMA IF EXISTS ex1;
CREATE SCHEMA ex1;
USE ex1;

-- Crear las tablas
CREATE TABLE IF NOT EXISTS tutor (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dni CHAR(8) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL, 
    direccion VARCHAR(200) NOT NULL, 
    telefono VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS medico (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    dni CHAR(8) NOT NULL UNIQUE, 
    nombre VARCHAR(100) NOT NULL, 
    especialidad VARCHAR(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS paciente (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    idTutor INT NOT NULL, 
    nombre VARCHAR(100) NOT NULL, 
    especie VARCHAR(10) NOT NULL, 
    raza VARCHAR(50) NOT NULL, 
    edad INT NOT NULL, 
    estado VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS citamedica (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    idPaciente INT NOT NULL, 
    idMedico INT NOT NULL, 
    motivo VARCHAR(200) NOT NULL, 
    fecha DATE NOT NULL
);

-- Agregar las foreign keys
ALTER TABLE paciente
    ADD CONSTRAINT fk_paciente_tutor
        FOREIGN KEY (idTutor) REFERENCES tutor(id);

ALTER TABLE citamedica
    ADD CONSTRAINT fk_citamedica_paciente
        FOREIGN KEY (idPaciente) REFERENCES paciente(id);
        
ALTER TABLE citamedica
    ADD CONSTRAINT fk_citamedica_medico
        FOREIGN KEY (idMedico) REFERENCES medico(id);

-- Poblar con datos de ejemplo
INSERT INTO tutor (dni, nombre, direccion, telefono) VALUES
('12345678', 'María García López', 'Av. Los Olivos 123, San Isidro', '987654321'),
('23456789', 'Carlos Rodríguez Pérez', 'Jr. Las Flores 456, Miraflores', '976543210'),
('34567890', 'Ana Martínez Silva', 'Calle Los Pinos 789, Surco', '965432109'),
('45678901', 'José Fernández Torres', 'Av. Universitaria 321, Los Olivos', '954321098'),
('56789012', 'Patricia Vásquez Luna', 'Jr. Amazonas 654, Centro de Lima', '943210987'),
('67890123', 'Roberto Sánchez Cruz', 'Calle San Martín 987, Barranco', '932109876'),
('78901234', 'Carmen Flores Ríos', 'Av. Arequipa 147, Lince', '921098765'),
('89012345', 'Miguel Herrera Díaz', 'Jr. Tacna 258, Breña', '910987654'),
('90123456', 'Elena Morales Castro', 'Calle Lima 369, Pueblo Libre', '909876543'),
('01234567', 'Fernando Jiménez Rojas', 'Av. Brasil 741, Jesús María', '998765432'),
('11223344', 'Diana Paredes Vega', 'Av. Colonial 852, Callao', '988776655'),
('22334455', 'Héctor Ramos Silva', 'Jr. Huancayo 963, San Miguel', '977665544');

INSERT INTO medico (dni, nombre, especialidad) VALUES
('11111111', 'Dr. Juan Carlos Mendoza', 'Medicina General Veterinaria'),
('22222222', 'Dra. Sofia Ramírez López', 'Cirugía Veterinaria'),
('33333333', 'Dr. Luis Alberto Castillo', 'Dermatología Veterinaria'),
('44444444', 'Dra. Isabel Vargas Moreno', 'Cardiología Veterinaria'),
('55555555', 'Dr. Ricardo Peña Guzmán', 'Oncología Veterinaria'),
('66666666', 'Dra. Andrea Salinas Torres', 'Neurología Veterinaria'),
('77777777', 'Dr. Pablo Restrepo Villa', 'Oftalmología Veterinaria'),
('88888888', 'Dra. Valeria Campos Núñez', 'Medicina Interna'),
('99999999', 'Dr. Alejandro Ruiz Paredes', 'Traumatología Veterinaria'),
('10101010', 'Dra. Mónica Guerrero Paz', 'Medicina Preventiva');

INSERT INTO paciente (idTutor, nombre, especie, raza, edad, estado) VALUES
(1, 'Max', 'Perro', 'Labrador', 3, 'Saludable'),
(1, 'Luna', 'Gato', 'Persa', 2, 'Saludable'),
(2, 'Rocky', 'Perro', 'Pastor Alemán', 5, 'En tratamiento'),
(3, 'Mimi', 'Gato', 'Siamés', 1, 'Saludable'),
(3, 'Thor', 'Perro', 'Golden Retriever', 4, 'Saludable'),
(4, 'Princesa', 'Gato', 'Maine Coon', 3, 'En observación'),
(5, 'Buddy', 'Perro', 'Bulldog Francés', 2, 'Saludable'),
(5, 'Whiskers', 'Gato', 'Ragdoll', 5, 'En tratamiento'),
(6, 'Charlie', 'Perro', 'Beagle', 6, 'Saludable'),
(6, 'Shadow', 'Gato', 'Negro Doméstico', 4, 'Saludable'),
(7, 'Bella', 'Perro', 'Cocker Spaniel', 3, 'En tratamiento'),
(8, 'Felix', 'Gato', 'Bengalí', 2, 'Saludable'),
(8, 'Rex', 'Perro', 'Rottweiler', 7, 'En observación'),
(9, 'Nala', 'Gato', 'Angora', 1, 'Saludable'),
(10, 'Duke', 'Perro', 'Husky Siberiano', 4, 'Saludable'),
(11, 'Coco', 'Perro', 'Chihuahua', 1, 'Saludable'),
(12, 'Garfield', 'Gato', 'Naranja Doméstico', 3, 'Saludable');

INSERT INTO citamedica (idPaciente, idMedico, motivo, fecha) VALUES
(1, 1, 'Consulta de rutina y vacunación anual', '2025-01-15'),
(2, 3, 'Problema dermatológico - irritación en la piel', '2025-01-16'),
(3, 2, 'Revisión post-operatoria', '2025-01-17'),
(4, 1, 'Primera consulta y vacunas de cachorro', '2025-01-18'),
(5, 4, 'Chequeo cardiológico preventivo', '2025-01-19'),
(6, 8, 'Consulta por pérdida de apetito', '2025-01-20'),
(7, 1, 'Vacunación y desparasitación', '2025-01-21'),
(8, 5, 'Seguimiento de tratamiento oncológico', '2025-01-22'),
(9, 1, 'Consulta de rutina', '2025-01-23'),
(10, 1, 'Chequeo general', '2025-01-24'),
(11, 6, 'Consulta neurológica por convulsiones', '2025-01-25'),
(12, 3, 'Revisión dermatológica', '2025-01-26'),
(13, 9, 'Evaluación traumatológica por cojera', '2025-01-27'),
(14, 7, 'Examen oftalmológico', '2025-01-28'),
(15, 1, 'Consulta preventiva y vacunación', '2025-01-29'),
(1, 10, 'Consulta de medicina preventiva', '2025-02-01'),
(3, 1, 'Control post-tratamiento', '2025-02-02'),
(5, 1, 'Consulta de seguimiento', '2025-02-03'),
(7, 2, 'Evaluación pre-quirúrgica', '2025-02-04'),
(9, 1, 'Chequeo mensual', '2025-02-05'),
(16, 1, 'Primera consulta de cachorro', '2025-02-10'),
(17, 3, 'Chequeo dermatológico preventivo', '2025-02-11'),
-- Agregar más citas futuras para testing
(1, 1, 'Control trimestral', '2025-03-15'),
(2, 3, 'Seguimiento dermatológico', '2025-03-16'),
(4, 1, 'Vacunación de refuerzo', '2025-03-18'),
(6, 8, 'Control de apetito', '2025-03-20'),
(8, 5, 'Control oncológico', '2025-03-22'),
(10, 1, 'Chequeo semestral', '2025-03-24'),
(12, 3, 'Revisión general', '2025-03-26'),
(14, 7, 'Control oftalmológico', '2025-03-28');

-- Mostrar resumen de datos insertados
SELECT 'RESUMEN DE DATOS INSERTADOS' as mensaje;
SELECT 'Tutores' as tabla, COUNT(*) as total FROM tutor
UNION ALL
SELECT 'Médicos' as tabla, COUNT(*) as total FROM medico
UNION ALL
SELECT 'Pacientes' as tabla, COUNT(*) as total FROM paciente
UNION ALL
SELECT 'Citas Médicas' as tabla, COUNT(*) as total FROM citamedica;

SELECT 'BASE DE DATOS VETERINARIA LISTA PARA USAR' as estado;
