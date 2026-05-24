package JuniorsDH.Odontotal.Service;

import JuniorsDH.Odontotal.Dto.ConsumoInsumoReporteDto;
import JuniorsDH.Odontotal.Dto.ProductividadOdontologoDto;
import JuniorsDH.Odontotal.Dto.ReporteOperativoDto;
import JuniorsDH.Odontotal.Exception.DataInvalidException;
import JuniorsDH.Odontotal.Repository.ConsumoInsumoRepository;
import JuniorsDH.Odontotal.Repository.TurnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReporteOperativoService {

    private final TurnoRepository turnoRepository;
    private final ConsumoInsumoRepository consumoInsumoRepository;

    @Autowired
    public ReporteOperativoService(
            TurnoRepository turnoRepository,
            ConsumoInsumoRepository consumoInsumoRepository
    ) {
        this.turnoRepository = turnoRepository;
        this.consumoInsumoRepository = consumoInsumoRepository;
    }

    public ReporteOperativoDto generarReporte(LocalDate fechaInicio, LocalDate fechaFin) throws DataInvalidException {
        validarRangoFechas(fechaInicio, fechaFin);

        ReporteOperativoDto reporte = new ReporteOperativoDto();

        reporte.setFechaInicio(fechaInicio);
        reporte.setFechaFin(fechaFin);

        reporte.setTotalTurnos(valorSeguro(turnoRepository.contarTurnosPorRango(fechaInicio, fechaFin)));
        reporte.setTurnosAtendidos(valorSeguro(turnoRepository.contarTurnosAtendidosPorRango(fechaInicio, fechaFin)));
        reporte.setTurnosPendientes(valorSeguro(turnoRepository.contarTurnosPendientesPorRango(fechaInicio, fechaFin)));

        // El modelo actual de Turno no tiene campo de estado formal.
        // Por eso, en este MVP estos indicadores quedan en 0 hasta implementar estados.
        reporte.setTurnosCancelados(0L);
        reporte.setAusencias(0L);

        reporte.setConsumoInsumos(mapearConsumoInsumos(
                consumoInsumoRepository.consumoInsumosPorRango(fechaInicio, fechaFin)
        ));

        reporte.setProductividadOdontologos(mapearProductividad(
                turnoRepository.productividadOdontologosPorRango(fechaInicio, fechaFin)
        ));

        return reporte;
    }

    private void validarRangoFechas(LocalDate fechaInicio, LocalDate fechaFin) throws DataInvalidException {
        if (fechaInicio == null || fechaFin == null) {
            throw new DataInvalidException("Debe ingresar fecha inicial y fecha final");
        }

        if (fechaFin.isBefore(fechaInicio)) {
            throw new DataInvalidException("La fecha final no puede ser anterior a la fecha inicial");
        }
    }

    private Long valorSeguro(Long valor) {
        return valor != null ? valor : 0L;
    }

    private Long convertirALong(Object valor) {
        if (valor == null) return 0L;

        if (valor instanceof BigInteger) {
            return ((BigInteger) valor).longValue();
        }

        if (valor instanceof Number) {
            return ((Number) valor).longValue();
        }

        return Long.parseLong(valor.toString());
    }

    private String convertirAString(Object valor) {
        return valor != null ? valor.toString() : "";
    }

    private List<ConsumoInsumoReporteDto> mapearConsumoInsumos(List<Object[]> resultados) {
        List<ConsumoInsumoReporteDto> lista = new ArrayList<>();

        for (Object[] fila : resultados) {
            ConsumoInsumoReporteDto dto = new ConsumoInsumoReporteDto();

            dto.setInsumoId(convertirALong(fila[0]));
            dto.setNombreInsumo(convertirAString(fila[1]));
            dto.setCantidadTotal(convertirALong(fila[2]));

            lista.add(dto);
        }

        return lista;
    }

    private List<ProductividadOdontologoDto> mapearProductividad(List<Object[]> resultados) {
        List<ProductividadOdontologoDto> lista = new ArrayList<>();

        for (Object[] fila : resultados) {
            ProductividadOdontologoDto dto = new ProductividadOdontologoDto();

            dto.setOdontologoId(convertirALong(fila[0]));
            dto.setNombreOdontologo(convertirAString(fila[1]));
            dto.setApellidoOdontologo(convertirAString(fila[2]));
            dto.setTotalTurnos(convertirALong(fila[3]));

            lista.add(dto);
        }

        return lista;
    }
}