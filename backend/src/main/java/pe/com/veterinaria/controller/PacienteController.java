package pe.com.veterinaria.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import pe.com.veterinaria.modelo.Paciente;
import pe.com.veterinaria.service.PacienteService;

import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
public class PacienteController {
    private final PacienteService pacienteService;

    public PacienteController(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }

    @GetMapping
    public List<Paciente> listarTodos() {
        return pacienteService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Paciente> obtenerPorId(@PathVariable Long id) {
        return pacienteService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Paciente crear(@RequestBody Paciente paciente) {
        return pacienteService.guardar(paciente);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Paciente> actualizar(@PathVariable Long id, @RequestBody Paciente paciente) {
        return pacienteService.obtenerPorId(id).map(p -> {
            paciente.setId(id);
            return ResponseEntity.ok(pacienteService.guardar(paciente));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        pacienteService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/tutor/{tutorId}")
    public List<Paciente> listarPorTutor(@PathVariable Long tutorId) {
        return pacienteService.listarPorTutorId(tutorId);
    }

    @GetMapping("/especie/{especie}")
    public List<Paciente> listarPorEspecie(@PathVariable String especie) {
        return pacienteService.listarPorEspecie(especie);
    }

    @GetMapping("/estado/{estado}")
    public List<Paciente> listarPorEstado(@PathVariable String estado) {
        return pacienteService.listarPorEstado(estado);
    }

    @GetMapping("/buscar")
    public List<Paciente> buscarPorNombre(@RequestParam String nombre) {
        return pacienteService.buscarPorNombre(nombre);
    }

    @GetMapping("/raza/{raza}")
    public List<Paciente> listarPorRaza(@PathVariable String raza) {
        return pacienteService.listarPorRaza(raza);
    }

    @GetMapping("/edad")
    public List<Paciente> listarPorEdad(@RequestParam Integer min, @RequestParam Integer max) {
        return pacienteService.listarPorEdad(min, max);
    }
}
