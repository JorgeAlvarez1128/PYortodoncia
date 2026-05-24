import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import baseUrl from "../../../components/utils/baseUrl.json";
import { ContextGlobal } from "../../../components/utils/global.context";

const ConsumoInsumos = () => {
  const { jwt } = useContext(ContextGlobal);

  const [turnos, setTurnos] = useState([]);
  const [insumos, setInsumos] = useState([]);
  const [consumos, setConsumos] = useState([]);

  const [formData, setFormData] = useState({
    turnoId: "",
    insumoId: "",
    cantidad: "",
    observacion: "",
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

  const cargarInsumos = async () => {
    try {
      const response = await fetch(`${baseUrl.url}/insumos`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setInsumos(data);
      } else {
        setInsumos([]);
      }
    } catch (error) {
      console.error("Error cargando insumos:", error);
      setInsumos([]);
    }
  };

  const cargarConsumos = async () => {
    try {
      const response = await fetch(`${baseUrl.url}/consumos-insumos`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setConsumos(data);
      } else {
        setConsumos([]);
      }
    } catch (error) {
      console.error("Error cargando consumos:", error);
      setConsumos([]);
    }
  };

  useEffect(() => {
    cargarTurnos();
    cargarInsumos();
    cargarConsumos();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      turnoId: "",
      insumoId: "",
      cantidad: "",
      observacion: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      turnoId: Number(formData.turnoId),
      insumoId: Number(formData.insumoId),
      cantidad: Number(formData.cantidad),
      observacion: formData.observacion,
    };

    if (!payload.turnoId || !payload.insumoId || !payload.cantidad || payload.cantidad <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Datos incompletos",
        text: "Seleccione turno, insumo y una cantidad válida.",
      });
      return;
    }

    const confirmResult = await Swal.fire({
      title: "Confirmar consumo",
      text: "¿Desea registrar este consumo de insumo?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Registrar",
      cancelButtonText: "Cancelar",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const response = await fetch(`${baseUrl.url}/consumos-insumos`, {
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
          title: "Consumo registrado",
          text: "El consumo fue asociado al turno y el inventario fue actualizado.",
        });

        resetForm();
        cargarInsumos();
        cargarConsumos();
      } else {
        const errorText = await response.text();

        Swal.fire({
          icon: "error",
          title: "No se pudo registrar el consumo",
          text: errorText || "Revise los datos ingresados.",
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
      <h3>Consumo de insumos por turno</h3>

      <p>
        Registre los insumos utilizados durante una atención clínica. El sistema
        descontará automáticamente la cantidad consumida del inventario.
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
                #{turno.id} - {turno.fecha} {turno.hora} - {turno.nombrePaciente}{" "}
                {turno.apellidoPaciente} / {turno.nombreOdontologo}{" "}
                {turno.apellidoOdontologo}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group mb-3">
          <label>Insumo</label>
          <select
            name="insumoId"
            className="form-control"
            value={formData.insumoId}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione un insumo</option>

            {insumos.map((insumo) => (
              <option value={insumo.id} key={insumo.id}>
                {insumo.nombre} - Stock: {insumo.stockActual} {insumo.unidadMedida}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group mb-3">
          <label>Cantidad consumida</label>
          <input
            type="number"
            name="cantidad"
            className="form-control"
            value={formData.cantidad}
            onChange={handleInputChange}
            min="1"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Observación</label>
          <textarea
            name="observacion"
            className="form-control"
            value={formData.observacion}
            onChange={handleInputChange}
            placeholder="Ej. Uso de brackets durante control mensual"
            rows="3"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Registrar consumo
        </button>
      </form>

      <hr className="my-5" />

      <h4>Consumos registrados</h4>

      <div className="table-responsive mt-3">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Turno</th>
              <th>Insumo</th>
              <th>Cantidad</th>
              <th>Observación</th>
              <th>Fecha de registro</th>
            </tr>
          </thead>

          <tbody>
            {consumos.length > 0 ? (
              consumos.map((consumo) => (
                <tr key={consumo.id}>
                  <td>{consumo.id}</td>
                  <td>{consumo.turnoId}</td>
                  <td>{consumo.nombreInsumo}</td>
                  <td>{consumo.cantidad}</td>
                  <td>{consumo.observacion}</td>
                  <td>{consumo.fechaRegistro}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No hay consumos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsumoInsumos;
