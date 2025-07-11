package pe.com.veterinaria.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pe.com.veterinaria.modelo.CitaMedica;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CitaMedicaRepository extends JpaRepository<CitaMedica, Long> {
    
    // Spring Data JPA automatically generates queries based on method names
    List<CitaMedica> findByPacienteId(Long pacienteId);
    
    List<CitaMedica> findByMedicoId(Long medicoId);
    
    List<CitaMedica> findByFecha(LocalDate fecha);
    
    List<CitaMedica> findByFechaBetween(LocalDate fechaInicio, LocalDate fechaFin);
    
    // Additional derived query methods
    List<CitaMedica> findByFechaAfter(LocalDate fecha);
    
    List<CitaMedica> findByFechaBefore(LocalDate fecha);
    
    List<CitaMedica> findByMotivoContainingIgnoreCase(String motivo);
    
    List<CitaMedica> findByPacienteIdAndFecha(Long pacienteId, LocalDate fecha);
    
    List<CitaMedica> findByMedicoIdAndFechaBetween(Long medicoId, LocalDate fechaInicio, LocalDate fechaFin);
}
