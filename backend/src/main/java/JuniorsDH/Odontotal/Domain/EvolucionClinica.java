package JuniorsDH.Odontotal.Domain;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "evoluciones_clinicas")
public class EvolucionClinica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "turno_id", referencedColumnName = "id", nullable = false)
    private Turno turno;

    @ManyToOne
    @JoinColumn(name = "paciente_id", referencedColumnName = "id", nullable = false)
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "odontologo_id", referencedColumnName = "id", nullable = false)
    private Odontologo odontologo;

    @Column(nullable = false, length = 1000)
    private String diagnostico;

    @Column(nullable = false, length = 1000)
    private String planTratamiento;

    @Column(nullable = false, length = 1500)
    private String evolucion;

    @Column(length = 1000)
    private String observaciones;

    @Column(nullable = false)
    private LocalDateTime fechaRegistro;

    public EvolucionClinica() {
    }

    public Long getId() {
        return id;
    }

    public Turno getTurno() {
        return turno;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public Odontologo getOdontologo() {
        return odontologo;
    }

    public String getDiagnostico() {
        return diagnostico;
    }

    public String getPlanTratamiento() {
        return planTratamiento;
    }

    public String getEvolucion() {
        return evolucion;
    }

    public String getObservaciones() {
        return observaciones;
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

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public void setOdontologo(Odontologo odontologo) {
        this.odontologo = odontologo;
    }

    public void setDiagnostico(String diagnostico) {
        this.diagnostico = diagnostico;
    }

    public void setPlanTratamiento(String planTratamiento) {
        this.planTratamiento = planTratamiento;
    }

    public void setEvolucion(String evolucion) {
        this.evolucion = evolucion;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public void setFechaRegistro(LocalDateTime fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }
}