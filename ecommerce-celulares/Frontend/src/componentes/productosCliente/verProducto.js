import './verProducto.css'
import Boton from '../botones/boton';
import { useState, useEffect } from 'react';

function VerProducto(props) {

  const [producto, setProducotsDis] = useState([]);

  useEffect(
    () => {
      fetch("http://localhost:8081/productos/id?id="+localStorage.getItem("seleccion")).
        then(
          (response) => (response.json())
        )
        .then(
          (response) => {
            setProducotsDis(response)
          }
        )
    }
    , []);
  
  const adicionarCarrito = () => {

    fetch("http://localhost:8085/carrito",
    {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(producto)
    }
    ).
    then(
      (response) => (response.json())
    )
    .then(
      (response) => {
        setProducotsDis(response)
      }
    )

  }
  return (
    <div className="product-content">
      <div className="content-img">
        <img src={producto.img}
          alt="img-producto">
        </img>
      </div>
      <div className="content-desc">
        <h2 className="product-name">{producto.marca} {producto.modelo}</h2>
        <h3 className="price">$ {producto.precio}</h3>
        <p>{producto.caracteristicas}</p>
        <div className="content-btn">
          <Boton url="/carrito" nombre="Agregar" click={() => adicionarCarrito()} />
        </div>
      </div>
    </div>
  )
}

export default VerProducto;