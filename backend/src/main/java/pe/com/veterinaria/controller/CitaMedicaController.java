package pe.com.veterinaria.controller;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import pe.com.veterinaria.modelo.CitaMedica;
import pe.com.veterinaria.service.CitaMedicaService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/citas")
public class CitaMedicaController {
    private final CitaMedicaService citaMedicaService;

    public CitaMedicaController(CitaMedicaService citaMedicaService) {
        this.citaMedicaService = citaMedicaService;
    }

    @GetMapping
    public List<CitaMedica> listarTodos() {
        return citaMedicaService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CitaMedica> obtenerPorId(@PathVariable Long id) {
        return citaMedicaService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public CitaMedica crear(@RequestBody CitaMedica citaMedica) {
        return citaMedicaService.guardar(citaMedica);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CitaMedica> actualizar(@PathVariable Long id, @RequestBody CitaMedica citaMedica) {
        try {
            CitaMedica citaActualizada = citaMedicaService.actualizar(id, citaMedica);
            return ResponseEntity.ok(citaActualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        citaMedicaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/paciente/{pacienteId}")
    public List<CitaMedica> listarPorPaciente(@PathVariable Long pacienteId) {
        return citaMedicaService.listarPorPacienteId(pacienteId);
    }

    @GetMapping("/medico/{medicoId}")
    public List<CitaMedica> listarPorMedico(@PathVariable Long medicoId) {
        return citaMedicaService.listarPorMedicoId(medicoId);
    }

    @GetMapping("/fecha/{fecha}")
    public List<CitaMedica> listarPorFecha(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        return citaMedicaService.listarPorFecha(fecha);
    }

    @GetMapping("/fechas")
    public List<CitaMedica> listarPorRangoFechas(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fin) {
        return citaMedicaService.listarPorRangoFechas(inicio, fin);
    }

    @GetMapping("/futuras")
    public List<CitaMedica> listarCitasFuturas() {
        return citaMedicaService.listarCitasFuturas();
    }

    @GetMapping("/pasadas")
    public List<CitaMedica> listarCitasPasadas() {
        return citaMedicaService.listarCitasPasadas();
    }

    @GetMapping("/buscar")
    public List<CitaMedica> buscarPorMotivo(@RequestParam String motivo) {
        return citaMedicaService.buscarPorMotivo(motivo);
    }
}
