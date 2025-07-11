## Programación distribuida

## sin Servidores

Mag. Eric Raphael Huiza Pereyra


¿Qué es
Serverless?
Modelo de computación en la nube
donde el proveedor gestiona la
infraestructura.
El desarrollador se enfoca solo en el
código.
No hay necesidad de administrar
servidores ni escalar.


Características Principales
**Ejecución bajo
demanda** (event-
driven).
Escalado
automático.
**Facturación por
uso** (pago por
ejecución).
Alta
disponibilidad
integrada.


Beneficios
APIs REST y GraphQL.
Automatización de tareas.
Procesamiento de datos en tiempo
real.
Integración de microservicios.


Arquitectura
Serverless
Componentes:
Funciones (como
Lambda).
Servicios de mensajería
(SNS, SQS).
Triggers (HTTP, eventos,
cron, etc.).
Se apoya en servicios
gestionados (base de
datos, almacenamiento,
autenticación).


Comparación
con
Arquitecturas
Tradicionales
**Tradicional Serverless**
Infraestructura
fija
Escala bajo
demanda
Costos
continuos
Pago por
ejecución
DevOps
necesarios
Menor
mantenimiento


Desafíos de
Serverless
Cold starts (retardo inicial).
Complejidad en el monitoreo.
Límite en el tiempo de
ejecución.
Vendor lock-in (dependencia
del proveedor).


Proveedores
Serverless
Populares
**AWS Lambda** (el más
utilizado).
Azure Functions.
Google Cloud Functions.
Cloudflare Workers, Netlify
Functions, Vercel.


¿Qué es AWS
Lambda?
Servicio serverless de AWS para
ejecutar código en respuesta a
eventos.
Compatible con múltiples lenguajes
(Node.js, Python, Java, Go, etc.).
No requiere administración de
servidores.


¿Cómo
Funciona?
El usuario sube el código y
define un _trigger_ (evento).
Lambda ejecuta el código
cuando ocurre el evento.
El entorno se crea y
destruye automáticamente.


Integración
con Otros
Servicios de
AWS
**API Gateway** (para exponer
endpoints).
**S3** (ejecutar funciones cuando se
suben archivos).
**DynamoDB** , **Kinesis** , **CloudWatch** ,
entre otros.


Buenas
Prácticas
Mantener funciones pequeñas y
específicas.
Evitar dependencias innecesarias.
Usar capas para compartir código
común.
Monitorizar con CloudWatch.
Diseñar para tolerar fallos.


Creación de una Función Lambda
Seleccionar el Servicio Lambra


#### Creación de una

#### Función Lambda

- * Seleccionar **Functions**
- * luego seleccionar **Create function**


### Creación de una Función Lambda


Creación de
una Función
Lambda
Seleccionar el rol del
laboratorio


Codificar un
Lambda


AWS Lambda – ¿Qué es
un Runtime?
Un _runtime_ de Lambda es el entorno de
ejecución que permite correr código en una
función Lambda.
Incluye:

- Un sistema operativo (basado en Amazon
    Linux)
- Un lenguaje de programación
- Bibliotecas nativas del lenguaje
- Mecanismos de entrada/salida


###### Tipos de Runtimes en AWS Lambda

```
Integrados (Managed Runtimes)
Proporcionados y actualizados por AWS.
Personalizados (Custom Runtimes)
Desarrollados por el usuario usando el API Runtime de Lambda.
```

# Ciclo de

# vida del

# Runtime

```
Init phase: Inicializa el
runtime y la función.
Invoke phase: Ejecuta la
función con los datos del
evento.
Shutdown phase: Cierra el
entorno (si aplica).
```

##### Lenguajes

##### Nativamente

##### Soportados

##### (Runtimes

##### administrados

##### por AWS):

```
Lenguaje Versión disponible
Node.js 18.x, 20.x
Python 3.12, 3.11, 3.10, 3.9
Java 21, 17, 11, 8
Go 1.x
.NET
6 (con soporte para 8 en
preview)
Ruby 2.7 (deprecated en 2025)
```

# Gracias


