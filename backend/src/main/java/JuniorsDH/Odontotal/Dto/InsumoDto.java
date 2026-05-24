package JuniorsDH.Odontotal.Dto;

public class InsumoDto {

    private Long id;
    private String nombre;
    private String categoria;
    private String unidadMedida;
    private Integer stockActual;
    private Integer stockMinimo;
    private Boolean activo;
    private Boolean alertaStockMinimo;

    public InsumoDto() {
    }

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getCategoria() {
        return categoria;
    }

    public String getUnidadMedida() {
        return unidadMedida;
    }

    public Integer getStockActual() {
        return stockActual;
    }

    public Integer getStockMinimo() {
        return stockMinimo;
    }

    public Boolean getActivo() {
        return activo;
    }

    public Boolean getAlertaStockMinimo() {
        return alertaStockMinimo;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public void setUnidadMedida(String unidadMedida) {
        this.unidadMedida = unidadMedida;
    }

    public void setStockActual(Integer stockActual) {
        this.stockActual = stockActual;
    }

    public void setStockMinimo(Integer stockMinimo) {
        this.stockMinimo = stockMinimo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

    public void setAlertaStockMinimo(Boolean alertaStockMinimo) {
        this.alertaStockMinimo = alertaStockMinimo;
    }
}