import './producto.css';
import Boton from '../botones/boton';


function Producto(props) {


  const verproducto = () => {

    localStorage.setItem("seleccion", props.id)

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
        <Boton url="/ver" nombre='Comprar' click={() => verproducto()} />
      </div>

    </div>


  )
}

export default Producto;