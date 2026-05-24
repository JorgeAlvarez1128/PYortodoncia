package JuniorsDH.Odontotal.Domain;

import javax.persistence.*;

@Entity
@Table(name = "insumos")
public class Insumo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String categoria;

    @Column(nullable = false)
    private String unidadMedida;

    @Column(nullable = false)
    private Integer stockActual;

    @Column(nullable = false)
    private Integer stockMinimo;

    @Column(nullable = false)
    private Boolean activo = true;

    public Insumo() {
    }

    public Insumo(String nombre, String categoria, String unidadMedida, Integer stockActual, Integer stockMinimo, Boolean activo) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.unidadMedida = unidadMedida;
        this.stockActual = stockActual;
        this.stockMinimo = stockMinimo;
        this.activo = activo;
    }

    public Boolean estaEnStockMinimo() {
        return stockActual != null && stockMinimo != null && stockActual <= stockMinimo;
    }

    public void registrarEntrada(Integer cantidad) {
        if (cantidad == null || cantidad <= 0) {
            throw new IllegalArgumentException("La cantidad de entrada debe ser mayor a cero");
        }
        this.stockActual += cantidad;
    }

    public void registrarSalida(Integer cantidad) {
        if (cantidad == null || cantidad <= 0) {
            throw new IllegalArgumentException("La cantidad de salida debe ser mayor a cero");
        }
        if (this.stockActual - cantidad < 0) {
            throw new IllegalArgumentException("El stock del insumo no puede quedar en valores negativos");
        }
        this.stockActual -= cantidad;
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
}
