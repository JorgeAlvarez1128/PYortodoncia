package JuniorsDH.Odontotal.Domain;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "consumos_insumos")
public class ConsumoInsumo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "turno_id", referencedColumnName = "id", nullable = false)
    private Turno turno;

    @ManyToOne
    @JoinColumn(name = "insumo_id", referencedColumnName = "id", nullable = false)
    private Insumo insumo;

    @Column(nullable = false)
    private Integer cantidad;

    @Column(length = 500)
    private String observacion;

    @Column(nullable = false)
    private LocalDateTime fechaRegistro;

    public ConsumoInsumo() {
    }

    public ConsumoInsumo(Turno turno, Insumo insumo, Integer cantidad, String observacion, LocalDateTime fechaRegistro) {
        this.turno = turno;
        this.insumo = insumo;
        this.cantidad = cantidad;
        this.observacion = observacion;
        this.fechaRegistro = fechaRegistro;
    }

    public Long getId() {
        return id;
    }

    public Turno getTurno() {
        return turno;
    }

    public Insumo getInsumo() {
        return insumo;
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

    public void setTurno(Turno turno) {
        this.turno = turno;
    }

    public void setInsumo(Insumo insumo) {
        this.insumo = insumo;
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