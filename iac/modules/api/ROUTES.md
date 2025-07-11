# API Routes - Sistema Veterinario

Este documento describe todas las rutas disponibles en el API Gateway del sistema veterinario.

## Rutas de Citas Médicas

### HTTP Proxy (Directo al Backend)
- `GET /citas` - Listar todas las citas
- `GET /citas/{id}` - Obtener cita por ID
- `GET /citas/medico/{medicoId}` - Citas de un médico
- `GET /citas/paciente/{pacienteId}` - Citas de un paciente
- `POST /citas` - Crear nueva cita (directo)
- `PUT /citas/{id}` - Actualizar cita
- `DELETE /citas/{id}` - Eliminar cita

### EventBridge Integration (Asíncrono)
- `POST /citas/async` - Crear cita médica a través de EventBridge
  - Trigger: Lambda `veterinaria-crear-cita`
  - Event: "Nueva Cita Solicitada"

## Rutas de Tutores

- `GET /tutores` - Listar todos los tutores
- `GET /tutores/{id}` - Obtener tutor por ID
- `GET /tutores/dni/{dni}` - Buscar tutor por DNI
- `POST /tutores` - Crear nuevo tutor
- `PUT /tutores/{id}` - Actualizar tutor
- `DELETE /tutores/{id}` - Eliminar tutor

## Rutas de Médicos

- `GET /medicos` - Listar todos los médicos
- `GET /medicos/{id}` - Obtener médico por ID
- `GET /medicos/dni/{dni}` - Buscar médico por DNI
- `POST /medicos` - Crear nuevo médico
- `PUT /medicos/{id}` - Actualizar médico
- `DELETE /medicos/{id}` - Eliminar médico

## Rutas de Pacientes

### HTTP Proxy (Directo al Backend)
- `GET /pacientes` - Listar todos los pacientes
- `GET /pacientes/{id}` - Obtener paciente por ID
- `GET /pacientes/tutor/{tutorId}` - Pacientes de un tutor
- `GET /pacientes/especie/{especie}` - Pacientes por especie
- `POST /pacientes` - Crear nuevo paciente
- `PUT /pacientes/{id}` - Actualizar paciente
- `DELETE /pacientes/{id}` - Eliminar paciente

### EventBridge Integration (Procesamiento Especial)
- `POST /pacientes/async` - Procesar paciente a través de EventBridge
  - Trigger: Lambda `veterinaria-procesar-pacientes`
  - Event: "Procesar Paciente"

## Ejemplos de Uso

### Crear Cita Médica (Asíncrono)
```bash
POST /citas/async
Content-Type: application/json

{
  "pacienteId": 1,
  "medicoId": 2,
  "motivo": "Consulta general",
  "fecha": "2025-07-15"
}
```

### Crear Tutor
```bash
POST /tutores
Content-Type: application/json

{
  "dni": "12345678",
  "nombre": "Juan Pérez",
  "direccion": "Av. Principal 123",
  "telefono": "987654321"
}
```

### Crear Paciente
```bash
POST /pacientes
Content-Type: application/json

{
  "tutor": { "id": 1 },
  "nombre": "Firulais",
  "especie": "Perro",
  "raza": "Golden Retriever",
  "edad": 3,
  "estado": "Activo"
}
```

### Procesar Paciente (Asíncrono)
```bash
POST /pacientes/async
Content-Type: application/json

{
  "pacienteId": 1,
  "accion": "actualizar_estado",
  "nuevoEstado": "En tratamiento"
}
```

## Configuración CORS

Todas las rutas tienen configuración CORS habilitada:
- Origins: `*` (todos los orígenes)
- Methods: `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`
- Headers: `*` (todos los headers)

## Rate Limiting

- Throttling Burst Limit: 500 requests
- Throttling Rate Limit: 1000 requests per second

## Logging

- Logging Level: `INFO`
- CloudWatch Logs habilitado para todas las rutas
