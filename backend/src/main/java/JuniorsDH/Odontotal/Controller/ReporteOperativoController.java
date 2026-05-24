package JuniorsDH.Odontotal.Controller;

import JuniorsDH.Odontotal.Exception.DataInvalidException;
import JuniorsDH.Odontotal.Service.ReporteOperativoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/reportes")
@CrossOrigin(origins = "*")
public class ReporteOperativoController {

    private final ReporteOperativoService reporteOperativoService;

    @Autowired
    public ReporteOperativoController(ReporteOperativoService reporteOperativoService) {
        this.reporteOperativoService = reporteOperativoService;
    }

    @GetMapping("/operativo")
    public ResponseEntity<?> generarReporteOperativo(
            @RequestParam("fechaInicio") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @RequestParam("fechaFin") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin
    ) {
        try {
            return ResponseEntity.ok(reporteOperativoService.generarReporte(fechaInicio, fechaFin));
        } catch (DataInvalidException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
