const getMongo = require("./mongodb.js")
let request = require("axios")
const nameDb = "Tienda-certificacion";
const  ObjectId =require("mongodb").ObjectId

const productosget = async () => {
    const { collection, client } = await getConnection();
    const productosBd = await collection.find({}).toArray();
    await getMongo.closeclient(client);
    return productosBd;


}

const productogetid = async (id) => {
    let productoEncontrado = null
    const { collection, client } = await getConnection();
    await collection.findOne({ "_id": new ObjectId(id) })
        .then((res) => {
            productoEncontrado = res;
        }
        ).catch(
            () => {
                console.log("no se encontró elemento")
            }
        )

    await getMongo.closeclient(client);
    
    return productoEncontrado
}

const productosset = async (producto) => {

    const prod = request.patch(
        "http:/localhost:8082/productos-admin", restarStoke(producto)
    )
    /* const carrito = request.post(
         "http://localhost:####/carrito",producto
     )*/

    await request.all([prod])
        .then(
            (res) => {

                return res[0].data;
            }
        )
        .catch(
            () => {
                console.log("fallo la peticion")
            }
        )

}

function restarStoke(producto) {

    let productoAModificar = productos.find((item) => (producto.id === item.id));

    productoAModificar["stoke"] -= 1;

    return productoAModificar;
}

async function getConnection() {
    const client = await getMongo.Client(nameDb);
    const collection = await getMongo.Collection(client, nameDb);
    return { collection, client };
}
module.exports.productosGet = productosget;
module.exports.productoGetId = productogetid;
module.exports.productosSet = productosset;
