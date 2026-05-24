package JuniorsDH.Odontotal.Repository;

import JuniorsDH.Odontotal.Domain.Insumo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InsumoRepository extends JpaRepository<Insumo, Long> {

    List<Insumo> findByActivoTrue();

    boolean existsByNombreIgnoreCase(String nombre);
}