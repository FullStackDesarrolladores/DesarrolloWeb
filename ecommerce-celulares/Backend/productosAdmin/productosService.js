let productos = require("./productos.json");

const productosget = () => {
    return productos
}

const productosgetid = (id) => {
    return productos.find((vuelo) => (vuelo.id === id))
}

const productosset = (producto) => {
    productos.push(producto);
    return productos;
}

const productospatch = (modificacion) => {
    let productoAModificar = productos.find((producto) => (modificacion.id === producto.id));

    Object.keys(modificacion).forEach(function(key) {
        productoAModificar[key] = modificacion[key]
      })
      console.log( productoAModificar )
    return productos;
}
const productosdelete = (id) => {
    productos = productos.filter((producto) => { return producto.id !== id });
    return productos
}

module.exports.productosGet = productosget;
module.exports.productosGetId = productosgetid;
module.exports.productosSet = productosset;
module.exports.productosDelete = productosdelete;
module.exports.productosPatch = productospatch;