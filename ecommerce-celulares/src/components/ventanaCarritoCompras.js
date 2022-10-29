import { Fragment } from 'react'
import '../styles/ventanaCarritoCompras.css'
import DisplayData from "../resources/json/carritoCompras.json"


export function VentanaCarritoCompras() {
  
    return(
        <>
<div className="contenedor">
<div id="menuCarrito" className="carritoCompras">
        <div className="contenedor">
            <div className="row">
                    <div className="rowMenu">
                            <nav id="carritoMenu" className="menuCarrito">
                                <a className="enlaceMenu" href="#">CARRITO DE COMPRAS</a>
                            </nav>
                    </div>
            </div>
        </div>
            <div className="row">
                    <div className="rowTable">
                                <tbody className="menuCarritoTable">
                                <tr className="carritoTablePrincipal">
                                    <th className="carritoMenuTableTd">Imágen</th>
                                    <th className="carritoMenuTableTd">Cantidad</th>
                                    <th className="carritoMenuTableTd">Producto</th>
                                    <th className="carritoMenuTableTd">Valor</th>
                                    <th className="carritoMenuTableTd">Total</th>
                                </tr>
                                {DisplayData.map((item, index) => (
                                <tr key={index}>
                                    <td className="carritoMenuTableTd">
                                        <img className="carritoThumb" src={item.thumbnail}></img>
                                    </td>
                                    <td className="carritoMenuTableTd">{item.totalItems}</td>
                                    <td className="carritoMenuTableTd">{item.name}</td>
                                    <td className="carritoMenuTableTd">{item.price}</td>
                                    <td className="carritoMenuTableTd">{item.total}</td>
                                </tr>
                                     ))}
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td className="carritoMenuTableTd">TOTAL</td>
                                    <td className="carritoMenuTableTd">$999.999.999</td>
                                </tr>                          
                            </tbody>
                            <div className="carritoBotones">
                                     <button className="carritoBoton" type="button">Finalizar Compra</button>
                                     <button className="carritoBoton" type="button">Cancelar</button>
                                </div>       
                    </div>
            </div>
    </div>
    </div>

        </>

    );
};