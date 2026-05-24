package JuniorsDH.Odontotal.Dto;

import java.time.LocalDateTime;

public class ConsumoInsumoDto {

    private Long id;
    private Long turnoId;
    private Long insumoId;
    private String nombreInsumo;
    private Integer cantidad;
    private String observacion;
    private LocalDateTime fechaRegistro;

    public ConsumoInsumoDto() {
    }

    public Long getId() {
        return id;
    }

    public Long getTurnoId() {
        return turnoId;
    }

    public Long getInsumoId() {
        return insumoId;
    }

    public String getNombreInsumo() {
        return nombreInsumo;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public String getObservacion() {
        return observacion;
    }

    public LocalDateTime getFechaRegistro() {
        return fechaRegistro;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTurnoId(Long turnoId) {
        this.turnoId = turnoId;
    }

    public void setInsumoId(Long insumoId) {
        this.insumoId = insumoId;
    }

    public void setNombreInsumo(String nombreInsumo) {
        this.nombreInsumo = nombreInsumo;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    public void setFechaRegistro(LocalDateTime fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }
}