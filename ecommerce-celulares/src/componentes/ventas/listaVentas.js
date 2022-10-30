import JsonData from './ListaVentas.json';
import { React } from 'react';
import './reporteventas.css'

function ListaVentas() {

    const DisplayData = JsonData.map(
        (info) => {
            return (
                <tr>
                    <td>{info.id}</td>
                    <td>{info.fecha}</td>
                    <td>$ {info.precio}</td>

                </tr>
            )
        }
    )
    var totalVentas = JsonData.reduce((sum, value) => (typeof value.precio =="number" ? sum + value.precio : sum), 0);

    return (
        <div>
            <h1>Reporte Ventas</h1>
            <table>
                <thead>
                    <tr>
                        <th>IdVenta</th>
                        <th>Fecha</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {DisplayData}
                    <tr>
                        <td></td>
                        <td><strong>Total</strong></td>
                        <td>$ {totalVentas}</td>
                    </tr>
                </tbody>

            </table>

        </div >
    )
}

export default ListaVentas;