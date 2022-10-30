import './verProducto.css'
import Boton from '../botones/boton';


function VerProducto() {

  const seleccion = JSON.parse(localStorage.getItem("seleccion"))


  const adicionarCarrito = () => {

    var productoSeleccionados = JSON.parse(localStorage.getItem("carrito"));
    productoSeleccionados.push(seleccion)
    localStorage.setItem("carrito", JSON.stringify(productoSeleccionados))

  }
  return (
    <div className="product-content">
      <div className="content-img">
        <img src={seleccion.img}
          alt="img-producto">
        </img>
      </div>
      <div className="content-desc">
        <h2 className="product-name">{seleccion.marca} {seleccion.modelo}</h2>
        <h3 className="price">$ {seleccion.precio}</h3>
        <p>{seleccion.caracteristicas}</p>
        <div className="content-btn">
          <Boton nombre="Agregar" click={() => adicionarCarrito()} />
        </div>
      </div>
    </div>
  )
}

export default VerProducto;