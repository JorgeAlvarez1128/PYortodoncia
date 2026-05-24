package JuniorsDH.Odontotal.Repository;


import JuniorsDH.Odontotal.Domain.Odontologo;
import JuniorsDH.Odontotal.Domain.Paciente;
import JuniorsDH.Odontotal.Domain.Turno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface TurnoRepository extends JpaRepository<Turno,Long> {
    boolean existsByFechaAndHoraAndOdontologo(LocalDate fecha, LocalTime hora, Odontologo odontologo);
    boolean existsByFechaAndHoraAndPaciente(LocalDate fecha, LocalTime hora, Paciente paciente);
    @Query(value = "SELECT * FROM turnos WHERE odontologos_id = ?1", nativeQuery = true)
    List<Turno> findByOdontologoId(Long odontologoId);

    @Query(value = "SELECT * FROM turnos WHERE paciente_id = ?1", nativeQuery = true)
    List<Turno> findByPacienteId(Long odontologoId);

    @Query(value = "SELECT COUNT(*) FROM turnos WHERE fecha BETWEEN ?1 AND ?2", nativeQuery = true)
Long contarTurnosPorRango(LocalDate fechaInicio, LocalDate fechaFin);

@Query(value = "SELECT COUNT(*) FROM turnos WHERE fecha BETWEEN ?1 AND ?2 AND realizado IS NOT NULL AND realizado <> ''", nativeQuery = true)
Long contarTurnosAtendidosPorRango(LocalDate fechaInicio, LocalDate fechaFin);

@Query(value = "SELECT COUNT(*) FROM turnos WHERE fecha BETWEEN ?1 AND ?2 AND (realizado IS NULL OR realizado = '')", nativeQuery = true)
Long contarTurnosPendientesPorRango(LocalDate fechaInicio, LocalDate fechaFin);

@Query(value = "SELECT o.id, o.nombre, o.apellido, COUNT(t.id) " +
        "FROM turnos t " +
        "INNER JOIN odontologos o ON t.odontologos_id = o.id " +
        "WHERE t.fecha BETWEEN ?1 AND ?2 " +
        "GROUP BY o.id, o.nombre, o.apellido " +
        "ORDER BY COUNT(t.id) DESC", nativeQuery = true)
List<Object[]> productividadOdontologosPorRango(LocalDate fechaInicio, LocalDate fechaFin);
}
