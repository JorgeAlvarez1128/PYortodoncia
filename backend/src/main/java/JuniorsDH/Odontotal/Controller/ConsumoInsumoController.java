package JuniorsDH.Odontotal.Controller;

import JuniorsDH.Odontotal.Dto.ConsumoInsumoDto;
import JuniorsDH.Odontotal.Exception.DataInvalidException;
import JuniorsDH.Odontotal.Exception.ResourceNotFoundException;
import JuniorsDH.Odontotal.Service.ConsumoInsumoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/consumos-insumos")
@CrossOrigin(origins = "*")
public class ConsumoInsumoController {

    private final ConsumoInsumoService consumoInsumoService;

    @Autowired
    public ConsumoInsumoController(ConsumoInsumoService consumoInsumoService) {
        this.consumoInsumoService = consumoInsumoService;
    }

    @PostMapping
    public ResponseEntity<?> registrarConsumo(@RequestBody ConsumoInsumoDto dto) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(consumoInsumoService.registrarConsumo(dto));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (DataInvalidException | IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> listarConsumos() {
        return ResponseEntity.ok(consumoInsumoService.listarConsumos());
    }

    @GetMapping("/turno/{turnoId}")
    public ResponseEntity<?> listarConsumosPorTurno(@PathVariable Long turnoId) {
        return ResponseEntity.ok(consumoInsumoService.listarConsumosPorTurno(turnoId));
    }
}