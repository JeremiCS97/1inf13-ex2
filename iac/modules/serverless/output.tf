output "crear_cita_funcion_arn" {
  description = "ARN de la función Lambda para crear citas médicas veterinarias"
  value       = aws_lambda_function.crear_cita.arn
}

output "crear_cita_funcion_name" {
  description = "Nombre de la función Lambda para crear citas médicas veterinarias"
  value       = aws_lambda_function.crear_cita.function_name
}

output "procesar_pacientes_funcion_arn" {
  description = "ARN de la función Lambda para procesar pacientes veterinarios"
  value       = aws_lambda_function.procesar_pacientes.arn
}

output "procesar_pacientes_funcion_name" {
  description = "Nombre de la función Lambda para procesar pacientes veterinarios"
  value       = aws_lambda_function.procesar_pacientes.function_name
}
