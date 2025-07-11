package pe.com.veterinaria.modelo;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "citamedica")
@Data
public class CitaMedica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "idPaciente")
    @JsonBackReference
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "idMedico")
    @JsonBackReference
    private Medico medico;

    @Column(name = "motivo")
    private String motivo;

    @Column(name = "fecha")
    private LocalDate fecha;
}
