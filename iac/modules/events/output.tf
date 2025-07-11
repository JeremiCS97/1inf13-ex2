output "event_bus_name" {
    description = "Nombre del bus de eventos veterinario donde se publicarán los eventos"
    value       = aws_cloudwatch_event_bus.veterinaria_bus.name
}

output "veterinaria_bus_arn" {
    description = "ARN del bus de eventos veterinario"
    value       = aws_cloudwatch_event_bus.veterinaria_bus.arn
}
