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
exports.handler = void 0;
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
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
        const response = yield fetch(`${baseUrl}/api/citas`, {
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
        const citaCreada = yield response.json();
        console.log('Cita médica creada exitosamente:', {
            id: citaCreada.id,
            paciente: ((_a = citaCreada.paciente) === null || _a === void 0 ? void 0 : _a.nombre) || 'N/A',
            medico: ((_b = citaCreada.medico) === null || _b === void 0 ? void 0 : _b.nombre) || 'N/A',
            fecha: citaCreada.fecha,
            motivo: citaCreada.motivo
        });
        // Opcional: Enviar notificación o evento de confirmación
        console.log(`✅ Cita médica #${citaCreada.id} programada para ${citaCreada.fecha}`);
    }
    catch (error) {
        console.error('❌ Error al crear la cita médica:', error);
        // En un escenario real, podrías enviar el evento a una DLQ (Dead Letter Queue)
        // o implementar un mecanismo de reintento
        throw error;
    }
});
exports.handler = handler;
