import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserDoctor,
  faCalendarCheck,
  faClipboardList,
  faBoxesStacked,
} from "@fortawesome/free-solid-svg-icons";

import "../../styles/componentStyles/Detail.css";

const Detail = () => {
  const details = [
    {
      image: <FontAwesomeIcon icon={faUserDoctor} />,
      title: "Especialistas",
      description:
        "Atención ortodóntica orientada al seguimiento clínico y al control del tratamiento.",
    },
    {
      image: <FontAwesomeIcon icon={faCalendarCheck} />,
      title: "Gestión de citas",
      description:
        "Agenda, consulta y administra turnos de manera organizada y centralizada.",
    },
    {
      image: <FontAwesomeIcon icon={faClipboardList} />,
      title: "Evolución clínica",
      description:
        "Registro del diagnóstico, plan de tratamiento, evolución y observaciones del paciente.",
    },
    {
      image: <FontAwesomeIcon icon={faBoxesStacked} />,
      title: "Control de insumos",
      description:
        "Seguimiento del inventario y consumo de materiales usados en cada atención.",
    },
  ];

  return (
    <div className="main-datail arsenal-detail-section">
      <h2>
        Disciplina, precisión y seguimiento clínico para sonrisas campeonas.
      </h2>

      <div className="detail-container">
        {details.map((detail, index) => (
          <div className="detail-box" key={index}>
            <div className="detail-image">{detail.image}</div>
            <div className="detail-title">{detail.title}</div>
            <p className="detail-description">{detail.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Detail;