import React from "react";
import style from "../Paginate/Paginate.module.css";


export default function Paginate({ dogsPerPage, allDogs, paginado }) {
    const pageNumbers =[];

    for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) { //cantidad de elementos totales, dividido limite de elementos por pagina
        pageNumbers.push(i);
    }

    return(
        <nav className={`${style.nav_container}`}>
            <ul className={`${style.ul_container}`}>
                { pageNumbers && pageNumbers.map(number => (
                    <li className={`${style.li_container}`} onClick={() => paginado(number)} key={number}>
                         <button type="button">{number}</button> 
                    </li>
                ))}
            </ul>
        </nav>
    )
}