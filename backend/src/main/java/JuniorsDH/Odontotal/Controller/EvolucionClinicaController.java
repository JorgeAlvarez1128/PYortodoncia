package JuniorsDH.Odontotal.Controller;

import JuniorsDH.Odontotal.Dto.EvolucionClinicaDto;
import JuniorsDH.Odontotal.Exception.DataInvalidException;
import JuniorsDH.Odontotal.Exception.ResourceNotFoundException;
import JuniorsDH.Odontotal.Service.EvolucionClinicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/evoluciones-clinicas")
@CrossOrigin(origins = "*")
public class EvolucionClinicaController {

    private final EvolucionClinicaService evolucionClinicaService;

    @Autowired
    public EvolucionClinicaController(EvolucionClinicaService evolucionClinicaService) {
        this.evolucionClinicaService = evolucionClinicaService;
    }

    @PostMapping
    public ResponseEntity<?> registrarEvolucion(@RequestBody EvolucionClinicaDto dto) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(evolucionClinicaService.registrarEvolucion(dto));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (DataInvalidException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> listarEvoluciones() {
        return ResponseEntity.ok(evolucionClinicaService.listarEvoluciones());
    }

    @GetMapping("/paciente/{pacienteId}")
    public ResponseEntity<?> listarPorPaciente(@PathVariable Long pacienteId) {
        return ResponseEntity.ok(evolucionClinicaService.listarPorPaciente(pacienteId));
    }

    @GetMapping("/turno/{turnoId}")
    public ResponseEntity<?> listarPorTurno(@PathVariable Long turnoId) {
        return ResponseEntity.ok(evolucionClinicaService.listarPorTurno(turnoId));
    }
}