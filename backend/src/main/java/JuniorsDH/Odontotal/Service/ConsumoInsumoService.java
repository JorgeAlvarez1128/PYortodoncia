package JuniorsDH.Odontotal.Service;

import JuniorsDH.Odontotal.Domain.ConsumoInsumo;
import JuniorsDH.Odontotal.Domain.Insumo;
import JuniorsDH.Odontotal.Domain.Turno;
import JuniorsDH.Odontotal.Dto.ConsumoInsumoDto;
import JuniorsDH.Odontotal.Exception.DataInvalidException;
import JuniorsDH.Odontotal.Exception.ResourceNotFoundException;
import JuniorsDH.Odontotal.Repository.ConsumoInsumoRepository;
import JuniorsDH.Odontotal.Repository.InsumoRepository;
import JuniorsDH.Odontotal.Repository.TurnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConsumoInsumoService {

    private final ConsumoInsumoRepository consumoInsumoRepository;
    private final InsumoRepository insumoRepository;
    private final TurnoRepository turnoRepository;

    @Autowired
    public ConsumoInsumoService(
            ConsumoInsumoRepository consumoInsumoRepository,
            InsumoRepository insumoRepository,
            TurnoRepository turnoRepository
    ) {
        this.consumoInsumoRepository = consumoInsumoRepository;
        this.insumoRepository = insumoRepository;
        this.turnoRepository = turnoRepository;
    }

    public ConsumoInsumoDto registrarConsumo(ConsumoInsumoDto dto)
            throws ResourceNotFoundException, DataInvalidException {

        validarConsumo(dto);

        Turno turno = turnoRepository.findById(dto.getTurnoId())
                .orElseThrow(() -> new ResourceNotFoundException("No existe el turno asociado al consumo"));

        Insumo insumo = insumoRepository.findById(dto.getInsumoId())
                .orElseThrow(() -> new ResourceNotFoundException("No existe el insumo seleccionado"));

        if (insumo.getActivo() == null || !insumo.getActivo()) {
            throw new DataInvalidException("El insumo seleccionado se encuentra inactivo");
        }

        insumo.registrarSalida(dto.getCantidad());
        insumoRepository.save(insumo);

        ConsumoInsumo consumo = new ConsumoInsumo();
        consumo.setTurno(turno);
        consumo.setInsumo(insumo);
        consumo.setCantidad(dto.getCantidad());
        consumo.setObservacion(dto.getObservacion());
        consumo.setFechaRegistro(LocalDateTime.now());

        return entidadADto(consumoInsumoRepository.save(consumo));
    }

    public List<ConsumoInsumoDto> listarConsumos() {
        return consumoInsumoRepository.findAll()
                .stream()
                .map(this::entidadADto)
                .collect(Collectors.toList());
    }

    public List<ConsumoInsumoDto> listarConsumosPorTurno(Long turnoId) {
        return consumoInsumoRepository.findByTurno_Id(turnoId)
                .stream()
                .map(this::entidadADto)
                .collect(Collectors.toList());
    }

    private void validarConsumo(ConsumoInsumoDto dto) throws DataInvalidException {
        if (dto.getTurnoId() == null) {
            throw new DataInvalidException("El turno es obligatorio para registrar el consumo");
        }

        if (dto.getInsumoId() == null) {
            throw new DataInvalidException("El insumo es obligatorio para registrar el consumo");
        }

        if (dto.getCantidad() == null || dto.getCantidad() <= 0) {
            throw new DataInvalidException("La cantidad consumida debe ser mayor a cero");
        }
    }

    private ConsumoInsumoDto entidadADto(ConsumoInsumo consumo) {
        ConsumoInsumoDto dto = new ConsumoInsumoDto();

        dto.setId(consumo.getId());
        dto.setTurnoId(consumo.getTurno().getId());
        dto.setInsumoId(consumo.getInsumo().getId());
        dto.setNombreInsumo(consumo.getInsumo().getNombre());
        dto.setCantidad(consumo.getCantidad());
        dto.setObservacion(consumo.getObservacion());
        dto.setFechaRegistro(consumo.getFechaRegistro());

        return dto;
    }
}