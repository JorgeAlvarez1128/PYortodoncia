package JuniorsDH.Odontotal.Controller;

import JuniorsDH.Odontotal.Dto.InsumoDto;
import JuniorsDH.Odontotal.Dto.MovimientoInsumoDto;
import JuniorsDH.Odontotal.Exception.DataInvalidException;
import JuniorsDH.Odontotal.Exception.ResourceNotFoundException;
import JuniorsDH.Odontotal.Service.InsumoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/insumos")
@CrossOrigin(origins = "*")
public class InsumoController {

    private final InsumoService insumoService;

    @Autowired
    public InsumoController(InsumoService insumoService) {
        this.insumoService = insumoService;
    }

    @PostMapping
    public ResponseEntity<?> agregarInsumo(@RequestBody InsumoDto insumoDto) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(insumoService.agregarInsumo(insumoDto));
        } catch (DataInvalidException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> listarInsumos() {
        return ResponseEntity.ok(insumoService.listarInsumos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarInsumo(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(insumoService.buscarInsumo(id));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<?> actualizarInsumo(@RequestBody InsumoDto insumoDto) {
        try {
            return ResponseEntity.ok(insumoService.actualizarInsumo(insumoDto));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (DataInvalidException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}/entrada")
    public ResponseEntity<?> registrarEntrada(@PathVariable Long id, @RequestBody MovimientoInsumoDto movimiento) {
        try {
            return ResponseEntity.ok(insumoService.registrarEntrada(id, movimiento.getCantidad()));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}/salida")
    public ResponseEntity<?> registrarSalida(@PathVariable Long id, @RequestBody MovimientoInsumoDto movimiento) {
        try {
            return ResponseEntity.ok(insumoService.registrarSalida(id, movimiento.getCantidad()));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> inactivarInsumo(@PathVariable Long id) {
        try {
            insumoService.inactivarInsumo(id);
            return ResponseEntity.ok("Insumo inactivado correctamente");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}