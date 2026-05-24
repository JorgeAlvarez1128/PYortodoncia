package JuniorsDH.Odontotal.Repository;

import org.springframework.data.jpa.repository.Query;
import java.time.LocalDate;
import JuniorsDH.Odontotal.Domain.ConsumoInsumo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConsumoInsumoRepository extends JpaRepository<ConsumoInsumo, Long> {

    List<ConsumoInsumo> findByTurno_Id(Long turnoId);

    List<ConsumoInsumo> findByInsumo_Id(Long insumoId);

    @Query(value = "SELECT i.id, i.nombre, COALESCE(SUM(c.cantidad), 0) " +
        "FROM consumos_insumos c " +
        "INNER JOIN insumos i ON c.insumo_id = i.id " +
        "INNER JOIN turnos t ON c.turno_id = t.id " +
        "WHERE t.fecha BETWEEN ?1 AND ?2 " +
        "GROUP BY i.id, i.nombre " +
        "ORDER BY SUM(c.cantidad) DESC", nativeQuery = true)
List<Object[]> consumoInsumosPorRango(LocalDate fechaInicio, LocalDate fechaFin);
}