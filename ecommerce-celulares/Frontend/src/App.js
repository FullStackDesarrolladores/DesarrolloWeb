import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import BarraNavegacion from './componentes/navbar/barraNavegacion';
import Productos from './componentes/productosCliente/productos'
import ProductosAdm from './componentes/productosAdmin/productosAdm';
import VerProducto from './componentes/productosCliente/verProducto'
import ListaVentas from './componentes/ventas/listaVentas';
import CarritoProductos from './componentes/carrito/carritoProductos'


function App() {

  if (localStorage.getItem("seleccion") === null) {
    localStorage.setItem("seleccion", "[]");
  }


  return (

    <BrowserRouter>
      <BarraNavegacion />
      <Routes>
        <Route path='/' element={<Productos />}></Route>
        <Route path='/ver' element={<VerProducto />}></Route>
        <Route path='/carrito' element={<CarritoProductos />}></Route>
        <Route path='/reporte' element={<ListaVentas />}></Route>
        <Route path='/admin-view' element={<ProductosAdm />}></Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

