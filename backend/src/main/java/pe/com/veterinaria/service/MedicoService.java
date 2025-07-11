package pe.com.veterinaria.service;

import org.springframework.stereotype.Service;

import pe.com.veterinaria.modelo.Medico;
import pe.com.veterinaria.repositorio.MedicoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class MedicoService {

    private final MedicoRepository medicoRepository;

    public MedicoService(MedicoRepository medicoRepository) {
        this.medicoRepository = medicoRepository;
    }

    public List<Medico> listarTodos() {
        return medicoRepository.findAll();
    }

    public Optional<Medico> obtenerPorId(Long id) {
        return medicoRepository.findById(id);
    }

    public Medico guardar(Medico medico) {
        return medicoRepository.save(medico);
    }

    public void eliminar(Long id) {
        medicoRepository.deleteById(id);
    }

    public Optional<Medico> obtenerPorDni(String dni) {
        return Optional.ofNullable(medicoRepository.findByDni(dni));
    }
}
