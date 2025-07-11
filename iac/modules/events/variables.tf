variable "crear_cita_funcion_arn" {
    description = "ARN de la función Lambda para crear citas médicas veterinarias"
    type        = string
}

variable "crear_cita_funcion_name" {
    description = "Nombre de la función Lambda para crear citas médicas veterinarias"
    type        = string
}

variable "procesar_pacientes_funcion_arn" {
    description = "ARN de la función Lambda para procesar pacientes veterinarios"
    type        = string
}

variable "procesar_pacientes_funcion_name" {
    description = "Nombre de la función Lambda para procesar pacientes veterinarios"
    type        = string
}