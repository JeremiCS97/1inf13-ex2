package pe.com.veterinaria.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import pe.com.veterinaria.modelo.Medico;
import pe.com.veterinaria.service.MedicoService;

import java.util.List;

@RestController
@RequestMapping("/api/medicos")
public class MedicoController {
    private final MedicoService medicoService;

    public MedicoController(MedicoService medicoService) {
        this.medicoService = medicoService;
    }

    @GetMapping
    public List<Medico> listarTodos() {
        return medicoService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medico> obtenerPorId(@PathVariable Long id) {
        return medicoService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Medico crear(@RequestBody Medico medico) {
        return medicoService.guardar(medico);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Medico> actualizar(@PathVariable Long id, @RequestBody Medico medico) {
        return medicoService.obtenerPorId(id).map(m -> {
            medico.setId(id);
            return ResponseEntity.ok(medicoService.guardar(medico));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        medicoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/dni/{dni}")
    public ResponseEntity<Medico> obtenerPorDni(@PathVariable String dni) {
        return medicoService.obtenerPorDni(dni)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
