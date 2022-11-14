import './ventanaCarritoCompras.css'
import CarritoProducto from './carritoProducto'
import { useState, useEffect } from 'react';
import Boton from '../botones/boton';

function CarritoProductos() {

    const [prodInCar, setProdInCar] = useState([]);

    useEffect(
        () => {
            fetch("http://localhost:8085/carrito").
                then(
                    (response) => (response.json())
                )
                .then(
                    (response) => {
                        setProdInCar(response)
                    }
                )
        }
        , []);


    var totalVentas = prodInCar.reduce((sum, value) => (value.precio ? sum + parseInt(value.precio * value.cantidad) : sum), 0);

    const comprar = () => {
    
    }

    const borrar = () => {
    
    }

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
                            {prodInCar.map(
                                (item, index) => (

                                    <CarritoProducto
                                        index={index}
                                        marca={item.marca}
                                        modelo={item.modelo}
                                        img={item.img}
                                        precio={item.precio}
                                        cantidad={item.cantidad}
                                    />

                                )
                            )

                            }

                            <tr>
                                <td></td>
                                <td></td>
                                <td className="carritoMenuTableTd">TOTAL</td>
                                <td className="carritoMenuTableTd"></td>
                                <td className="carritoMenuTableTd">$ {totalVentas}</td>
                            </tr>
                        </tbody>
                        <div className="carritoBotones">
                            <Boton url="/" nombre='Finalizar Compra' click={() => comprar()} />
                            <Boton url="/" nombre='Borrar Carrito' click={() => borrar()} />
                        </div>

                    </div>
                </div>
            </div>
        </div >



    );
};

export default CarritoProductos;