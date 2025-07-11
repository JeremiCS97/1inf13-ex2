# API URLs para testing con Postman - Sistema Veterinario

## Base URL
```
http://localhost:8080
```

## URLs de producción (cuando esté desplegado)
```
http://veterinaria-alb-962891291.us-east-1.elb.amazonaws.com
```

---

## 1. HEALTH CHECK

### GET - Health Check
```
GET {{base_url}}/
```
**Descripción:** Verifica que la API esté funcionando
**Respuesta esperada:** 
```json
{
    "status": "UP",
    "timestamp": "2025-01-11T10:30:00"
}
```

---

## 2. TUTORES API

### GET - Listar todos los tutores
```
GET {{base_url}}/api/tutores
```

### GET - Obtener tutor por ID
```
GET {{base_url}}/api/tutores/1
```

### GET - Obtener tutor por DNI
```
GET {{base_url}}/api/tutores/dni/12345678
```

### POST - Crear nuevo tutor
```
POST {{base_url}}/api/tutores
Content-Type: application/json

{
    "dni": "87654321",
    "nombre": "Juan Pérez Nuevo",
    "direccion": "Av. Nueva 123, Lima",
    "telefono": "987654321"
}
```

### PUT - Actualizar tutor
```
PUT {{base_url}}/api/tutores/1
Content-Type: application/json

{
    "dni": "12345678",
    "nombre": "María García López Actualizada",
    "direccion": "Av. Los Olivos 123, San Isidro",
    "telefono": "987654321"
}
```

### DELETE - Eliminar tutor
```
DELETE {{base_url}}/api/tutores/11
```

---

## 3. MÉDICOS API

### GET - Listar todos los médicos
```
GET {{base_url}}/api/medicos
```

### GET - Obtener médico por ID
```
GET {{base_url}}/api/medicos/1
```

### GET - Obtener médico por DNI
```
GET {{base_url}}/api/medicos/dni/11111111
```

### POST - Crear nuevo médico
```
POST {{base_url}}/api/medicos
Content-Type: application/json

{
    "dni": "12121212",
    "nombre": "Dr. Nuevo Veterinario",
    "especialidad": "Medicina General"
}
```

### PUT - Actualizar médico
```
PUT {{base_url}}/api/medicos/1
Content-Type: application/json

{
    "dni": "11111111",
    "nombre": "Dr. Juan Carlos Mendoza Actualizado",
    "especialidad": "Medicina General Veterinaria"
}
```

### DELETE - Eliminar médico
```
DELETE {{base_url}}/api/medicos/10
```

---

## 4. PACIENTES API

### GET - Listar todos los pacientes
```
GET {{base_url}}/api/pacientes
```

### GET - Obtener paciente por ID
```
GET {{base_url}}/api/pacientes/1
```

### GET - Listar pacientes por tutor
```
GET {{base_url}}/api/pacientes/tutor/1
```

### GET - Listar pacientes por especie
```
GET {{base_url}}/api/pacientes/especie/Perro
GET {{base_url}}/api/pacientes/especie/Gato
```

### GET - Listar pacientes por estado
```
GET {{base_url}}/api/pacientes/estado/Saludable
GET {{base_url}}/api/pacientes/estado/En%20tratamiento
GET {{base_url}}/api/pacientes/estado/En%20observación
```

### GET - Buscar pacientes por nombre
```
GET {{base_url}}/api/pacientes/buscar?nombre=Max
GET {{base_url}}/api/pacientes/buscar?nombre=Luna
```

### GET - Listar pacientes por raza
```
GET {{base_url}}/api/pacientes/raza/Labrador
GET {{base_url}}/api/pacientes/raza/Persa
```

### GET - Listar pacientes por rango de edad
```
GET {{base_url}}/api/pacientes/edad?min=1&max=3
GET {{base_url}}/api/pacientes/edad?min=5&max=10
```

### POST - Crear nuevo paciente
```
POST {{base_url}}/api/pacientes
Content-Type: application/json

{
    "idTutor": 1,
    "nombre": "Nuevo Paciente",
    "especie": "Perro",
    "raza": "Mestizo",
    "edad": 2,
    "estado": "Saludable"
}
```

### PUT - Actualizar paciente
```
PUT {{base_url}}/api/pacientes/1
Content-Type: application/json

{
    "idTutor": 1,
    "nombre": "Max Actualizado",
    "especie": "Perro",
    "raza": "Labrador",
    "edad": 4,
    "estado": "Saludable"
}
```

### DELETE - Eliminar paciente
```
DELETE {{base_url}}/api/pacientes/15
```

---

## 5. CITAS MÉDICAS API

### GET - Listar todas las citas
```
GET {{base_url}}/api/citas
```

### GET - Obtener cita por ID
```
GET {{base_url}}/api/citas/1
```

### GET - Listar citas por paciente
```
GET {{base_url}}/api/citas/paciente/1
```

### GET - Listar citas por médico
```
GET {{base_url}}/api/citas/medico/1
```

### GET - Listar citas por fecha específica
```
GET {{base_url}}/api/citas/fecha/2025-01-15
GET {{base_url}}/api/citas/fecha/2025-02-01
```

### GET - Listar citas por rango de fechas
```
GET {{base_url}}/api/citas/fechas?inicio=2025-01-15&fin=2025-01-31
GET {{base_url}}/api/citas/fechas?inicio=2025-02-01&fin=2025-02-28
```

### GET - Listar citas futuras
```
GET {{base_url}}/api/citas/futuras
```

### GET - Listar citas pasadas
```
GET {{base_url}}/api/citas/pasadas
```

### GET - Buscar citas por motivo
```
GET {{base_url}}/api/citas/buscar?motivo=vacunación
GET {{base_url}}/api/citas/buscar?motivo=consulta
```

### POST - Crear nueva cita
```
POST {{base_url}}/api/citas
Content-Type: application/json

{
    "idPaciente": 1,
    "idMedico": 1,
    "motivo": "Consulta de rutina nueva",
    "fecha": "2025-03-15"
}
```

### PUT - Actualizar cita
```
PUT {{base_url}}/api/citas/1
Content-Type: application/json

{
    "idPaciente": 1,
    "idMedico": 1,
    "motivo": "Consulta de rutina y vacunación anual - ACTUALIZADA",
    "fecha": "2025-01-15"
}
```

### DELETE - Eliminar cita
```
DELETE {{base_url}}/api/citas/20
```

---

## 6. VARIABLES DE ENTORNO PARA POSTMAN

### Crear las siguientes variables en Postman:

1. **Local Development:**
   - `base_url`: `http://localhost:8080`

2. **Production/AWS:**
   - `base_url`: `http://veterinaria-alb-962891291.us-east-1.elb.amazonaws.com`

---

## 7. EJEMPLOS DE TESTING COMPLETO

### Flujo completo de testing:

1. **Verificar health:** `GET /`
2. **Crear tutor:** `POST /api/tutores`
3. **Crear médico:** `POST /api/medicos`
4. **Crear paciente:** `POST /api/pacientes` (usar ID del tutor creado)
5. **Crear cita:** `POST /api/citas` (usar IDs del paciente y médico)
6. **Listar todas las entidades para verificar**
7. **Probar búsquedas específicas**
8. **Actualizar datos**
9. **Eliminar datos de prueba**

### Datos de IDs existentes (según sample_data.sql):
- **Tutores:** IDs del 1 al 10
- **Médicos:** IDs del 1 al 10  
- **Pacientes:** IDs del 1 al 15
- **Citas:** IDs del 1 al 20

---

## 8. HEADERS REQUERIDOS

Para todos los requests POST y PUT:
```
Content-Type: application/json
```

---

## 9. CÓDIGOS DE RESPUESTA ESPERADOS

- **200 OK:** Operación exitosa (GET, PUT)
- **201 Created:** Recurso creado exitosamente (POST)
- **204 No Content:** Eliminación exitosa (DELETE)
- **404 Not Found:** Recurso no encontrado
- **400 Bad Request:** Datos inválidos en el request
