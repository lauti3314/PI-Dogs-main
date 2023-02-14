import React from "react";
import style from "../Card/Card.module.css"

export default function Card({image, name, temperaments}) {
    return (
        <div className={style.main_container}>
          <div className={style.image_container}>
            <img className={style.img} src={`${image}`} alt={`imagen de: ${name}`}/>
          </div>
          <h2>{name}</h2>
          <div className={`${style.temperaments_container}`}>
            {
            temperaments.map((temps) => <h3 key={temps+Math.random}>{temps}</h3>)
            }
          </div>
          
        </div>
      );
}