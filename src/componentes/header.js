import React from "react";

export default function Header () {
    return (
        <nav>
            <div className="logo">MINTIC.</div>
            <ul>
                <li>Home</li>
                <li>Productos</li>
                <li>Administración</li>
                <li>Salir</li>
            </ul>
            <div className="search">
                <i className="fa fa-search"> Buscar</i>
            </div>
        </nav>
    )
}