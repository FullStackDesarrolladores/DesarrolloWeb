import './ventanaCarritoCompras.css'
import CarritoProducto from './carritoProducto'
import carritoCompras from './carritoCompras.json'

function CarritoProductos() {

    const displaData =[ JSON.parse(localStorage.getItem("carrito"))];
    //const displaData = carritoCompras;
    var totalVentas = displaData.reduce((sum, value) => (value.precio ? sum + value.precio : sum), "");
    return (

        <div className="contenedor">
            <div id="menuCarrito" className="carritoCompras">
                <div className="contenedor">
                    <div className="row">
                        <div className="rowMenu">
                            <nav id="carritoMenu" className="menuCarrito">
                                <a className="enlaceMenu" href="/">CARRITO DE COMPRAS</a>
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
                            {displaData.map(
                                (item, index) => (
                                    <CarritoProducto
                                        index={index}
                                        marca={item.marca}
                                        modelo={item.modelo}
                                        img={item.img}
                                        precio={item.precio}
                                    />
                                )
                            )
                            }
                            <tr>
                                <td></td>
                                <td></td>
                                <td className="carritoMenuTableTd">TOTAL</td>
                                <td className="carritoMenuTableTd">$ {totalVentas}</td>
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



    );
};

export default CarritoProductos;