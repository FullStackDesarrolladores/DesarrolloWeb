let productos = require("./productos.json");
let request = require("axios")

const productosget = () => {
    return productos
}

const productosgetid = (id) => {
    return productos.find((producto)=>(producto.id === id))
}

const productosset = async (producto) => {

    const prod= request.patch(
        "http:/localhost:8082/productos-admin",restarStoke(producto)
    )
   /* const carrito = request.post(
        "http://localhost:####/carrito",producto
    )*/

    await request.all([prod])
        .then(
            (res) => {
                console.log("respuesta de request")
                console.log(res[0].data)
                return res[0].data;
            }
        )
        .catch(
            ()=>{
                console.log("fallo la peticion")
            }
        )

}

function restarStoke(producto){
    
    let productoAModificar = productos.find((item) => (producto.id === item.id));

        productoAModificar["stoke"] -= 1;
     
    return productoAModificar;
}
module.exports.productosGet = productosget;
module.exports.productosGetId = productosgetid;
module.exports.productosSet = productosset;
