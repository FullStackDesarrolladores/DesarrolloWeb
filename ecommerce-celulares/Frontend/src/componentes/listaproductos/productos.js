import './productos.css';
import Producto from './producto'


function Productos() {

  const productos = JSON.parse(localStorage.getItem("productos"));

  return (
    <ul className="cont-productos">
      {
        productos.map(
          (item) => (
            <li className='cont-prod'>
              <Producto
                src={item.img}
                marca={item.marca}
                modelo={item.modelo}
                precio={item.precio}
                caracteristicas={item.caracteristicas}
                id={item.id}
              />
            </li>
          )
        )
      }
    </ul>
  )
}

export default Productos;