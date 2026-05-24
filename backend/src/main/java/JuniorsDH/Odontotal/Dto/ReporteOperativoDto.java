package JuniorsDH.Odontotal.Dto;

import java.time.LocalDate;
import java.util.List;

public class ReporteOperativoDto {

    private LocalDate fechaInicio;
    private LocalDate fechaFin;

    private Long totalTurnos;
    private Long turnosAtendidos;
    private Long turnosPendientes;
    private Long turnosCancelados;
    private Long ausencias;

    private List<ConsumoInsumoReporteDto> consumoInsumos;
    private List<ProductividadOdontologoDto> productividadOdontologos;

    public ReporteOperativoDto() {
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDate getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
    }

    public Long getTotalTurnos() {
        return totalTurnos;
    }

    public void setTotalTurnos(Long totalTurnos) {
        this.totalTurnos = totalTurnos;
    }

    public Long getTurnosAtendidos() {
        return turnosAtendidos;
    }

    public void setTurnosAtendidos(Long turnosAtendidos) {
        this.turnosAtendidos = turnosAtendidos;
    }

    public Long getTurnosPendientes() {
        return turnosPendientes;
    }

    public void setTurnosPendientes(Long turnosPendientes) {
        this.turnosPendientes = turnosPendientes;
    }

    public Long getTurnosCancelados() {
        return turnosCancelados;
    }

    public void setTurnosCancelados(Long turnosCancelados) {
        this.turnosCancelados = turnosCancelados;
    }

    public Long getAusencias() {
        return ausencias;
    }

    public void setAusencias(Long ausencias) {
        this.ausencias = ausencias;
    }

    public List<ConsumoInsumoReporteDto> getConsumoInsumos() {
        return consumoInsumos;
    }

    public void setConsumoInsumos(List<ConsumoInsumoReporteDto> consumoInsumos) {
        this.consumoInsumos = consumoInsumos;
    }

    public List<ProductividadOdontologoDto> getProductividadOdontologos() {
        return productividadOdontologos;
    }

    public void setProductividadOdontologos(List<ProductividadOdontologoDto> productividadOdontologos) {
        this.productividadOdontologos = productividadOdontologos;
    }
}
