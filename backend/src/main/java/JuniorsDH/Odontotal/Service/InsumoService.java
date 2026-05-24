package JuniorsDH.Odontotal.Service;

import JuniorsDH.Odontotal.Domain.Insumo;
import JuniorsDH.Odontotal.Dto.InsumoDto;
import JuniorsDH.Odontotal.Exception.DataInvalidException;
import JuniorsDH.Odontotal.Exception.ResourceNotFoundException;
import JuniorsDH.Odontotal.Repository.InsumoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InsumoService {

    private final InsumoRepository insumoRepository;

    @Autowired
    public InsumoService(InsumoRepository insumoRepository) {
        this.insumoRepository = insumoRepository;
    }

    public InsumoDto agregarInsumo(InsumoDto insumoDto) throws DataInvalidException {
        validarInsumo(insumoDto);

        if (insumoRepository.existsByNombreIgnoreCase(insumoDto.getNombre())) {
            throw new DataInvalidException("Ya existe un insumo registrado con ese nombre");
        }

        Insumo insumo = dtoAEntidad(insumoDto);
        insumo.setActivo(true);

        return entidadADto(insumoRepository.save(insumo));
    }

    public List<InsumoDto> listarInsumos() {
        return insumoRepository.findByActivoTrue()
                .stream()
                .map(this::entidadADto)
                .collect(Collectors.toList());
    }

    public InsumoDto buscarInsumo(Long id) throws ResourceNotFoundException {
        Insumo insumo = obtenerInsumo(id);
        return entidadADto(insumo);
    }

    public InsumoDto actualizarInsumo(InsumoDto insumoDto) throws ResourceNotFoundException, DataInvalidException {
        if (insumoDto.getId() == null) {
            throw new DataInvalidException("El id del insumo es obligatorio para actualizar");
        }

        obtenerInsumo(insumoDto.getId());
        validarInsumo(insumoDto);

        Insumo insumo = dtoAEntidad(insumoDto);
        if (insumo.getActivo() == null) {
            insumo.setActivo(true);
        }

        return entidadADto(insumoRepository.save(insumo));
    }

    public InsumoDto registrarEntrada(Long id, Integer cantidad) throws ResourceNotFoundException {
        Insumo insumo = obtenerInsumo(id);
        insumo.registrarEntrada(cantidad);
        return entidadADto(insumoRepository.save(insumo));
    }

    public InsumoDto registrarSalida(Long id, Integer cantidad) throws ResourceNotFoundException {
        Insumo insumo = obtenerInsumo(id);
        insumo.registrarSalida(cantidad);
        return entidadADto(insumoRepository.save(insumo));
    }

    public void inactivarInsumo(Long id) throws ResourceNotFoundException {
        Insumo insumo = obtenerInsumo(id);
        insumo.setActivo(false);
        insumoRepository.save(insumo);
    }

    private Insumo obtenerInsumo(Long id) throws ResourceNotFoundException {
        return insumoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe el insumo solicitado"));
    }

    private void validarInsumo(InsumoDto insumoDto) throws DataInvalidException {
        if (insumoDto.getNombre() == null || insumoDto.getNombre().isBlank()) {
            throw new DataInvalidException("El nombre del insumo es obligatorio");
        }

        if (insumoDto.getCategoria() == null || insumoDto.getCategoria().isBlank()) {
            throw new DataInvalidException("La categoría del insumo es obligatoria");
        }

        if (insumoDto.getUnidadMedida() == null || insumoDto.getUnidadMedida().isBlank()) {
            throw new DataInvalidException("La unidad de medida es obligatoria");
        }

        if (insumoDto.getStockActual() == null || insumoDto.getStockActual() < 0) {
            throw new DataInvalidException("El stock actual no puede ser negativo");
        }

        if (insumoDto.getStockMinimo() == null || insumoDto.getStockMinimo() < 0) {
            throw new DataInvalidException("El stock mínimo no puede ser negativo");
        }
    }

    private InsumoDto entidadADto(Insumo insumo) {
        InsumoDto dto = new InsumoDto();

        dto.setId(insumo.getId());
        dto.setNombre(insumo.getNombre());
        dto.setCategoria(insumo.getCategoria());
        dto.setUnidadMedida(insumo.getUnidadMedida());
        dto.setStockActual(insumo.getStockActual());
        dto.setStockMinimo(insumo.getStockMinimo());
        dto.setActivo(insumo.getActivo());
        dto.setAlertaStockMinimo(insumo.estaEnStockMinimo());

        return dto;
    }

    private Insumo dtoAEntidad(InsumoDto dto) {
        Insumo insumo = new Insumo();

        insumo.setId(dto.getId());
        insumo.setNombre(dto.getNombre());
        insumo.setCategoria(dto.getCategoria());
        insumo.setUnidadMedida(dto.getUnidadMedida());
        insumo.setStockActual(dto.getStockActual());
        insumo.setStockMinimo(dto.getStockMinimo());
        insumo.setActivo(dto.getActivo() != null ? dto.getActivo() : true);

        return insumo;
    }
}