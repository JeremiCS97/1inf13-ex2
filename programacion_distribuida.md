##### Programación

##### Distribuida en

##### AWS

Mag. Eric Raphael Huiza Pereyra



#### Amazon

#### Elastic

#### Container

#### Service

#### (ECS)

```
ECS (Elastic Container Service) es un
servicio de orquestación de contenedores
totalmente administrado por AWS.
Permite desplegar, escalar y administrar
aplicaciones en contenedores Docker de
forma segura y eficiente.
Soporta dos modos de lanzamiento: EC
(con servidores administrados por el
usuario) y Fargate (sin servidores).
```

#### Elementos

#### de ECS

```
Clúster: conjunto de recursos
donde se ejecutan tareas.
Tarea (Task): definición de uno
o varios contenedores.
Servicio: mantiene un número
deseado de tareas en
ejecución.
```

#### AWS

#### Fargate

```
Fargate permite ejecutar
contenedores sin aprovisionar ni
administrar servidores.
Cada tarea se ejecuta en un entorno
aislado y seguro.
Ideal para arquitecturas serverless y
microservicios.
```

#### AWS

#### Fargate

```
Aplicaciones con carga variable.
Despliegue continuo (CI/CD) sin
preocuparse por la infraestructura.
Aislamiento por tarea: mejora de
seguridad y confiabilidad.
```

#### Amazon

#### API

#### Gateway

```
Crea, publica y gestiona APIs a
escala para backends como
Lambda, ECS o Fargate.
Dos tipos principales: REST APIs
y HTTP APIs (más ligeras).
Gestión de tráfico, cuotas,
validación y control de acceso.
```

Creación de un
cluster ECS para la
Tienda Virtual
Para crear un cluster ECS, hay que dirigirse al servicio ECS
en la consola de AWS.


Creación de un
cluster ECS para
la Tienda Virtual
Seleccionar la opción
**Clusters** en la consola
Seleccionar
**CreateCluster**


###### Creación de un

###### cluster ECS

###### para la Tienda

###### Virtual

Ingresar un nombre
para el cluster y seleccionar AWS
Fargate para la infraestructura.


Creación de una
Definición de Tarea
Diríjase a **Tasks Definitions** para crear
una definición de tarea


Creación de una
Definición de Tarea
Seleccione **Create new task
definition**


Creación de una
Definición de
Tarea
Configuración de la tarea
(contenedor)


## Creación de una Definición de

## Tarea

Seleccionar los roles que usarán las tareas


Creación de una
Definición de Tarea
Configuración de los contenedores


#### Creación de una

#### Definición de

#### Tarea

Definir Variables de Entorno


Creación de un
Servicio en el
Cluster
Seleccionar el Cluster de
Servicios recientemente
creado y seleccionar el
**TabServices** , luego
seleccione Create.


Creación de un
Servicio en el
Cluster
Seleccionar la definición
de tarea recientemente
creada.


##### Creación de

##### un Servicio en

##### el Cluster


##### Creación de

##### un Servicio en

##### el Cluster


##### Creación de

##### un Servicio en

##### el Cluster


### Creación de un Servicio en el Cluster

Habilitar la opción de Load Balancer


### Creación

### de un

### Servicio en

### el Cluster

Habilitar el auto
escalamiento del servicio


Creación de
una HTTP API

- Dirigirse a API Gateway


Creación de
una HTTP API
Seleccionar Create API


# Creación de una HTTP API


# Creación

# de una

# HTTP API

Agregamos una integración
al Load Balancer creado. Se
coloca la URL pública del
LB


# Creación

# de una

# HTTP API


# Creación

# de una

# HTTP API


# Agregar Mapeo de Parámetros


### Agregar

### Mapeo de

### Parámetros


