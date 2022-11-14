import './verProducto.css'
import Boton from '../botones/boton';
import { useState, useEffect } from 'react';

function VerProducto(props) {

  const [producto, setProducotsDis] = useState([]);

  useEffect(
    () => {
      fetch("http://localhost:8082/productos-admin/id?id=" + localStorage.getItem("seleccion")).
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

  const modificar = () => {

    fetch("http://localhost:8085/carrito",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
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
    <form>
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
            <Boton url="/productos-admin" nombre="Modificar" click={() => modificar()} />
          </div>
        </div>
      </div>
    </form>
  )
}

export default VerProducto;