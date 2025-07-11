package pe.com.veterinaria.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import pe.com.veterinaria.modelo.Tutor;
import pe.com.veterinaria.service.TutorService;

import java.util.List;

@RestController
@RequestMapping("/api/tutores")
public class TutorController {
    private final TutorService tutorService;

    public TutorController(TutorService tutorService) {
        this.tutorService = tutorService;
    }

    @GetMapping
    public List<Tutor> listarTodos() {
        return tutorService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tutor> obtenerPorId(@PathVariable Long id) {
        return tutorService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Tutor crear(@RequestBody Tutor tutor) {
        return tutorService.guardar(tutor);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tutor> actualizar(@PathVariable Long id, @RequestBody Tutor tutor) {
        return tutorService.obtenerPorId(id).map(t -> {
            tutor.setId(id);
            return ResponseEntity.ok(tutorService.guardar(tutor));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        tutorService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/dni/{dni}")
    public ResponseEntity<Tutor> obtenerPorDni(@PathVariable String dni) {
        return tutorService.obtenerPorDni(dni)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
