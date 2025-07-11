output "cluster_name" {
  description = "Nombre del cluster ECS veterinario"
  value = aws_ecs_cluster.cluster_veterinaria_servicios.name
}

output "service_name" {
  description = "Nombre del servicio ECS veterinario"
  value = aws_ecs_service.veterinaria_servicio.name
}

output "task_definition_arn" {
  description = "ARN de la definición de tarea ECS"
  value = aws_ecs_task_definition.veterinaria_tarea.arn
}

output "load_balancer_url" {
  description = "URL pública del Load Balancer"
  value = aws_lb.veterinaria_load_balancer.dns_name
}
