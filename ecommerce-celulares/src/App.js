import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import BarraNavegacion from './componentes/navbar/barraNavegacion';
import listaProductos from "./componentes/listaproductos/listaProductos.json"
import Productos from './componentes/listaproductos/productos'
import VerProducto from './componentes/listaproductos/verProducto'
import ListaVentas  from './componentes/ventas/listaVentas';
import CarritoProductos from './componentes/carrito/carritoProductos'

function App() {

  if (localStorage.getItem("productos") === null) {
    localStorage.setItem("productos", JSON.stringify(listaProductos));
  }


  return (

    <BrowserRouter>
      <BarraNavegacion />
      <Routes>
        <Route path='/productos' element={<Productos />}></Route>
        <Route path='/ver' element={<VerProducto />}></Route>
        <Route path='/carrito' element={<CarritoProductos />}></Route>
        <Route path='/reporte' element={<ListaVentas />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

