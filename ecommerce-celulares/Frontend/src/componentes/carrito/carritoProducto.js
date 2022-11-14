import './ventanaCarritoCompras.css'

function CarritoProducto(props) {

    return (

        <tr key={props.index}>
            <td className="carritoMenuTableTd">
                <img className="carritoThumb" src={props.img}></img>
            </td>
            <td className="carritoMenuTableTd">{props.cantidad}</td>
            <td className="carritoMenuTableTd">{props.marca} {props.modelo}</td>
            <td className="carritoMenuTableTd">{props.precio}</td>
            <td className="carritoMenuTableTd">{props.precio*props.cantidad}</td>
        </tr>


    );
};

export default CarritoProducto;