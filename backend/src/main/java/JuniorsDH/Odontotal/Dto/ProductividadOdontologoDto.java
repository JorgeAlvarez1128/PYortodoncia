package JuniorsDH.Odontotal.Dto;

public class ProductividadOdontologoDto {

    private Long odontologoId;
    private String nombreOdontologo;
    private String apellidoOdontologo;
    private Long totalTurnos;

    public ProductividadOdontologoDto() {
    }

    public ProductividadOdontologoDto(Long odontologoId, String nombreOdontologo, String apellidoOdontologo, Long totalTurnos) {
        this.odontologoId = odontologoId;
        this.nombreOdontologo = nombreOdontologo;
        this.apellidoOdontologo = apellidoOdontologo;
        this.totalTurnos = totalTurnos;
    }

    public Long getOdontologoId() {
        return odontologoId;
    }

    public void setOdontologoId(Long odontologoId) {
        this.odontologoId = odontologoId;
    }

    public String getNombreOdontologo() {
        return nombreOdontologo;
    }

    public void setNombreOdontologo(String nombreOdontologo) {
        this.nombreOdontologo = nombreOdontologo;
    }

    public String getApellidoOdontologo() {
        return apellidoOdontologo;
    }

    public void setApellidoOdontologo(String apellidoOdontologo) {
        this.apellidoOdontologo = apellidoOdontologo;
    }

    public Long getTotalTurnos() {
        return totalTurnos;
    }

    public void setTotalTurnos(Long totalTurnos) {
        this.totalTurnos = totalTurnos;
    }
}
