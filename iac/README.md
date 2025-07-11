# Infraestructura como Código - Sistema Veterinario

Este proyecto contiene la definición de infraestructura como código (IAC) para el sistema de gestión veterinaria usando Terraform.

## Arquitectura

El sistema despliega los siguientes componentes:

### 🏥 **Aplicación Backend (ECS/Fargate)**
- API REST para gestión de tutores, médicos, pacientes y citas
- Contenedor Docker desplegado en ECS Fargate
- Application Load Balancer para distribución de tráfico
- Conexión a base de datos MySQL (RDS)

### ⚡ **Funciones Serverless (AWS Lambda)**
- **crear-cita**: Procesa eventos para crear citas médicas veterinarias
- **procesar-pacientes**: Gestiona el procesamiento de información de pacientes

### 📡 **Sistema de Eventos (EventBridge)**
- Bus de eventos `veterinaria-bus` para comunicación asíncrona
- Reglas para enrutar eventos a las funciones Lambda correspondientes

### 🔗 **API Gateway**
- Endpoints para integración con sistemas externos
- Integración con EventBridge para publicar eventos

## Comandos de Terraform

### Inicializar el estado de Terraform

```bash
AWS_PROFILE=academy terraform init -backend-config "bucket=veterinaria-iac-state" -backend-config "dynamodb_table=terraform-locks"
```

### Validar el plan de Terraform

```bash
AWS_PROFILE=academy terraform validate
```

### Ejecutar el plan de Terraform

```bash
AWS_PROFILE=academy terraform plan --var-file=main.tfvars
```

### Aplicar el plan de Terraform

```bash
AWS_PROFILE=academy terraform apply --var-file=main.tfvars
```

### Destruir toda la infraestructura creada

```bash
AWS_PROFILE=academy terraform destroy --var-file=main.tfvars
```

## Variables de Configuración

Las principales variables están definidas en `main.tfvars`:

- **nombre_cluster_ecs**: `veterinaria-cluster`
- **familia_tarea_ecs**: `veterinaria-tarea`
- **nombre_repo_ecr**: `veterinaria`
- **servidor_base_datos**: Esquema `ex1` en RDS MySQL
- **nombre_servicio_ecs**: `veterinaria-servicio`

## Módulos

### `/modules/serverless`
Gestiona las funciones Lambda para el procesamiento de eventos veterinarios.

### `/modules/compute`
Configura el cluster ECS, tareas y servicios para la aplicación backend.

### `/modules/events`
Define el bus de eventos EventBridge y las reglas de enrutamiento.

### `/modules/api`
Configura API Gateway para la integración externa.

## Endpoints de la API

Una vez desplegado, el sistema expone los siguientes endpoints:

```
GET  /api/tutores         - Listar tutores
POST /api/tutores         - Crear tutor
GET  /api/medicos         - Listar médicos veterinarios
POST /api/medicos         - Crear médico
GET  /api/pacientes       - Listar pacientes (mascotas)
POST /api/pacientes       - Registrar paciente
GET  /api/citas           - Listar citas médicas
POST /api/citas           - Crear cita médica
```

## Eventos Soportados

### Crear Cita Médica
```json
{
  "Source": "veterinaria.sistema",
  "DetailType": "Nueva Cita Solicitada", 
  "Detail": {
    "pacienteId": 1,
    "medicoId": 2,
    "motivo": "Consulta general",
    "fecha": "2025-07-15"
  }
}
```

### Procesar Paciente
```json
{
  "Source": "veterinaria.sistema",
  "DetailType": "Procesar Paciente",
  "Detail": {
    "pacienteId": 1,
    "accion": "actualizar_estado"
  }
}
```