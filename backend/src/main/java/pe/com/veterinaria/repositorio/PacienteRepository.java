package pe.com.veterinaria.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pe.com.veterinaria.modelo.Paciente;

import java.util.List;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    
    // Spring Data JPA automatically generates the query based on method name
    List<Paciente> findByTutorId(Long tutorId);
    
    List<Paciente> findByEspecie(String especie);
    
    List<Paciente> findByEstado(String estado);
    
    // Additional derived query methods
    List<Paciente> findByNombreContainingIgnoreCase(String nombre);
    
    List<Paciente> findByRaza(String raza);
    
    List<Paciente> findByEdadBetween(Integer edadMin, Integer edadMax);
    
    List<Paciente> findByTutorIdAndEstado(Long tutorId, String estado);
}
