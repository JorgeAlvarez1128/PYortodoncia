import React from "react";
import "../../styles/componentStyles/Footer.css";
import logo from "../../images/arsenal/logo-arsenal.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagramSquare,
  faWhatsappSquare,
} from "@fortawesome/free-brands-svg-icons";
import { faTooth, faCalendarCheck, faBoxesStacked } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="footer arsenal-footer">
      <div className="footer-logo">
        <img src={logo} alt="Ortodoncia The Arsenal" className="footer-logo_img" />
        <p>Precisión clínica. Disciplina Arsenal.</p>
      </div>

      <div className="footer-rules">
        <h2 className="footer-rules_title">Ortodoncia The Arsenal</h2>
        <h3 className="footer-rules_text">Sistema de gestión clínica ortodóntica</h3>
        <h4 className="footer-rules_text">Proyecto académico universitario</h4>
      </div>

      <div className="footer-modules">
        <div>
          <FontAwesomeIcon icon={faCalendarCheck} />
          <span>Turnos</span>
        </div>

        <div>
          <FontAwesomeIcon icon={faTooth} />
          <span>Historia clínica</span>
        </div>

        <div>
          <FontAwesomeIcon icon={faBoxesStacked} />
          <span>Inventario</span>
        </div>
      </div>

      <div className="footer-redes">
        <FontAwesomeIcon icon={faFacebookSquare} className="footer-redes_icon" />
        <FontAwesomeIcon icon={faInstagramSquare} className="footer-redes_icon" />
        <FontAwesomeIcon icon={faWhatsappSquare} className="footer-redes_icon" />
      </div>
    </footer>
  );
};

export default Footer;
