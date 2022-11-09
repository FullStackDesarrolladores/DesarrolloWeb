import './producto.css';
import Boton from '../botones/boton';

function Producto(props) {

  const productos = JSON.parse(localStorage.getItem("productos"))

  const verproducto = () => {
    const productoSeleccionado = productos.find(element => {
      return element.id === props.id;
    });
    if (localStorage.getItem("seleccion") == null) {
      localStorage.setItem("seleccion", JSON.stringify(productoSeleccionado))
    }
    else {
      localStorage.setItem("seleccion", JSON.stringify(productoSeleccionado))
    }
  }

  return (
    <div id="card-product">
      <div className="card-scd">
        <img src={props.src}
          className='img-prod'
          alt="imagen de producto"
        ></img>
        <div className='card-description'>
          <h4 className='card-title'>{props.marca} {props.modelo}</h4>
          <h5 className='price'>$ {props.precio}</h5>
          <p className='description'>{props.caracteristicas}</p>
        </div>
      </div>
      <div className='cont-btn'>
        <Boton nombre='Comprar' click={() => verproducto()} />
      </div>

    </div>


  )
}

export default Producto;