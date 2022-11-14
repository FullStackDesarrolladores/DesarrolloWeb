import './producto.css';
import Boton from '../botones/boton';
import { useState } from 'react'


function ProductoAdm(props) {

  const [productoBorrar, setProductoBorrar] = useState();

  const editar = () => {

    localStorage.setItem("seleccion", props.id)

  }

  const borrar = (id) => {

    fetch("http://localhost:8082/productos-admin/id?id=" + id,
      {
        method: 'DELETE'
      }
    ).then(
      () => {
        alert("Producto Eliminado")
      }
    )
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
        <Boton url="/" nombre='Editar' click={() => editar()} />
      </div>
      <div className='cont-btn'>
        <Boton url="/view-admin" nombre='Borrar' click={() => borrar(props.id)} />
      </div>

    </div>


  )
}

export default ProductoAdm;