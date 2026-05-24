import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import profilePic from "../images/profilePic.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { routes } from "../routes";
import Logo from "../images/arsenal/logo-arsenal.png";
import "../styles/componentStyles/Header.css";
import { useContext } from "react";
import { ContextGlobal } from "../components/utils/global.context";

const Header = () => {
  const { user } = useContext(ContextGlobal);

  const handleButton = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    window.location.pathname = "/";
  };

  const isLoggedIn = user?.rol !== undefined && user?.rol !== "";
  const isPatientOrPublic =
    user?.rol === undefined || user?.rol === "PATIENT" || user?.rol === "";

  return (
    <Navbar expand="lg" className="navbar large">
      {user?.rol === "ODONTOLOGY" ? (
        <Link to={routes.TurnOdontology}>
          <img className="navbar_logo" src={Logo} alt="Logo" />
        </Link>
      ) : (
<Link to={routes.Home} className="navbar_brand">
  <img className="navbar_logo" src={Logo} alt="Logo" />

  <div className="navbar_brand_text">
    <span>Ortodoncia</span>
    <strong>The Arsenal</strong>
  </div>
</Link>      )}

      <Container className="navbar_container">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse
          id="basic-navbar-nav"
          className="navbar_container_collapse"
        >
          <Nav className="me-auto navbar_container_collapse_nav">
            {isPatientOrPublic && (
              <>
                <Nav.Link
                  className="navbar_container_collapse_nav-navDropdown"
                  href={routes.Home}
                >
                  Inicio
                </Nav.Link>
                <hr />

                {!isLoggedIn ? (
                  <>
                    <Nav.Link
                      className="navbar_container_collapse_nav-navDropdown"
                      href={routes.Login}
                    >
                      Turnos
                    </Nav.Link>
                    <hr />
                  </>
                ) : (
                  <>
                    <NavDropdown
                      title="Turnos"
                      id="turnos-paciente-dropdown"
                      className="navbar_container_collapse_nav-navDropdown"
                    >
                      <NavDropdown.Item href={routes.ReserveTurn}>
                        Añadir Turno
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href={routes.MyTurn}>
                        Listar Turnos
                      </NavDropdown.Item>
                    </NavDropdown>
                    <hr />
                  </>
                )}

                <Nav.Link
                  className="navbar_container_collapse_nav-navDropdown"
                  href={routes.Service}
                >
                  Servicios
                </Nav.Link>
                <hr />

                <Nav.Link
                  className="navbar_container_collapse_nav-navDropdown"
                  href={routes.AboutUs}
                >
                  Conócenos
                </Nav.Link>
                <hr />
              </>
            )}

            {user?.rol === "ODONTOLOGY" && (
              <>
                <Nav.Link
                  className="navbar_container_collapse_nav-navDropdown"
                  href={routes.TurnOdontology}
                >
                  Turnos
                </Nav.Link>
                <hr />

                <NavDropdown
                  title="Inventario"
                  id="inventario-odontologo-dropdown"
                  className="navbar_container_collapse_nav-navDropdown"
                >
                  <NavDropdown.Item href={routes.ListInsumosAdmin}>
                    Listar Insumos
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href={routes.ConsumoInsumosAdmin}>
                    Consumo de Insumos
                  </NavDropdown.Item>
                </NavDropdown>
                <hr />

                <NavDropdown
                  title="Historia Clínica"
                  id="historia-odontologo-dropdown"
                  className="navbar_container_collapse_nav-navDropdown"
                >
                  <NavDropdown.Item href={routes.EvolucionClinicaAdmin}>
                    Evolución Clínica
                  </NavDropdown.Item>
                </NavDropdown>
                <hr />
              </>
            )}

            {user?.rol === "ADMIN" && (
              <>
                <NavDropdown
                  title="Turnos"
                  id="turnos-admin-dropdown"
                  className="navbar_container_collapse_nav-navDropdown"
                >
                  <NavDropdown.Item href={routes.AddTurnAdmin}>
                    Añadir Turno
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href={routes.ListTurnsAdmin}>
                    Listar Turnos
                  </NavDropdown.Item>
                </NavDropdown>
                <hr />

                <NavDropdown
                  title="Odontólogo"
                  id="odontologo-admin-dropdown"
                  className="navbar_container_collapse_nav-navDropdown"
                >
                  <NavDropdown.Item href={routes.AddDentistAdmin}>
                    Añadir Odontólogo
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href={routes.ListDentistAdmin}>
                    Listar Odontólogos
                  </NavDropdown.Item>
                  
                </NavDropdown>
                <hr />

                <NavDropdown
                  title="Pacientes"
                  id="pacientes-admin-dropdown"
                  className="navbar_container_collapse_nav-navDropdown"
                >
                  <NavDropdown.Item href={routes.AddPatientAdmin}>
                    Añadir Paciente
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href={routes.ListPatientAdmin}>
                    Listar Pacientes
                  </NavDropdown.Item>
                </NavDropdown>
                <hr />

                <NavDropdown
                  title="Inventario"
                  id="inventario-admin-dropdown"
                  className="navbar_container_collapse_nav-navDropdown"
                >
                  <NavDropdown.Item href={routes.AddInsumoAdmin}>
                    Agregar Insumo
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href={routes.ListInsumosAdmin}>
                    Listar Insumos
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href={routes.ConsumoInsumosAdmin}>
                    Consumo de Insumos
                  </NavDropdown.Item>
                </NavDropdown>
                <hr />

                <NavDropdown
                  title="Historia Clínica"
                  id="historia-admin-dropdown"
                  className="navbar_container_collapse_nav-navDropdown"
                >
                  <NavDropdown.Item href={routes.EvolucionClinicaAdmin}>
                    Evolución Clínica
                  </NavDropdown.Item>
                </NavDropdown>
                <hr />

                <NavDropdown
  title="Reportes"
  id="reportes-admin-dropdown"
  className="navbar_container_collapse_nav-navDropdown"
>
  <NavDropdown.Item href={routes.ReporteOperativoAdmin}>
    Reporte Operativo
  </NavDropdown.Item>
</NavDropdown>
<hr />
                
              </>
            )}

            {isLoggedIn && (
              <>
                <Nav.Link className="profile" href={routes.Profile}>
                  Perfil
                </Nav.Link>
                <hr />

                <Link to={routes.Profile}>
                  <div className="profile_image">
                    <img
                      src={user?.urlImagen ? user.urlImagen : profilePic}
                      alt="Perfil"
                    />
                  </div>
                </Link>

                <button className="Btn" type="button" onClick={handleButton}>
                  <div className="sign">
                    <svg viewBox="0 0 512 512">
                      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                    </svg>
                  </div>

                  <div className="text">Cerrar Sesión</div>
                </button>
              </>
            )}

            {!isLoggedIn && (
              <>
                <div>
                  <NavDropdown
                    title={<FontAwesomeIcon icon={faUser} />}
                    id="login-dropdown"
                    className="navbar_container_collapse_nav-navDropdown"
                  >
                    <NavDropdown.Item href={routes.Login}>
                      Iniciar Sesión
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href={routes.Register}>
                      Registrarse
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>

                <div>
                  <Nav.Link className="simple" href={routes.Login}>
                    Iniciar Sesión
                  </Nav.Link>
                  <Nav.Link className="simple" href={routes.Register}>
                    Registrarse
                  </Nav.Link>
                </div>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;