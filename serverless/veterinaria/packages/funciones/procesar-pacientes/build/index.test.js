"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
// Mock fetch global
global.fetch = jest.fn();
describe('Procesar Pacientes Lambda Handler', () => {
    const mockFetch = fetch;
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.URL_BASE_SERVICIO = 'http://localhost:8080';
    });
    afterEach(() => {
        delete process.env.URL_BASE_SERVICIO;
    });
    const createMockEvent = (detail) => ({
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
    test('debe actualizar estado del paciente exitosamente', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock GET para obtener paciente actual
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => __awaiter(void 0, void 0, void 0, function* () { return mockPacienteResponse; }),
        });
        // Mock PUT para actualizar paciente
        const pacienteActualizado = Object.assign(Object.assign({}, mockPacienteResponse), { estado: 'En tratamiento' });
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => __awaiter(void 0, void 0, void 0, function* () { return pacienteActualizado; }),
        });
        const event = createMockEvent({
            pacienteId: 1,
            accion: 'actualizar_estado',
            nuevoEstado: 'En tratamiento',
            observaciones: 'Iniciando tratamiento'
        });
        yield expect((0, index_1.handler)(event)).resolves.toBeUndefined();
        expect(mockFetch).toHaveBeenCalledTimes(2);
        expect(mockFetch).toHaveBeenNthCalledWith(1, 'http://localhost:8080/api/pacientes/1', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        expect(mockFetch).toHaveBeenNthCalledWith(2, 'http://localhost:8080/api/pacientes/1', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.assign(Object.assign({}, mockPacienteResponse), { estado: 'En tratamiento' }))
        });
    }));
    test('debe cambiar tutor del paciente exitosamente', () => __awaiter(void 0, void 0, void 0, function* () {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => __awaiter(void 0, void 0, void 0, function* () { return mockPacienteResponse; }),
        });
        const pacienteActualizado = Object.assign(Object.assign({}, mockPacienteResponse), { tutor: { id: 2 } });
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => __awaiter(void 0, void 0, void 0, function* () { return pacienteActualizado; }),
        });
        const event = createMockEvent({
            pacienteId: 1,
            accion: 'cambiar_tutor',
            nuevoTutorId: 2
        });
        yield expect((0, index_1.handler)(event)).resolves.toBeUndefined();
        expect(mockFetch).toHaveBeenCalledTimes(2);
        expect(mockFetch).toHaveBeenNthCalledWith(2, 'http://localhost:8080/api/pacientes/1', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.assign(Object.assign({}, mockPacienteResponse), { tutor: { id: 2 } }))
        });
    }));
    test('debe actualizar datos del paciente exitosamente', () => __awaiter(void 0, void 0, void 0, function* () {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => __awaiter(void 0, void 0, void 0, function* () { return mockPacienteResponse; }),
        });
        const datosActualizados = { nombre: 'Firulais Jr.', edad: 4 };
        const pacienteActualizado = Object.assign(Object.assign({}, mockPacienteResponse), datosActualizados);
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => __awaiter(void 0, void 0, void 0, function* () { return pacienteActualizado; }),
        });
        const event = createMockEvent({
            pacienteId: 1,
            accion: 'actualizar_datos',
            datosActualizados
        });
        yield expect((0, index_1.handler)(event)).resolves.toBeUndefined();
        expect(mockFetch).toHaveBeenNthCalledWith(2, 'http://localhost:8080/api/pacientes/1', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pacienteActualizado)
        });
    }));
    test('debe dar de alta al paciente exitosamente', () => __awaiter(void 0, void 0, void 0, function* () {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => __awaiter(void 0, void 0, void 0, function* () { return mockPacienteResponse; }),
        });
        const pacienteActualizado = Object.assign(Object.assign({}, mockPacienteResponse), { estado: 'Dado de alta' });
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => __awaiter(void 0, void 0, void 0, function* () { return pacienteActualizado; }),
        });
        const event = createMockEvent({
            pacienteId: 1,
            accion: 'dar_de_alta'
        });
        yield expect((0, index_1.handler)(event)).resolves.toBeUndefined();
        expect(mockFetch).toHaveBeenNthCalledWith(2, 'http://localhost:8080/api/pacientes/1', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pacienteActualizado)
        });
    }));
    test('debe fallar si URL_BASE_SERVICIO no está definida', () => __awaiter(void 0, void 0, void 0, function* () {
        delete process.env.URL_BASE_SERVICIO;
        const event = createMockEvent({
            pacienteId: 1,
            accion: 'actualizar_estado',
            nuevoEstado: 'En tratamiento'
        });
        yield expect((0, index_1.handler)(event)).resolves.toBeUndefined();
        expect(mockFetch).not.toHaveBeenCalled();
    }));
    test('debe fallar si faltan datos requeridos', () => __awaiter(void 0, void 0, void 0, function* () {
        const event = createMockEvent({
            pacienteId: 1,
            // accion faltante
        });
        yield expect((0, index_1.handler)(event)).resolves.toBeUndefined();
        expect(mockFetch).not.toHaveBeenCalled();
    }));
    test('debe fallar si la acción requiere datos adicionales', () => __awaiter(void 0, void 0, void 0, function* () {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => __awaiter(void 0, void 0, void 0, function* () { return mockPacienteResponse; }),
        });
        const event = createMockEvent({
            pacienteId: 1,
            accion: 'actualizar_estado'
            // nuevoEstado faltante
        });
        yield expect((0, index_1.handler)(event)).rejects.toThrow('Nuevo estado es requerido');
    }));
    test('debe manejar acción no reconocida', () => __awaiter(void 0, void 0, void 0, function* () {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => __awaiter(void 0, void 0, void 0, function* () { return mockPacienteResponse; }),
        });
        const event = createMockEvent({
            pacienteId: 1,
            accion: 'accion_invalida'
        });
        yield expect((0, index_1.handler)(event)).rejects.toThrow('Acción no reconocida: accion_invalida');
    }));
    test('debe manejar errores HTTP al obtener paciente', () => __awaiter(void 0, void 0, void 0, function* () {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 404,
            statusText: 'Not Found',
        });
        const event = createMockEvent({
            pacienteId: 999,
            accion: 'actualizar_estado',
            nuevoEstado: 'En tratamiento'
        });
        yield expect((0, index_1.handler)(event)).rejects.toThrow('Error al obtener paciente: 404 - Not Found');
    }));
    test('debe manejar errores HTTP al actualizar paciente', () => __awaiter(void 0, void 0, void 0, function* () {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => __awaiter(void 0, void 0, void 0, function* () { return mockPacienteResponse; }),
        });
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 400,
            statusText: 'Bad Request',
        });
        const event = createMockEvent({
            pacienteId: 1,
            accion: 'actualizar_estado',
            nuevoEstado: 'En tratamiento'
        });
        yield expect((0, index_1.handler)(event)).rejects.toThrow('Error HTTP: 400 - Bad Request');
    }));
});
