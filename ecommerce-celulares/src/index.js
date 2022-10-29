import React from 'react';
import ReactDOM from 'react-dom/client';

// importaciones - Componentes
import { VentanaCarritoCompras } from "./components/ventanaCarritoCompras";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <VentanaCarritoCompras />
  </React.StrictMode>
);

