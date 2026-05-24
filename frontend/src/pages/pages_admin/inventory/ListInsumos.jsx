import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import baseUrl from "../../../components/utils/baseUrl.json";
import { ContextGlobal } from "../../../components/utils/global.context";

const ListInsumos = () => {
  const { jwt } = useContext(ContextGlobal);
  const [insumos, setInsumos] = useState([]);

  const cargarInsumos = async () => {
    try {
      const response = await fetch(`${baseUrl.url}/insumos`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setInsumos(data);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al consultar inventario",
          text: "No se pudo cargar la lista de insumos.",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarInsumos();
  }, []);

  const registrarMovimiento = async (id, tipo) => {
    const result = await Swal.fire({
      title: tipo === "entrada" ? "Registrar entrada" : "Registrar salida",
      input: "number",
      inputLabel: "Cantidad",
      inputAttributes: {
        min: "1",
        step: "1",
      },
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    const cantidad = Number(result.value);

    if (!cantidad || cantidad <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Cantidad inválida",
        text: "La cantidad debe ser mayor a cero.",
      });
      return;
    }

    try {
      const response = await fetch(`${baseUrl.url}/insumos/${id}/${tipo}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ cantidad }),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Inventario actualizado",
        });
        cargarInsumos();
      } else {
        const errorText = await response.text();
        Swal.fire({
          icon: "error",
          title: "No se pudo actualizar",
          text: errorText || "Revise la cantidad ingresada.",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const inactivarInsumo = async (id, nombre) => {
    const confirmResult = await Swal.fire({
      title: "Confirmar inactivación",
      text: `¿Desea inactivar el insumo ${nombre}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, inactivar",
      cancelButtonText: "Cancelar",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const response = await fetch(`${baseUrl.url}/insumos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Insumo inactivado",
        });
        cargarInsumos();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <h3>Inventario de insumos clínicos</h3>
      <p>
        Consulte existencias, registre entradas o salidas y revise alertas por
        stock mínimo.
      </p>

      <div className="table-responsive mt-4">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Unidad</th>
              <th>Stock actual</th>
              <th>Stock mínimo</th>
              <th>Alerta</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {insumos.length > 0 ? (
              insumos.map((insumo) => (
                <tr key={insumo.id}>
                  <td>{insumo.nombre}</td>
                  <td>{insumo.categoria}</td>
                  <td>{insumo.unidadMedida}</td>
                  <td>{insumo.stockActual}</td>
                  <td>{insumo.stockMinimo}</td>
                  <td>
                    {insumo.alertaStockMinimo ? (
                      <span className="badge bg-danger">Stock mínimo</span>
                    ) : (
                      <span className="badge bg-success">Disponible</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => registrarMovimiento(insumo.id, "entrada")}
                    >
                      Entrada
                    </button>

                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => registrarMovimiento(insumo.id, "salida")}
                    >
                      Salida
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => inactivarInsumo(insumo.id, insumo.nombre)}
                    >
                      Inactivar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No hay insumos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListInsumos;