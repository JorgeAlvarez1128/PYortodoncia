package JuniorsDH.Odontotal.Dto;

public class ConsumoInsumoReporteDto {

    private Long insumoId;
    private String nombreInsumo;
    private Long cantidadTotal;

    public ConsumoInsumoReporteDto() {
    }

    public ConsumoInsumoReporteDto(Long insumoId, String nombreInsumo, Long cantidadTotal) {
        this.insumoId = insumoId;
        this.nombreInsumo = nombreInsumo;
        this.cantidadTotal = cantidadTotal;
    }

    public Long getInsumoId() {
        return insumoId;
    }

    public void setInsumoId(Long insumoId) {
        this.insumoId = insumoId;
    }

    public String getNombreInsumo() {
        return nombreInsumo;
    }

    public void setNombreInsumo(String nombreInsumo) {
        this.nombreInsumo = nombreInsumo;
    }

    public Long getCantidadTotal() {
        return cantidadTotal;
    }

    public void setCantidadTotal(Long cantidadTotal) {
        this.cantidadTotal = cantidadTotal;
    }
}