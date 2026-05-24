package JuniorsDH.Odontotal.Repository;

import JuniorsDH.Odontotal.Domain.EvolucionClinica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EvolucionClinicaRepository extends JpaRepository<EvolucionClinica, Long> {

    @Query(value = "SELECT * FROM evoluciones_clinicas WHERE paciente_id = ?1 ORDER BY fecha_registro DESC", nativeQuery = true)
    List<EvolucionClinica> buscarPorPacienteId(Long pacienteId);

    @Query(value = "SELECT * FROM evoluciones_clinicas WHERE turno_id = ?1", nativeQuery = true)
    List<EvolucionClinica> buscarPorTurnoId(Long turnoId);

    @Query(value = "SELECT COUNT(*) FROM evoluciones_clinicas WHERE turno_id = ?1", nativeQuery = true)
    Integer contarPorTurnoId(Long turnoId);
}