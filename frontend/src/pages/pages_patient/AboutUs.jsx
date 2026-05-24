import React from "react";
import ClinicArsenal from "../../images/arsenal/clinic-arsenal.jpg";
import LogoArsenal from "../../images/arsenal/logo-arsenal.png";
import "../../styles/pagesStyles/AboutUsStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faHandshake,
  faPeopleGroup,
  faShieldHeart,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

const AboutUs = () => {
  return (
    <div className="about-us arsenal-about">
      <section className="arsenal-about-hero">
        <div className="arsenal-about-text">
          <span className="arsenal-badge">Ortodoncia The Arsenal</span>
          <h1>Quiénes Somos</h1>
          <p>
            Somos una clínica de ortodoncia orientada a la precisión, la
            disciplina y el seguimiento clínico continuo. Nuestro sistema
            permite centralizar pacientes, turnos, evolución clínica, consumo de
            insumos y reportes operativos.
          </p>
        </div>

        <img
          className="arsenal-about-image"
          src={ClinicArsenal}
          alt="Clínica Ortodoncia The Arsenal"
        />
      </section>

      <section className="arsenal-about-section">
        <div className="arsenal-about-history">
          <h3>Nuestra historia</h3>

          <p>
            Ortodoncia The Arsenal nace como una propuesta académica para
            modernizar la gestión de una clínica de ortodoncia, reduciendo la
            dependencia de procesos manuales y mejorando la trazabilidad de la
            atención clínica.
          </p>

          <p>
            El sistema fue diseñado para apoyar la programación de turnos, el
            registro de evolución ortodóntica, la administración de pacientes y
            el control de insumos utilizados durante cada atención.
          </p>

          <p>
            Su identidad se inspira en una filosofía de trabajo basada en
            estrategia, orden, precisión y rendimiento: valores que conectan el
            cuidado clínico con una experiencia moderna y diferenciada.
          </p>
        </div>

        <div className="arsenal-about-brand">
          <img src={LogoArsenal} alt="Logo Ortodoncia The Arsenal" />
          <p>Precisión clínica. Disciplina Arsenal.</p>
        </div>
      </section>

      <section className="arsenal-about-mission">
        <div>
          <h3>Misión</h3>
          <p>
            Brindar una atención ortodóntica organizada, segura y personalizada,
            apoyada en herramientas digitales que permitan mejorar el
            seguimiento del tratamiento, la gestión de turnos y el control de
            insumos clínicos.
          </p>
        </div>

        <div>
          <h3>Visión</h3>
          <p>
            Consolidarnos como una clínica de ortodoncia moderna, reconocida por
            integrar tecnología, calidad humana y gestión eficiente para ofrecer
            tratamientos confiables y una experiencia superior al paciente.
          </p>
        </div>
      </section>

      <section className="arsenal-values-section">
        <h3>Nuestros valores</h3>
        <p>
          En Ortodoncia The Arsenal trabajamos bajo una filosofía de precisión,
          compromiso y seguimiento constante. Cada valor representa una parte
          esencial de la atención clínica y administrativa.
        </p>

        <div className="arsenal-values-grid">
          <div className="arsenal-value-card">
            <FontAwesomeIcon icon={faBullseye} />
            <h4>Precisión</h4>
            <p>Registro claro de turnos, evolución clínica y tratamientos.</p>
          </div>

          <div className="arsenal-value-card">
            <FontAwesomeIcon icon={faShieldHeart} />
            <h4>Confianza</h4>
            <p>Información centralizada y disponible para una atención segura.</p>
          </div>

          <div className="arsenal-value-card">
            <FontAwesomeIcon icon={faPeopleGroup} />
            <h4>Trabajo en equipo</h4>
            <p>Coordinación entre administración, odontólogos y pacientes.</p>
          </div>

          <div className="arsenal-value-card">
            <FontAwesomeIcon icon={faHandshake} />
            <h4>Compromiso</h4>
            <p>Seguimiento continuo durante todo el proceso ortodóntico.</p>
          </div>

          <div className="arsenal-value-card">
            <FontAwesomeIcon icon={faChartLine} />
            <h4>Mejora continua</h4>
            <p>Reportes e indicadores para apoyar la toma de decisiones.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;