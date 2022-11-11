let productos = require("./productos.json");
let request = require("axios")

const productosget = () => {
    return productos
}

const productosgetid = (id) => {
    return productos.find((producto)=>(producto.id === id))
}

const productoset= (producto) => {
    productos.push(producto);
    return productos;
}
const productosset = async (producto) => {

    const producto= request.patch(
        "http://localhost:8082//productos-admin",restarStoke(producto)
    )
   /* const carrito = request.post(
        "http://localhost:####/carrito",producto
    )*/

    await request.all([producto])
        .then(
            (res) => {
                producto.stoke = restarStoke(res[0].data);
            }
        )
        .catch(
            (err)=>{
                console.log(err)
            }
        )

    reservas.push(reserva);
    return reservas;
}

function restarStoke(producto){
    producto[stoke]-=1;
    console.log(producto)
    return producto;
}
module.exports.productosGet = productosget;
module.exports.productosGetId = productosgetid;
module.exports.productosSet = productosset;
module.exports.productosDelete = productosdelete;