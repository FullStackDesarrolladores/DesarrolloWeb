import './boton.css';

function Boton(props) {
  
  return (
    <div className="elc">
      <a href={props.url} onClick={props.click}>{props.nombre}</a>
    </div>


  )
}

export default Boton;