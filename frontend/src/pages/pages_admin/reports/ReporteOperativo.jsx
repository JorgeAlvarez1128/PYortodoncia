import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import baseUrl from "../../../components/utils/baseUrl.json";
import { ContextGlobal } from "../../../components/utils/global.context";

const ReporteOperativo = () => {
  const { jwt } = useContext(ContextGlobal);

  const [fechaInicio, setFechaInicio] = useState("2026-05-01");
  const [fechaFin, setFechaFin] = useState("2026-05-31");
  const [reporte, setReporte] = useState(null);
  const [cargando, setCargando] = useState(false);

  const getToken = () => jwt || localStorage.getItem("jwt");

  const generarReporte = async (event) => {
    event.preventDefault();

    if (!fechaInicio || !fechaFin) {
      Swal.fire({
        icon: "warning",
        title: "Fechas requeridas",
        text: "Debe seleccionar fecha inicial y fecha final.",
      });
      return;
    }

    if (fechaFin < fechaInicio) {
      Swal.fire({
        icon: "warning",
        title: "Rango inválido",
        text: "La fecha final no puede ser anterior a la fecha inicial.",
      });
      return;
    }

    setCargando(true);

    try {
      const response = await fetch(
        `${baseUrl.url}/reportes/operativo?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setReporte(data);
      } else {
        const errorText = await response.text();

        Swal.fire({
          icon: "error",
          title: "No se pudo generar el reporte",
          text: errorText || "Revise el rango de fechas ingresado.",
        });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor.",
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <h3>Reportes operativos</h3>

      <p>
        Consulte indicadores operativos de la clínica por rango de fechas:
        turnos, atención, consumo de insumos y productividad por odontólogo.
      </p>

      <form onSubmit={generarReporte} className="row mt-4">
        <div className="form-group col-md-4 mb-3">
          <label>Fecha inicial</label>
          <input
            type="date"
            className="form-control"
            value={fechaInicio}
            onChange={(event) => setFechaInicio(event.target.value)}
            required
          />
        </div>

        <div className="form-group col-md-4 mb-3">
          <label>Fecha final</label>
          <input
            type="date"
            className="form-control"
            value={fechaFin}
            onChange={(event) => setFechaFin(event.target.value)}
            required
          />
        </div>

        <div className="form-group col-md-4 mb-3 d-flex align-items-end">
          <button type="submit" className="btn btn-primary w-100">
            {cargando ? "Generando..." : "Generar reporte"}
          </button>
        </div>
      </form>

      {reporte && (
        <>
          <hr className="my-4" />

          <h4>
            Reporte del {reporte.fechaInicio} al {reporte.fechaFin}
          </h4>

          <div className="row mt-4">
            <div className="col-md-4 mb-3">
              <div className="card p-3">
                <h5>Total turnos</h5>
                <h2>{reporte.totalTurnos}</h2>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card p-3">
                <h5>Turnos atendidos</h5>
                <h2>{reporte.turnosAtendidos}</h2>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card p-3">
                <h5>Turnos pendientes</h5>
                <h2>{reporte.turnosPendientes}</h2>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card p-3">
                <h5>Turnos cancelados</h5>
                <h2>{reporte.turnosCancelados}</h2>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card p-3">
                <h5>Ausencias</h5>
                <h2>{reporte.ausencias}</h2>
              </div>
            </div>
          </div>

          <hr className="my-4" />

          <h4>Consumo de insumos</h4>

          <div className="table-responsive mt-3">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>ID Insumo</th>
                  <th>Nombre</th>
                  <th>Cantidad total consumida</th>
                </tr>
              </thead>

              <tbody>
                {reporte.consumoInsumos &&
                reporte.consumoInsumos.length > 0 ? (
                  reporte.consumoInsumos.map((item) => (
                    <tr key={item.insumoId}>
                      <td>{item.insumoId}</td>
                      <td>{item.nombreInsumo}</td>
                      <td>{item.cantidadTotal}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">
                      No hay consumo de insumos en el rango seleccionado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <hr className="my-4" />

          <h4>Productividad por odontólogo</h4>

          <div className="table-responsive mt-3">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>ID Odontólogo</th>
                  <th>Nombre</th>
                  <th>Total turnos</th>
                </tr>
              </thead>

              <tbody>
                {reporte.productividadOdontologos &&
                reporte.productividadOdontologos.length > 0 ? (
                  reporte.productividadOdontologos.map((item) => (
                    <tr key={item.odontologoId}>
                      <td>{item.odontologoId}</td>
                      <td>
                        {item.nombreOdontologo} {item.apellidoOdontologo}
                      </td>
                      <td>{item.totalTurnos}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">
                      No hay productividad registrada en el rango seleccionado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="alert alert-info mt-4">
            Nota: los indicadores de cancelaciones y ausencias aparecen en cero
            porque el modelo actual de turnos aún no incluye un campo formal de
            estado.
          </div>
        </>
      )}
    </div>
  );
};

export default ReporteOperativo;