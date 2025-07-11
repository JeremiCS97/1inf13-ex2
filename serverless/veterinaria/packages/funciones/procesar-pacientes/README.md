# Función Lambda: Procesar Pacientes

Esta función Lambda procesa eventos relacionados con el manejo de pacientes veterinarios, permitiendo actualizar su estado, cambiar tutores, actualizar datos o dar de alta.

## Descripción

La función `procesar-pacientes` es disparada por eventos de EventBridge cuando se necesita realizar operaciones especiales sobre los pacientes veterinarios del sistema.

## Eventos Soportados

### Source: `pe.com.veterinaria`
### Detail-Type: `Procesar Paciente`

## Acciones Disponibles

### 1. Actualizar Estado
```json
{
  "pacienteId": 1,
  "accion": "actualizar_estado",
  "nuevoEstado": "En tratamiento",
  "observaciones": "Iniciando tratamiento por infección"
}
```

### 2. Cambiar Tutor
```json
{
  "pacienteId": 1,
  "accion": "cambiar_tutor",
  "nuevoTutorId": 2,
  "observaciones": "Cambio de propietario"
}
```

### 3. Actualizar Datos
```json
{
  "pacienteId": 1,
  "accion": "actualizar_datos",
  "datosActualizados": {
    "nombre": "Firulais Jr.",
    "edad": 4,
    "raza": "Golden Retriever Mixto"
  },
  "observaciones": "Actualización de datos generales"
}
```

### 4. Dar de Alta
```json
{
  "pacienteId": 1,
  "accion": "dar_de_alta",
  "observaciones": "Paciente completamente recuperado"
}
```

## Variables de Entorno

- `URL_BASE_SERVICIO`: URL base del servicio backend (ej: http://localhost:8080)

## Dependencias

- `axios`: Para realizar peticiones HTTP al backend
- `@types/aws-lambda`: Tipos TypeScript para eventos de Lambda

## Scripts

- `npm run build`: Compila TypeScript a JavaScript
- `npm run test`: Ejecuta pruebas unitarias
- `npm run lint`: Ejecuta linter de código

## Estructura del Proyecto

```
procesar-pacientes/
├── src/
│   ├── index.ts          # Función principal
│   └── index.test.ts     # Pruebas unitarias
├── package.json          # Configuración npm
├── tsconfig.json         # Configuración TypeScript
├── jest.config.js        # Configuración Jest
├── eslint.config.mjs     # Configuración ESLint
├── example-event.json    # Ejemplo de evento
└── README.md            # Este archivo
```

## Flujo de Procesamiento

1. **Recepción del Evento**: La función recibe un evento de EventBridge
2. **Validación**: Valida que el evento contenga los datos requeridos
3. **Obtención del Paciente**: Consulta los datos actuales del paciente
4. **Procesamiento**: Ejecuta la acción solicitada según el tipo
5. **Actualización**: Envía los datos actualizados al backend
6. **Logging**: Registra el resultado de la operación

## Manejo de Errores

- **URL no definida**: Registra error y termina sin procesar
- **Datos insuficientes**: Registra error y termina sin procesar  
- **Paciente no encontrado**: Propaga error HTTP 404
- **Error en actualización**: Propaga error del backend
- **Errores de red**: Propaga errores de conexión

## Tipos de Estado de Pacientes

- `Activo`: Paciente registrado y disponible para citas
- `En tratamiento`: Paciente actualmente recibiendo atención
- `Dado de alta`: Paciente que completó tratamiento
- `Inactivo`: Paciente temporalmente no disponible

## Ejemplos de Uso

### A través de API Gateway
```bash
POST /pacientes/async
Content-Type: application/json

{
  "pacienteId": 1,
  "accion": "actualizar_estado",
  "nuevoEstado": "En tratamiento"
}
```

### Directamente en EventBridge
```bash
aws events put-events --entries file://example-event.json
```

## Testing

Ejecutar todas las pruebas:
```bash
npm test
```

Ejecutar con cobertura:
```bash
npm test -- --coverage
```

Las pruebas cubren:
- Todos los tipos de acciones soportadas
- Validaciones de datos
- Manejo de errores HTTP
- Manejo de errores de red
- Configuración de variables de entorno
