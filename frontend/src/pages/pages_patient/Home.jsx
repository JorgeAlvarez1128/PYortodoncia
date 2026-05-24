import GifArsenal from "../../images/arsenal/loader-arsenal.gif";
import { routes } from "../../routes";
import React, { useContext, useEffect } from "react";
import Slider from "../../components/componentPatient/Slider";
import "../../styles/pagesStyles/Home.css";
import Detail from "../../components/componentPatient/Detail";
import SliderService from "../../components/componentPatient/SliderService";
import Info from "../../components/componentPatient/Info";
import solicitarValidacionCuenta from "../pages_patient/solicitarValidacionCuenta";
import { ContextGlobal } from "../../components/utils/global.context";
import DentistHome from "../../images/arsenal/hero-arsenal.jpg";

const Home = () => {
  const { user, jwt } = useContext(ContextGlobal);

  useEffect(() => {
    if (user && user.rol === "PATIENT") {
      solicitarValidacionCuenta(user, jwt);
    }
  }, [user]);

  return (
    <div className="container-home">
      <div className="container-home-img">
        <div className="arsenal-gif-section">
  <img
    className="arsenal-home-gif"
    src={GifArsenal}
    alt="Animación Ortodoncia The Arsenal"
  />
</div>
<section className="arsenal-home-hero">
  <div className="arsenal-home-content">
    <span className="arsenal-badge">Ortodoncia The Arsenal</span>

    <h1>Precisión clínica para una sonrisa de campeón</h1>

    <p className="arsenal-home-description">
      Gestión integral de pacientes, turnos, evolución clínica e insumos
      ortodónticos con una identidad fuerte, moderna y disciplinada.
    </p>

    <div className="arsenal-home-actions">
      <a href={routes.ReserveTurn} className="arsenal-home-button">
        Reservar turno
      </a>

      <a href={routes.Service} className="arsenal-home-button-secondary">
        Ver servicios
      </a>
    </div>
  </div>

  <img
    className="arsenal-home-img"
    src={DentistHome}
    alt="Ortodoncia The Arsenal"
  />
</section>
        <Detail />
        <SliderService />
        <Info />
      </div>

      
    </div>
  );
};

export default Home;
