import "../styles/componentStyles/Spinner.css";

export default function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <img
        className="loading-spinner-img"
        src="/loader-arsenal.gif?v=3"
        alt="Cargando Ortodoncia The Arsenal"
      />

      <p className="loading">Cargando Arsenal...</p>
    </div>
  );
}