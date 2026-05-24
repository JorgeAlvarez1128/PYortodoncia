package JuniorsDH.Odontotal.Dto;

import java.time.LocalDateTime;

public class EvolucionClinicaDto {

    private Long id;
    private Long turnoId;
    private Long pacienteId;
    private String nombrePaciente;
    private String apellidoPaciente;
    private Long odontologoId;
    private String nombreOdontologo;
    private String apellidoOdontologo;
    private String diagnostico;
    private String planTratamiento;
    private String evolucion;
    private String observaciones;
    private LocalDateTime fechaRegistro;

    public EvolucionClinicaDto() {
    }

    public Long getId() {
        return id;
    }

    public Long getTurnoId() {
        return turnoId;
    }

    public Long getPacienteId() {
        return pacienteId;
    }

    public String getNombrePaciente() {
        return nombrePaciente;
    }

    public String getApellidoPaciente() {
        return apellidoPaciente;
    }

    public Long getOdontologoId() {
        return odontologoId;
    }

    public String getNombreOdontologo() {
        return nombreOdontologo;
    }

    public String getApellidoOdontologo() {
        return apellidoOdontologo;
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

    public void setTurnoId(Long turnoId) {
        this.turnoId = turnoId;
    }

    public void setPacienteId(Long pacienteId) {
        this.pacienteId = pacienteId;
    }

    public void setNombrePaciente(String nombrePaciente) {
        this.nombrePaciente = nombrePaciente;
    }

    public void setApellidoPaciente(String apellidoPaciente) {
        this.apellidoPaciente = apellidoPaciente;
    }

    public void setOdontologoId(Long odontologoId) {
        this.odontologoId = odontologoId;
    }

    public void setNombreOdontologo(String nombreOdontologo) {
        this.nombreOdontologo = nombreOdontologo;
    }

    public void setApellidoOdontologo(String apellidoOdontologo) {
        this.apellidoOdontologo = apellidoOdontologo;
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