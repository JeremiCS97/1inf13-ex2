import { EventBridgeEvent } from 'aws-lambda';

interface CitaMedicaData {
  pacienteId: number;
  medicoId: number;
  motivo: string;
  fecha: string; // formato ISO date: YYYY-MM-DD
}

interface CitaMedicaResponse {
  id: number;
  paciente: {
    id: number;
    nombre: string;
    especie: string;
    raza: string;
  };
  medico: {
    id: number;
    nombre: string;
    especialidad: string;
  };
  motivo: string;
  fecha: string;
}

export const handler = async (
  event: EventBridgeEvent<string, CitaMedicaData>
): Promise<void> => {
  const baseUrl = process.env.URL_BASE_SERVICIO;
  
  if (!baseUrl) {
    console.error('URL_BASE_SERVICIO no está definida en las variables de entorno.');
    return;
  }

  console.log('Evento para crear cita médica recibido:', JSON.stringify(event, null, 2));

  // Validar datos requeridos
  const citaData = event.detail;
  if (!citaData.pacienteId || !citaData.medicoId || !citaData.motivo || !citaData.fecha) {
    console.error('Datos insuficientes para crear la cita médica:', citaData);
    return;
  }

  try {
    // Crear la cita médica en el servicio backend
    const response = await fetch(`${baseUrl}/api/citas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paciente: { id: citaData.pacienteId },
        medico: { id: citaData.medicoId },
        motivo: citaData.motivo,
        fecha: citaData.fecha
      }),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }

    const citaCreada: CitaMedicaResponse = await response.json();
    console.log('Cita médica creada exitosamente:', {
      id: citaCreada.id,
      paciente: citaCreada.paciente?.nombre || 'N/A',
      medico: citaCreada.medico?.nombre || 'N/A',
      fecha: citaCreada.fecha,
      motivo: citaCreada.motivo
    });

    // Opcional: Enviar notificación o evento de confirmación
    console.log(`Cita médica #${citaCreada.id} programada para ${citaCreada.fecha}`);
    
  } catch (error) {
    console.error('Error al crear la cita médica:', error);
    
    // En un escenario real, podrías enviar el evento a una DLQ (Dead Letter Queue)
    // o implementar un mecanismo de reintento
    throw error;
  }
};
