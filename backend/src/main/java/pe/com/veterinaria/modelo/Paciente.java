package pe.com.veterinaria.modelo;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "paciente")
@Data
public class Paciente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "idTutor")
    @JsonBackReference("tutor-paciente")
    private Tutor tutor;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "especie")
    private String especie;

    @Column(name = "raza")
    private String raza;

    @Column(name = "edad")
    private Integer edad;

    @Column(name = "estado")
    private String estado;

    @OneToMany(mappedBy = "paciente", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<CitaMedica> citasMedicas;
}
