output "api_gateway_url" {
  description = "URL del API Gateway para el sistema veterinario"
  value       = aws_apigatewayv2_api.http_api.api_endpoint
}

output "api_gateway_id" {
  description = "ID del API Gateway veterinario"
  value       = aws_apigatewayv2_api.http_api.id
}

output "api_gateway_arn" {
  description = "ARN del API Gateway veterinario"
  value       = aws_apigatewayv2_api.http_api.arn
}