package pe.com.veterinaria.service;

import org.springframework.stereotype.Service;

import pe.com.veterinaria.modelo.Paciente;
import pe.com.veterinaria.repositorio.PacienteRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {

    private final PacienteRepository pacienteRepository;

    public PacienteService(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    public List<Paciente> listarTodos() {
        return pacienteRepository.findAll();
    }

    public Optional<Paciente> obtenerPorId(Long id) {
        return pacienteRepository.findById(id);
    }

    public Paciente guardar(Paciente paciente) {
        return pacienteRepository.save(paciente);
    }

    public void eliminar(Long id) {
        pacienteRepository.deleteById(id);
    }

    public List<Paciente> listarPorTutorId(Long tutorId) {
        return pacienteRepository.findByTutorId(tutorId);
    }

    public List<Paciente> listarPorEspecie(String especie) {
        return pacienteRepository.findByEspecie(especie);
    }

    public List<Paciente> listarPorEstado(String estado) {
        return pacienteRepository.findByEstado(estado);
    }

    public List<Paciente> buscarPorNombre(String nombre) {
        return pacienteRepository.findByNombreContainingIgnoreCase(nombre);
    }

    public List<Paciente> listarPorRaza(String raza) {
        return pacienteRepository.findByRaza(raza);
    }

    public List<Paciente> listarPorEdad(Integer edadMin, Integer edadMax) {
        return pacienteRepository.findByEdadBetween(edadMin, edadMax);
    }
}
