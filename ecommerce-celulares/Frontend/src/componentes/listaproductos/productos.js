import './productos.css';
import Producto from './producto'
import { useState, useEffect } from 'react';

function Productos() {

  //const productos = JSON.parse(localStorage.getItem("productos"));
  const [productos, setProducotsDis] = useState([]);

  useEffect(
    () => {
      fetch("http://localhost:8081/productos").
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
  return (
    <ul className="cont-productos">
      {
        productos.map(
          (item) => {
            if (item.stoke > 0) {
              return (<li className='cont-prod'> 
                  <Producto
                    id={item._id}
                    src={item.img}
                    marca={item.marca}
                    modelo={item.modelo}
                    precio={item.precio}
                    caracteristicas={item.caracteristicas}
                  />
              </li>
              )
            }
          }
        )
      }
    </ul>
  )
}

export default Productos;