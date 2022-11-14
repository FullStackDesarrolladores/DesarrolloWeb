const getMongo = require("./mongodb.js")
let request = require("axios")
const nameDb = "Tienda-certificacion";
const ObjectId = require("mongodb").ObjectId

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

    const { collection, client } = await getConnection();

    await collection.insertMany([producto])

    await getMongo.closeclient(client);

    return producto;
}

const productospatch = async (productoEnviado) => {

    console.log(productoEnviado)

    let producto = await productogetid(productoEnviado.id);

    const { collection, client } = await getConnection();

    await collection.updateOne({ "_id": ObjectId(producto._id) }, { $set: productoEnviado.tags });

    await getMongo.closeclient(client);

    return await productogetid(producto._id);
}

const productosdelete = async (productoEliminar) => {

    const { collection, client } = await getConnection();

    await collection.deleteOne({ "_id":  ObjectId(productoEliminar.ref) });

    await getMongo.closeclient(client);

    return "Borrado exitoso en microservicio cliente";
}
async function addToCar(producto){
    
    console.log(producto)
    
    const prod = request.post(
        "http:/localhost:3000/carrito", producto
    )
    await request.all([prod])
        .then(
            () => {
                return "se añadió al carrito exitosamente";
            }
        )
        .catch(
            () => {
                console.log("No se pudo agregar a carrito")
            }
        )
}
async function getConnection() {

    const client = await getMongo.Client(nameDb);

    const collection = await getMongo.Collection(client, nameDb);

    return { collection, client };
}



module.exports.productosGet = productosget;
module.exports.productosSet = productosset;
module.exports.productoGetId = productogetid;
module.exports.productosPatch = productospatch;
module.exports.productosDelete = productosdelete;
module.exports.addCar = addToCar;