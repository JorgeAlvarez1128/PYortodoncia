import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import baseUrl from "../../../components/utils/baseUrl.json";
import { ContextGlobal } from "../../../components/utils/global.context";

const EvolucionClinica = () => {
  const { jwt } = useContext(ContextGlobal);

  const [turnos, setTurnos] = useState([]);
  const [evoluciones, setEvoluciones] = useState([]);

  const [formData, setFormData] = useState({
    turnoId: "",
    diagnostico: "",
    planTratamiento: "",
    evolucion: "",
    observaciones: "",
  });

  const getToken = () => jwt || localStorage.getItem("jwt");

  const cargarTurnos = async () => {
    try {
      const response = await fetch(`${baseUrl.url}/turnos`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTurnos(data);
      } else {
        setTurnos([]);
      }
    } catch (error) {
      console.error("Error cargando turnos:", error);
      setTurnos([]);
    }
  };

  const cargarEvoluciones = async () => {
    try {
      const response = await fetch(`${baseUrl.url}/evoluciones-clinicas`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEvoluciones(data);
      } else {
        setEvoluciones([]);
      }
    } catch (error) {
      console.error("Error cargando evoluciones:", error);
      setEvoluciones([]);
    }
  };

  useEffect(() => {
    cargarTurnos();
    cargarEvoluciones();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      turnoId: "",
      diagnostico: "",
      planTratamiento: "",
      evolucion: "",
      observaciones: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      ...formData,
      turnoId: Number(formData.turnoId),
    };

    if (
      !payload.turnoId ||
      !payload.diagnostico ||
      !payload.planTratamiento ||
      !payload.evolucion
    ) {
      Swal.fire({
        icon: "warning",
        title: "Datos incompletos",
        text: "Debe seleccionar un turno y diligenciar diagnóstico, plan de tratamiento y evolución.",
      });
      return;
    }

    const confirmResult = await Swal.fire({
      title: "Confirmar evolución clínica",
      text: "¿Desea registrar esta evolución clínica?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Registrar",
      cancelButtonText: "Cancelar",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const response = await fetch(`${baseUrl.url}/evoluciones-clinicas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Evolución registrada",
          text: "La evolución clínica fue guardada correctamente.",
        });

        resetForm();
        cargarEvoluciones();
      } else {
        const errorText = await response.text();

        Swal.fire({
          icon: "error",
          title: "No se pudo registrar",
          text: errorText || "Revise la información ingresada.",
        });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor.",
      });
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <h3>Historia clínica y evolución ortodóntica</h3>

      <p>
        Registre diagnóstico, plan de tratamiento, evolución y observaciones
        asociadas a un turno clínico.
      </p>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-group mb-3">
          <label>Turno</label>
          <select
            name="turnoId"
            className="form-control"
            value={formData.turnoId}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione un turno</option>

            {turnos.map((turno) => (
              <option value={turno.id} key={turno.id}>
                #{turno.id} - {turno.fecha} {turno.hora} -{" "}
                {turno.nombrePaciente} {turno.apellidoPaciente} /{" "}
                {turno.nombreOdontologo} {turno.apellidoOdontologo}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group mb-3">
          <label>Diagnóstico</label>
          <textarea
            name="diagnostico"
            className="form-control"
            value={formData.diagnostico}
            onChange={handleInputChange}
            rows="3"
            placeholder="Ej. Paciente en control de ortodoncia con evolución favorable"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Plan de tratamiento</label>
          <textarea
            name="planTratamiento"
            className="form-control"
            value={formData.planTratamiento}
            onChange={handleInputChange}
            rows="3"
            placeholder="Ej. Continuar controles mensuales y ajuste de aparatología"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Evolución clínica</label>
          <textarea
            name="evolucion"
            className="form-control"
            value={formData.evolucion}
            onChange={handleInputChange}
            rows="4"
            placeholder="Ej. Se realiza revisión general, ajuste de brackets y verificación de alineación"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Observaciones</label>
          <textarea
            name="observaciones"
            className="form-control"
            value={formData.observaciones}
            onChange={handleInputChange}
            rows="3"
            placeholder="Ej. Paciente tolera adecuadamente el tratamiento"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Registrar evolución
        </button>
      </form>

      <hr className="my-5" />

      <h4>Evoluciones registradas</h4>

      <div className="table-responsive mt-3">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Turno</th>
              <th>Paciente</th>
              <th>Odontólogo</th>
              <th>Diagnóstico</th>
              <th>Plan</th>
              <th>Evolución</th>
              <th>Fecha</th>
            </tr>
          </thead>

          <tbody>
            {evoluciones.length > 0 ? (
              evoluciones.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.turnoId}</td>
                  <td>
                    {item.nombrePaciente} {item.apellidoPaciente}
                  </td>
                  <td>
                    {item.nombreOdontologo} {item.apellidoOdontologo}
                  </td>
                  <td>{item.diagnostico}</td>
                  <td>{item.planTratamiento}</td>
                  <td>{item.evolucion}</td>
                  <td>{item.fechaRegistro}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No hay evoluciones clínicas registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EvolucionClinica;