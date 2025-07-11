package pe.com.veterinaria.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import pe.com.veterinaria.modelo.CitaMedica;
import pe.com.veterinaria.repositorio.CitaMedicaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class CitaMedicaService {

    private final CitaMedicaRepository citaMedicaRepository;

    public CitaMedicaService(CitaMedicaRepository citaMedicaRepository) {
        this.citaMedicaRepository = citaMedicaRepository;
    }

    public List<CitaMedica> listarTodos() {
        return citaMedicaRepository.findAll();
    }

    public Optional<CitaMedica> obtenerPorId(Long id) {
        return citaMedicaRepository.findById(id);
    }

    public CitaMedica guardar(CitaMedica citaMedica) {
        return citaMedicaRepository.save(citaMedica);
    }

    public void eliminar(Long id) {
        citaMedicaRepository.deleteById(id);
    }

    public List<CitaMedica> listarPorPacienteId(Long pacienteId) {
        return citaMedicaRepository.findByPacienteId(pacienteId);
    }

    public List<CitaMedica> listarPorMedicoId(Long medicoId) {
        return citaMedicaRepository.findByMedicoId(medicoId);
    }

    public List<CitaMedica> listarPorFecha(LocalDate fecha) {
        return citaMedicaRepository.findByFecha(fecha);
    }

    public List<CitaMedica> listarPorRangoFechas(LocalDate fechaInicio, LocalDate fechaFin) {
        return citaMedicaRepository.findByFechaBetween(fechaInicio, fechaFin);
    }

    public List<CitaMedica> listarCitasFuturas() {
        return citaMedicaRepository.findByFechaAfter(LocalDate.now());
    }

    public List<CitaMedica> listarCitasPasadas() {
        return citaMedicaRepository.findByFechaBefore(LocalDate.now());
    }

    public List<CitaMedica> buscarPorMotivo(String motivo) {
        return citaMedicaRepository.findByMotivoContainingIgnoreCase(motivo);
    }

    @Transactional
    public CitaMedica actualizar(Long id, CitaMedica citaMedicaActualizada) {
        return citaMedicaRepository.findById(id).map(citaExistente -> {
            citaExistente.setPaciente(citaMedicaActualizada.getPaciente());
            citaExistente.setMedico(citaMedicaActualizada.getMedico());
            citaExistente.setMotivo(citaMedicaActualizada.getMotivo());
            citaExistente.setFecha(citaMedicaActualizada.getFecha());
            return citaMedicaRepository.save(citaExistente);
        }).orElseThrow(() -> new RuntimeException("Cita médica no encontrada con id " + id));
    }
}
