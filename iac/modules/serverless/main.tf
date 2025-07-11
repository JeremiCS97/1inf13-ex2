data "archive_file" "archivo_crear_cita_lambda" {
  type        = "zip"
  source_dir  = "${path.root}/../serverless/veterinaria/packages/funciones/crear-cita/build"
  output_path = "${path.root}/data/crear_cita_lambda.zip"
}

resource "aws_lambda_function" "crear_cita" {
  function_name    = "veterinaria-crear-cita"
  handler          = "index.handler"
  runtime          = var.entorno_ejecucion
  role             = var.rol_lambda_arn
  filename         = data.archive_file.archivo_crear_cita_lambda.output_path
  source_code_hash = filebase64sha256(data.archive_file.archivo_crear_cita_lambda.output_path)
  timeout          = 60
  memory_size      = 512
  environment {
    variables = {
        URL_BASE_SERVICIO = var.url_base_servicio
    }
  }
  
  tags = {
    Environment = "desarrollo"
    Application = "veterinaria"
    Function    = "crear-cita"
  }
}

data "archive_file" "archivo_procesar_pacientes_lambda" {
  type        = "zip"
  source_dir  = "${path.root}/../serverless/veterinaria/packages/funciones/procesar-pacientes/build"
  output_path = "${path.root}/data/procesar_pacientes_lambda.zip"
}

resource "aws_lambda_function" "procesar_pacientes" {
  function_name    = "veterinaria-procesar-pacientes"
  handler          = "index.handler"
  runtime          = var.entorno_ejecucion
  role             = var.rol_lambda_arn
  filename         = data.archive_file.archivo_procesar_pacientes_lambda.output_path
  source_code_hash = filebase64sha256(data.archive_file.archivo_procesar_pacientes_lambda.output_path)
  timeout          = 60
  memory_size      = 512
  environment {
    variables = {
        URL_BASE_SERVICIO = var.url_base_servicio
    }
  }
  
  tags = {
    Environment = "desarrollo"
    Application = "veterinaria"
    Function    = "procesar-pacientes"
  }
}