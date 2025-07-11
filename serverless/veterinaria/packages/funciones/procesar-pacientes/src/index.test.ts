import { handler } from '../src/index';
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

// Mock fetch global
global.fetch = jest.fn();

describe('Procesar Pacientes Lambda Handler', () => {
  const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
  
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.URL_BASE_SERVICIO = 'http://localhost:8080';
  });

  afterEach(() => {
    delete process.env.URL_BASE_SERVICIO;
  });

  const createMockEvent = (detail: ProcesarPacienteData): EventBridgeEvent<string, ProcesarPacienteData> => ({
    version: '0',
    id: 'test-id',
    'detail-type': 'Procesar Paciente',
    source: 'pe.com.veterinaria',
    account: '123456789012',
    time: '2025-07-11T10:00:00Z',
    region: 'us-east-1',
    resources: [],
    detail
  });

  const mockPacienteResponse = {
    id: 1,
    tutor: { id: 1, nombre: 'Juan Pérez', dni: '12345678' },
    nombre: 'Firulais',
    especie: 'Perro',
    raza: 'Golden Retriever',
    edad: 3,
    estado: 'Activo'
  };

  test('debe actualizar estado del paciente exitosamente', async () => {
    // Mock GET para obtener paciente actual
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPacienteResponse,
    } as Response);

    // Mock PUT para actualizar paciente
    const pacienteActualizado = { ...mockPacienteResponse, estado: 'En tratamiento' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => pacienteActualizado,
    } as Response);

    const event = createMockEvent({
      pacienteId: 1,
      accion: 'actualizar_estado',
      nuevoEstado: 'En tratamiento',
      observaciones: 'Iniciando tratamiento'
    });

    await expect(handler(event)).resolves.toBeUndefined();

    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(mockFetch).toHaveBeenNthCalledWith(1, 'http://localhost:8080/api/pacientes/1', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    expect(mockFetch).toHaveBeenNthCalledWith(2, 'http://localhost:8080/api/pacientes/1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...mockPacienteResponse, estado: 'En tratamiento' })
    });
  });

  test('debe cambiar tutor del paciente exitosamente', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPacienteResponse,
    } as Response);

    const pacienteActualizado = { ...mockPacienteResponse, tutor: { id: 2 } };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => pacienteActualizado,
    } as Response);

    const event = createMockEvent({
      pacienteId: 1,
      accion: 'cambiar_tutor',
      nuevoTutorId: 2
    });

    await expect(handler(event)).resolves.toBeUndefined();

    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(mockFetch).toHaveBeenNthCalledWith(2, 'http://localhost:8080/api/pacientes/1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...mockPacienteResponse, tutor: { id: 2 } })
    });
  });

  test('debe actualizar datos del paciente exitosamente', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPacienteResponse,
    } as Response);

    const datosActualizados = { nombre: 'Firulais Jr.', edad: 4 };
    const pacienteActualizado = { ...mockPacienteResponse, ...datosActualizados };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => pacienteActualizado,
    } as Response);

    const event = createMockEvent({
      pacienteId: 1,
      accion: 'actualizar_datos',
      datosActualizados
    });

    await expect(handler(event)).resolves.toBeUndefined();

    expect(mockFetch).toHaveBeenNthCalledWith(2, 'http://localhost:8080/api/pacientes/1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pacienteActualizado)
    });
  });

  test('debe dar de alta al paciente exitosamente', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPacienteResponse,
    } as Response);

    const pacienteActualizado = { ...mockPacienteResponse, estado: 'Dado de alta' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => pacienteActualizado,
    } as Response);

    const event = createMockEvent({
      pacienteId: 1,
      accion: 'dar_de_alta'
    });

    await expect(handler(event)).resolves.toBeUndefined();

    expect(mockFetch).toHaveBeenNthCalledWith(2, 'http://localhost:8080/api/pacientes/1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pacienteActualizado)
    });
  });

  test('debe fallar si URL_BASE_SERVICIO no está definida', async () => {
    delete process.env.URL_BASE_SERVICIO;
    
    const event = createMockEvent({
      pacienteId: 1,
      accion: 'actualizar_estado',
      nuevoEstado: 'En tratamiento'
    });

    await expect(handler(event)).resolves.toBeUndefined();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  test('debe fallar si faltan datos requeridos', async () => {
    // Simular evento con datos faltantes usando any
    const event = {
      version: '0',
      id: 'test-id',
      'detail-type': 'Procesar Paciente',
      source: 'pe.com.veterinaria',
      account: '123456789012',
      time: '2025-07-11T10:00:00Z',
      region: 'us-east-1',
      resources: [],
      detail: {
        pacienteId: 1
        // accion faltante
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    await expect(handler(event)).resolves.toBeUndefined();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  test('debe fallar si la acción requiere datos adicionales', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPacienteResponse,
    } as Response);

    const event = createMockEvent({
      pacienteId: 1,
      accion: 'actualizar_estado'
      // nuevoEstado faltante
    });

    await expect(handler(event)).rejects.toThrow('Nuevo estado es requerido');
  });

  test('debe manejar acción no reconocida', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPacienteResponse,
    } as Response);

    const event = createMockEvent({
      pacienteId: 1,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      accion: 'accion_invalida' as any
    });

    await expect(handler(event)).rejects.toThrow('Acción no reconocida: accion_invalida');
  });

  test('debe manejar errores HTTP al obtener paciente', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    } as Response);

    const event = createMockEvent({
      pacienteId: 999,
      accion: 'actualizar_estado',
      nuevoEstado: 'En tratamiento'
    });

    await expect(handler(event)).rejects.toThrow('Error al obtener paciente: 404 - Not Found');
  });

  test('debe manejar errores HTTP al actualizar paciente', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPacienteResponse,
    } as Response);

    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
    } as Response);

    const event = createMockEvent({
      pacienteId: 1,
      accion: 'actualizar_estado',
      nuevoEstado: 'En tratamiento'
    });

    await expect(handler(event)).rejects.toThrow('Error HTTP: 400 - Bad Request');
  });
});
