import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import baseUrl from "../../../components/utils/baseUrl.json";
import { ContextGlobal } from "../../../components/utils/global.context";

const AddInsumo = () => {
  const { jwt } = useContext(ContextGlobal);

  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    unidadMedida: "",
    stockActual: "",
    stockMinimo: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      nombre: "",
      categoria: "",
      unidadMedida: "",
      stockActual: "",
      stockMinimo: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      ...formData,
      stockActual: Number(formData.stockActual),
      stockMinimo: Number(formData.stockMinimo),
    };

    if (
      !payload.nombre ||
      !payload.categoria ||
      !payload.unidadMedida ||
      payload.stockActual < 0 ||
      payload.stockMinimo < 0
    ) {
      Swal.fire({
        icon: "warning",
        title: "Datos incompletos",
        text: "Por favor, verifique la información del insumo.",
      });
      return;
    }

    const confirmResult = await Swal.fire({
      title: "Confirmar registro",
      text: `¿Desea registrar el insumo ${payload.nombre}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const response = await fetch(`${baseUrl.url}/insumos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Insumo registrado correctamente",
          text: "El insumo fue agregado al inventario clínico.",
        });
        resetForm();
      } else {
        const errorText = await response.text();
        Swal.fire({
          icon: "error",
          title: "Error al registrar insumo",
          text: errorText || "No se pudo registrar el insumo.",
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
      <h3>Agregar insumo clínico</h3>
      <p>
        Registre insumos utilizados en la operación de la clínica, como brackets,
        alambres, resinas, guantes u otros materiales críticos.
      </p>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-group mb-3">
          <label>Nombre del insumo</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={formData.nombre}
            onChange={handleInputChange}
            placeholder="Ej. Brackets metalicos"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Categoría</label>
          <input
            type="text"
            name="categoria"
            className="form-control"
            value={formData.categoria}
            onChange={handleInputChange}
            placeholder="Ej. Ortodoncia"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Unidad de medida</label>
          <input
            type="text"
            name="unidadMedida"
            className="form-control"
            value={formData.unidadMedida}
            onChange={handleInputChange}
            placeholder="Ej. unidad, caja, paquete"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Stock actual</label>
          <input
            type="number"
            name="stockActual"
            className="form-control"
            value={formData.stockActual}
            onChange={handleInputChange}
            min="0"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Stock mínimo</label>
          <input
            type="number"
            name="stockMinimo"
            className="form-control"
            value={formData.stockMinimo}
            onChange={handleInputChange}
            min="0"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Registrar insumo
        </button>
      </form>
    </div>
  );
};

export default AddInsumo;