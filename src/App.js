import React from "react";
import './App.scss';
import Header from "./componentes/header";
import Footer from "./componentes/footer";
import MainC from "./componentes/mainContent";

function App() {
  return (
    <div className="container">
      <Header/>
      <Footer/>
      <MainC/>
    </div>
  );
}

export default App;
