import { handler } from '../src/index';
import { EventBridgeEvent } from 'aws-lambda';

// Mock fetch global
global.fetch = jest.fn();

describe('Crear Cita Lambda Handler', () => {
  const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
  
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.URL_BASE_SERVICIO = 'http://localhost:8080';
  });

  afterEach(() => {
    delete process.env.URL_BASE_SERVICIO;
  });

  const createMockEvent = (detail: any): EventBridgeEvent<string, any> => ({
    version: '0',
    id: 'test-id',
    'detail-type': 'Nueva Cita Solicitada',
    source: 'veterinaria.sistema',
    account: '123456789012',
    time: '2025-07-11T10:00:00Z',
    region: 'us-east-1',
    resources: [],
    detail
  });

  test('debe crear una cita médica exitosamente', async () => {
    const mockResponse = {
      id: 123,
      paciente: { id: 1, nombre: 'Firulais', especie: 'Perro', raza: 'Golden' },
      medico: { id: 2, nombre: 'Dr. García', especialidad: 'General' },
      motivo: 'Consulta general',
      fecha: '2025-07-15'
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const event = createMockEvent({
      pacienteId: 1,
      medicoId: 2,
      motivo: 'Consulta general',
      fecha: '2025-07-15'
    });

    await expect(handler(event)).resolves.toBeUndefined();

    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/citas',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paciente: { id: 1 },
          medico: { id: 2 },
          motivo: 'Consulta general',
          fecha: '2025-07-15'
        }),
      }
    );
  });

  test('debe fallar si URL_BASE_SERVICIO no está definida', async () => {
    delete process.env.URL_BASE_SERVICIO;
    
    const event = createMockEvent({
      pacienteId: 1,
      medicoId: 2,
      motivo: 'Consulta',
      fecha: '2025-07-15'
    });

    await expect(handler(event)).resolves.toBeUndefined();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  test('debe fallar si faltan datos requeridos', async () => {
    const event = createMockEvent({
      pacienteId: 1,
      // medicoId faltante
      motivo: 'Consulta',
      fecha: '2025-07-15'
    });

    await expect(handler(event)).resolves.toBeUndefined();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  test('debe manejar errores HTTP del backend', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
    } as Response);

    const event = createMockEvent({
      pacienteId: 1,
      medicoId: 2,
      motivo: 'Consulta general',
      fecha: '2025-07-15'
    });

    await expect(handler(event)).rejects.toThrow('Error HTTP: 400 - Bad Request');
  });

  test('debe manejar errores de red', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const event = createMockEvent({
      pacienteId: 1,
      medicoId: 2,
      motivo: 'Consulta general',
      fecha: '2025-07-15'
    });

    await expect(handler(event)).rejects.toThrow('Network error');
  });
});
