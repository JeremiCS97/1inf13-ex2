resource "aws_cloudwatch_event_bus" "veterinaria_bus" {
    name = "veterinaria-bus"
    
    tags = {
      Environment = "desarrollo"
      Application = "veterinaria"
      Service     = "eventbridge"
    }
}

resource "aws_cloudwatch_event_rule" "crear_cita" {
    name           = "veterinaria-crear-cita"
    description    = "Regla para crear citas médicas veterinarias desde evento personalizado"
    event_bus_name = aws_cloudwatch_event_bus.veterinaria_bus.name
    event_pattern = jsonencode({
        source       = ["pe.com.veterinaria"],
        "detail-type": ["Nueva Cita Solicitada", "crear-cita"]
    })
    
    tags = {
      Environment = "desarrollo"
      Application = "veterinaria"
      Service     = "crear-cita"
    }
}

resource "aws_cloudwatch_event_target" "target_lambda_crear_cita" {
    rule      = aws_cloudwatch_event_rule.crear_cita.name
    target_id = "crear-cita-lambda"
    arn       = var.crear_cita_funcion_arn
    event_bus_name = aws_cloudwatch_event_bus.veterinaria_bus.name
}

resource "aws_lambda_permission" "allow_eventbridge_crear_cita" {
    statement_id  = "AllowExecutionFromEventBridgeCrearCita"
    action        = "lambda:InvokeFunction"
    function_name = var.crear_cita_funcion_name
    principal     = "events.amazonaws.com"
    source_arn    = aws_cloudwatch_event_rule.crear_cita.arn
}

resource "aws_cloudwatch_event_rule" "procesar_pacientes" {
    name           = "veterinaria-procesar-pacientes"
    description    = "Regla para procesar pacientes veterinarios desde evento personalizado"
    event_bus_name = aws_cloudwatch_event_bus.veterinaria_bus.name
    event_pattern = jsonencode({
        source       = ["pe.com.veterinaria"],
        "detail-type": ["Procesar Paciente", "procesar-pacientes"]
    })
    
    tags = {
      Environment = "desarrollo"
      Application = "veterinaria"
      Service     = "procesar-pacientes"
    }
}

resource "aws_cloudwatch_event_target" "target_lambda_procesar_pacientes" {
    rule      = aws_cloudwatch_event_rule.procesar_pacientes.name
    target_id = "procesar-pacientes-lambda"
    arn       = var.procesar_pacientes_funcion_arn
    event_bus_name = aws_cloudwatch_event_bus.veterinaria_bus.name
}

resource "aws_lambda_permission" "allow_eventbridge_procesar_pacientes" {
    statement_id  = "AllowExecutionFromEventBridgeProcesarPacientes"
    action        = "lambda:InvokeFunction"
    function_name = var.procesar_pacientes_funcion_name
    principal     = "events.amazonaws.com"
    source_arn    = aws_cloudwatch_event_rule.procesar_pacientes.arn
}