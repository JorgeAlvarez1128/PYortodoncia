import React from "react";
import "../../styles/pagesStyles/ServiceStyle.css";
import ServicesArsenal from "../../images/arsenal/services-arsenal.jpg";

const servicios = [
  {
    title: "Valoración ortodóntica",
    description:
      "Evaluación inicial del paciente, diagnóstico clínico y definición del plan de tratamiento.",
  },
  {
    title: "Control de ortodoncia",
    description:
      "Seguimiento periódico del avance del tratamiento, ajustes de aparatología y registro de evolución.",
  },
  {
    title: "Gestión de turnos",
    description:
      "Programación y consulta de turnos para mejorar la organización de la atención clínica.",
  },
  {
    title: "Historia clínica digital",
    description:
      "Registro centralizado de diagnóstico, evolución, observaciones y plan de tratamiento.",
  },
  {
    title: "Control de insumos",
    description:
      "Seguimiento del inventario clínico y consumo de materiales usados en cada atención.",
  },
  {
    title: "Reportes operativos",
    description:
      "Indicadores de turnos, productividad y consumo de insumos para apoyar la toma de decisiones.",
  },
];

const Service = () => {
  return (
    <div className="service arsenal-service">
      <section className="arsenal-service-hero">
        <div>
          <span className="arsenal-badge">Servicios</span>
          <h1>Servicios de Ortodoncia The Arsenal</h1>
          <p>
            Una plataforma diseñada para apoyar la atención ortodóntica con
            organización, trazabilidad clínica y control operativo.
          </p>
        </div>

        <img src={ServicesArsenal} alt="Servicios Ortodoncia The Arsenal" />
      </section>

      <section className="arsenal-service-grid">
        {servicios.map((item, index) => (
          <div className="arsenal-service-card" key={index}>
            <div className="arsenal-service-number">
              {String(index + 1).padStart(2, "0")}
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Service;