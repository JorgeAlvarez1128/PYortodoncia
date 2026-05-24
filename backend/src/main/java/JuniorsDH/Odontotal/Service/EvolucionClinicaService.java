package JuniorsDH.Odontotal.Service;

import JuniorsDH.Odontotal.Domain.EvolucionClinica;
import JuniorsDH.Odontotal.Domain.Turno;
import JuniorsDH.Odontotal.Dto.EvolucionClinicaDto;
import JuniorsDH.Odontotal.Exception.DataInvalidException;
import JuniorsDH.Odontotal.Exception.ResourceNotFoundException;
import JuniorsDH.Odontotal.Repository.EvolucionClinicaRepository;
import JuniorsDH.Odontotal.Repository.TurnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EvolucionClinicaService {

    private final EvolucionClinicaRepository evolucionClinicaRepository;
    private final TurnoRepository turnoRepository;

    @Autowired
    public EvolucionClinicaService(
            EvolucionClinicaRepository evolucionClinicaRepository,
            TurnoRepository turnoRepository
    ) {
        this.evolucionClinicaRepository = evolucionClinicaRepository;
        this.turnoRepository = turnoRepository;
    }

    public EvolucionClinicaDto registrarEvolucion(EvolucionClinicaDto dto)
            throws ResourceNotFoundException, DataInvalidException {

        validarEvolucion(dto);

        Turno turno = turnoRepository.findById(dto.getTurnoId())
                .orElseThrow(() -> new ResourceNotFoundException("No existe el turno asociado a la evolución clínica"));

        Integer cantidadEvoluciones = evolucionClinicaRepository.contarPorTurnoId(dto.getTurnoId());

        if (cantidadEvoluciones != null && cantidadEvoluciones > 0) {
            throw new DataInvalidException("El turno ya tiene una evolución clínica registrada");
        }

        EvolucionClinica evolucionClinica = new EvolucionClinica();
        evolucionClinica.setTurno(turno);
        evolucionClinica.setPaciente(turno.getPaciente());
        evolucionClinica.setOdontologo(turno.getOdontologo());
        evolucionClinica.setDiagnostico(dto.getDiagnostico());
        evolucionClinica.setPlanTratamiento(dto.getPlanTratamiento());
        evolucionClinica.setEvolucion(dto.getEvolucion());
        evolucionClinica.setObservaciones(dto.getObservaciones());
        evolucionClinica.setFechaRegistro(LocalDateTime.now());

        return entidadADto(evolucionClinicaRepository.save(evolucionClinica));
    }

    public List<EvolucionClinicaDto> listarEvoluciones() {
        return evolucionClinicaRepository.findAll(Sort.by(Sort.Direction.DESC, "fechaRegistro"))
                .stream()
                .map(this::entidadADto)
                .collect(Collectors.toList());
    }

    public List<EvolucionClinicaDto> listarPorPaciente(Long pacienteId) {
        return evolucionClinicaRepository.buscarPorPacienteId(pacienteId)
                .stream()
                .map(this::entidadADto)
                .collect(Collectors.toList());
    }

    public List<EvolucionClinicaDto> listarPorTurno(Long turnoId) {
        return evolucionClinicaRepository.buscarPorTurnoId(turnoId)
                .stream()
                .map(this::entidadADto)
                .collect(Collectors.toList());
    }

    private void validarEvolucion(EvolucionClinicaDto dto) throws DataInvalidException {
        if (dto.getTurnoId() == null) {
            throw new DataInvalidException("El turno es obligatorio para registrar la evolución clínica");
        }

        if (dto.getDiagnostico() == null || dto.getDiagnostico().isBlank()) {
            throw new DataInvalidException("El diagnóstico es obligatorio");
        }

        if (dto.getPlanTratamiento() == null || dto.getPlanTratamiento().isBlank()) {
            throw new DataInvalidException("El plan de tratamiento es obligatorio");
        }

        if (dto.getEvolucion() == null || dto.getEvolucion().isBlank()) {
            throw new DataInvalidException("La evolución clínica es obligatoria");
        }
    }

    private EvolucionClinicaDto entidadADto(EvolucionClinica evolucionClinica) {
        EvolucionClinicaDto dto = new EvolucionClinicaDto();

        dto.setId(evolucionClinica.getId());
        dto.setTurnoId(evolucionClinica.getTurno().getId());

        dto.setPacienteId(evolucionClinica.getPaciente().getId());
        dto.setNombrePaciente(evolucionClinica.getPaciente().getNombre());
        dto.setApellidoPaciente(evolucionClinica.getPaciente().getApellido());

        dto.setOdontologoId(evolucionClinica.getOdontologo().getId());
        dto.setNombreOdontologo(evolucionClinica.getOdontologo().getNombre());
        dto.setApellidoOdontologo(evolucionClinica.getOdontologo().getApellido());

        dto.setDiagnostico(evolucionClinica.getDiagnostico());
        dto.setPlanTratamiento(evolucionClinica.getPlanTratamiento());
        dto.setEvolucion(evolucionClinica.getEvolucion());
        dto.setObservaciones(evolucionClinica.getObservaciones());
        dto.setFechaRegistro(evolucionClinica.getFechaRegistro());

        return dto;
    }
}