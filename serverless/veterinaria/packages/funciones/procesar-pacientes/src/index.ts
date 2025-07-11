import { EventBridgeEvent } from 'aws-lambda';

interface ProcesarPacienteData {
  pacienteId: number;
  accion: 'actualizar_estado' | 'cambiar_tutor' | 'actualizar_datos' | 'dar_de_alta';
  nuevoEstado?: string;
  nuevoTutorId?: number;
  datosActualizados?: {
    nombre?: string;
    especie?: string;
    raza?: string;
    edad?: number;
  };
  observaciones?: string;
}

interface PacienteResponse {
  id: number;
  tutor: {
    id: number;
    nombre: string;
    dni: string;
  };
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
  estado: string;
}

export const handler = async (
  event: EventBridgeEvent<string, ProcesarPacienteData>
): Promise<void> => {
  const baseUrl = process.env.URL_BASE_SERVICIO;
  
  if (!baseUrl) {
    console.error('URL_BASE_SERVICIO no está definida en las variables de entorno.');
    return;
  }

  console.log('Evento para procesar paciente recibido:', JSON.stringify(event, null, 2));

  // Validar datos requeridos
  const procesarData = event.detail;
  if (!procesarData.pacienteId || !procesarData.accion) {
    console.error('Datos insuficientes para procesar el paciente:', procesarData);
    return;
  }

  try {
    // Obtener datos actuales del paciente
    const pacienteResponse = await fetch(`${baseUrl}/api/pacientes/${procesarData.pacienteId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!pacienteResponse.ok) {
      throw new Error(`Error al obtener paciente: ${pacienteResponse.status} - ${pacienteResponse.statusText}`);
    }

    const pacienteActual: PacienteResponse = await pacienteResponse.json();
    console.log('Paciente actual:', {
      id: pacienteActual.id,
      nombre: pacienteActual.nombre,
      especie: pacienteActual.especie,
      estado: pacienteActual.estado
    });

    // Preparar datos para actualización según la acción
    let datosActualizacion: Partial<PacienteResponse> = {};

    switch (procesarData.accion) {
      case 'actualizar_estado':
        if (!procesarData.nuevoEstado) {
          throw new Error('Nuevo estado es requerido para actualizar el estado del paciente');
        }
        datosActualizacion = {
          ...pacienteActual,
          estado: procesarData.nuevoEstado
        };
        break;

      case 'cambiar_tutor':
        if (!procesarData.nuevoTutorId) {
          throw new Error('Nuevo tutor ID es requerido para cambiar el tutor del paciente');
        }
        datosActualizacion = {
          ...pacienteActual,
          tutor: { id: procesarData.nuevoTutorId } as { id: number; nombre: string; dni: string; }
        };
        break;

      case 'actualizar_datos':
        if (!procesarData.datosActualizados) {
          throw new Error('Datos actualizados son requeridos para actualizar información del paciente');
        }
        datosActualizacion = {
          ...pacienteActual,
          ...procesarData.datosActualizados
        };
        break;

      case 'dar_de_alta':
        datosActualizacion = {
          ...pacienteActual,
          estado: 'Dado de alta'
        };
        break;

      default:
        throw new Error(`Acción no reconocida: ${procesarData.accion}`);
    }

    // Actualizar el paciente en el servicio backend
    const updateResponse = await fetch(`${baseUrl}/api/pacientes/${procesarData.pacienteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosActualizacion),
    });

    if (!updateResponse.ok) {
      throw new Error(`Error HTTP: ${updateResponse.status} - ${updateResponse.statusText}`);
    }

    const pacienteActualizado: PacienteResponse = await updateResponse.json();
    console.log('Paciente procesado exitosamente:', {
      id: pacienteActualizado.id,
      nombre: pacienteActualizado.nombre,
      accion: procesarData.accion,
      estadoAnterior: pacienteActual.estado,
      estadoNuevo: pacienteActualizado.estado,
      observaciones: procesarData.observaciones || 'Sin observaciones'
    });

    // Log específico por tipo de acción
    switch (procesarData.accion) {
      case 'actualizar_estado':
        console.log(`Estado del paciente ${pacienteActualizado.nombre} cambiado de "${pacienteActual.estado}" a "${pacienteActualizado.estado}"`);
        break;
      case 'cambiar_tutor':
        console.log(`Tutor del paciente ${pacienteActualizado.nombre} cambiado a ID: ${procesarData.nuevoTutorId}`);
        break;
      case 'actualizar_datos':
        console.log(`Datos del paciente ${pacienteActualizado.nombre} actualizados:`, procesarData.datosActualizados);
        break;
      case 'dar_de_alta':
        console.log(`Paciente ${pacienteActualizado.nombre} dado de alta exitosamente`);
        break;
    }
    
  } catch (error) {
    console.error('Error al procesar el paciente:', error);
    console.error('Detalles del evento:', {
      pacienteId: procesarData.pacienteId,
      accion: procesarData.accion,
      observaciones: procesarData.observaciones
    });
    
    // En un escenario real, podrías enviar el evento a una DLQ (Dead Letter Queue)
    // o implementar un mecanismo de reintento
    throw error;
  }
};
