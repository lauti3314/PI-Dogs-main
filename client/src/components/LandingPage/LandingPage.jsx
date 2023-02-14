import  React from "react";
import { Link } from "react-router-dom";
import style from "../LandingPage/LandingPage.module.css";
import "../LandingPage/ButtonHome.css";

export default function LandingPage() {
  return (
    <div className={`${style.main_container}`}>
      <div className={`${style.main_left_container}`}>
        <h1 className={`${style.titleApp}`} >Dog Planet</h1>
        <h3>Aplicación sobre el mejor amigo del hombre</h3>
        <div className={`${style.left_paragraph}`}>
          <p>Aquí puede obtener información sobre múltiples nombres de razas de perros y detalles como su tamaño, esperanza de vida y temperamento, y también puede agregar otros nuevos.</p>
        </div>
        
        <Link to="/home">
            <button className="button_home">Go home</button>
        </Link>
      </div>
    </div>
  );
}