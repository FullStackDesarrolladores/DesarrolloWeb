import React from "react";
import product_card from "../data/product_data";

const MainContent = () => {
    console.log(product_card);
    const listItems = product_card.map((item) => 
    <div className="card" key={item.id}>
        <div className="card_img">
            <img src={item.thumb}></img>
        </div>
        <div className="card_header">
            <h2>{item.nombre}</h2>
            <p>{item.descripcion}</p>
            <p className="price">{item.precio}</p>
            <div className="btn">Editar</div>
        </div>
    </div>

    );
    return(
        <div className="main_content">
            <h3>Celulares</h3>
            {listItems}
        </div>
    )
}
export default MainContent;