# Infraestructura como código

Mag. Eric Raphael Huiza Pereyra


## El

## problema

## tradicional

```
Infraestructura manual y
propensa a errores
```
```
Despliegues inconsistentes
entre entornos
```
```
Escalabilidad limitada
```
```
Tiempos largos de
aprovisionamiento
```

¿Qué es IaC?

```
IaC es el proceso de gestionar y aprovisionar
recursos de infraestructura mediante archivos
de configuración legibles por máquinas.
```
```
Infraestructura tratada como software
```
```
Reutilizable, auditable y versionable
```

#### Beneficios clave

```
Consistencia entre entornos
```
```
Automatización de despliegues
```
```
Versionamiento con control de cambios
```
```
Integración con CI/CD
```
```
Escalabilidad más eficiente
```

### Actores y contexto

```
DevOps / SRE / Cloud
Engineers
```
```
Plataformas: AWS,
Azure, GCP, On-Prem
```
```
Herramientas
comunes: Terraform ,
Ansible, Pulumi,
CloudFormation
```

### Declarativo vs Imperativo

```
Imperativo :
define cómo hacer
los cambios paso a
paso
```
```
Declarativo :
define qué estado
final se desea (IaC
suele ser declarativa)
```

Componentes
de IaC

```
Archivos de configuración (.tf,.yaml,
etc.)
```
```
Herramienta de
orquestación (Terraform,
CloudFormation)
```
```
Módulos y variables reutilizables
```
```
Backends remotos y control de estado
```

Flujo de
trabajo
típico

```
Escribir la definición de la
infraestructura
```
```
Validar el plan (plan)
```
```
Aplicar los cambios (apply)
```
```
Control de cambios y
versionamiento (git,ci/cd)
```
```
Monitorear y auditar
```

## Mejores

## prácticas

```
Usar control de versiones (Git)
```
```
Separar ambientes (dev, staging, prod)
```
```
Modularizar recursos
```
```
Revisar los planes antes de aplicarlos
```
```
Usar control de estado remoto
```

#### Desafíos comunes

```
Manejo del
estado
```
```
Control de
cambios
destructivos
```
```
Dependencias
entre recursos
```
```
Seguridad y
control de
acceso
```
```
Formación del
equipo
```

#### ¿Qué es Terraform?

```
Herramienta de IaC desarrollada por HashiCorp
```
```
Basada en lenguaje declarativo (HCL)
```
```
Compatible con múltiples proveedores: AWS, Azure, GCP, etc.
```
```
Mantiene un estado de la infraestructura
```

#### Estructura básica de un proyecto

```
main.tf: definición principal
```
```
variables.tf: parámetros configurables
```
```
outputs.tf: valores exportados
```
```
terraform.tfstate: archivo de estado
```

Comandos
esenciales

```
terraform init: inicializa el
Proyecto
```
```
terraform plan: muestra los
cambios a aplicar
```
```
terraform apply: aplica los
cambios
```
```
terraform destroy: elimina
infraestructura
```

#### Casos de uso y buenas prácticas

```
Despliegue automático de entornos
```
```
Infraestructura replicable en múltiples regiones
```
```
Gestión segura con remote backends (S3, Terraform Cloud)
```
```
Uso de módulos reutilizables
```
```
Integración con CI/CD
```

# Gracias.


