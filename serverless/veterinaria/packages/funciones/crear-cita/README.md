# Función Lambda: Crear Cita Médica Veterinaria

Esta función AWS Lambda se encarga de crear citas médicas veterinarias a través de eventos de EventBridge.

## Funcionamiento

La función recibe un evento de EventBridge con los datos necesarios para crear una cita médica y realiza una llamada HTTP POST al servicio backend para registrar la cita.

## Estructura del Evento de Entrada

```json
{
  "detail": {
    "pacienteId": 1,
    "medicoId": 2,
    "motivo": "Consulta general",
    "fecha": "2025-07-15"
  }
}
```

### Campos requeridos:
- `pacienteId` (number): ID del paciente (mascota)
- `medicoId` (number): ID del médico veterinario
- `motivo` (string): Motivo de la consulta
- `fecha` (string): Fecha de la cita en formato ISO (YYYY-MM-DD)

## Variables de Entorno

- `URL_BASE_SERVICIO`: URL base del servicio backend (ejemplo: `http://localhost:8080`)

## Respuesta del Backend

La función espera una respuesta del backend con la siguiente estructura:

```json
{
  "id": 123,
  "paciente": {
    "id": 1,
    "nombre": "Firulais",
    "especie": "Perro",
    "raza": "Golden Retriever"
  },
  "medico": {
    "id": 2,
    "nombre": "Dr. García",
    "especialidad": "Medicina General"
  },
  "motivo": "Consulta general",
  "fecha": "2025-07-15"
}
```

## Endpoints Utilizados

- `POST /api/citas` - Crear nueva cita médica

## Compilación y Despliegue

```bash
# Instalar dependencias
npm install

# Compilar TypeScript
npm run build

# Ejecutar pruebas
npm test

# Linting
npm run lint
```

## Ejemplo de Uso con EventBridge

```json
{
  "Source": "veterinaria.sistema",
  "DetailType": "Nueva Cita Solicitada",
  "Detail": {
    "pacienteId": 1,
    "medicoId": 2,
    "motivo": "Vacunación anual",
    "fecha": "2025-07-20"
  }
}
```

## Manejo de Errores

- La función valida que todos los campos requeridos estén presentes
- Maneja errores HTTP del backend
- Registra todos los errores en CloudWatch Logs
- En caso de error, lanza una excepción para permitir reintentos automáticos

## Logs

La función genera logs detallados que incluyen:
- Evento recibido completo
- Validaciones realizadas
- Respuesta del backend
- Errores si ocurren
- Confirmación de cita creada exitosamente
