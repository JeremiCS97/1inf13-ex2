# Outputs principales de la infraestructura veterinaria

output "veterinaria_api_url" {
  description = "URL del API Gateway para el sistema veterinario"
  value       = module.api.api_gateway_url
}

output "load_balancer_url" {
  description = "URL del Application Load Balancer para el backend veterinario"
  value       = "http://${module.compute.load_balancer_url}"
}

output "crear_cita_lambda_arn" {
  description = "ARN de la función Lambda para crear citas médicas"
  value       = module.serverless.crear_cita_funcion_arn
}

output "procesar_pacientes_lambda_arn" {
  description = "ARN de la función Lambda para procesar pacientes"
  value       = module.serverless.procesar_pacientes_funcion_arn
}

output "veterinaria_event_bus" {
  description = "Nombre del bus de eventos EventBridge para el sistema veterinario"
  value       = module.events.event_bus_name
}

output "veterinaria_event_bus_arn" {
  description = "ARN del bus de eventos EventBridge para el sistema veterinario"
  value       = module.events.veterinaria_bus_arn
}

output "cluster_ecs_name" {
  description = "Nombre del cluster ECS donde se ejecuta la aplicación veterinaria"
  value       = module.compute.cluster_name
}

output "service_ecs_name" {
  description = "Nombre del servicio ECS de la aplicación veterinaria"
  value       = module.compute.service_name
}
