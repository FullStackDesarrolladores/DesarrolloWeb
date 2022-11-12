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

const productogetmarca = async (marca) => {

    let productoEncontrado = null

    const { collection, client } = await getConnection();

    await collection.findOne({ "marca": marca })

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


const productocomprado = async (productoEnviado) => {

    let productoAModificar = await restarStoke(productoEnviado._id);

    const prod = request.patch(
        "http:/localhost:8082/productos-admin", productoAModificar
    )
    await request.all([prod])
        .then(
            (res) => {
                return res;
            }
        )
        .catch(
            () => {
                console.log("fallo la peticion post en producto cliente")
            }
        )
             
}

const productosset = async (producto) => {

    const { collection, client } = await getConnection();

    await collection.insertMany([producto])

    await getMongo.closeclient(client);

    return producto;
}

const productospatch = async (productoEnviado) => {

    let id = productoEnviado._id;
    let tagsModificados = null;

    await modificarProducto(productoEnviado)
        .then((res) => {
            tagsModificados = res;
        });

    const { collection, client } = await getConnection();

    await collection.updateOne({ "_id": ObjectId(id) }, { $set: tagsModificados });

    await getMongo.closeclient(client);

    return await productosgetid(id);
}

const productosdelete = async (productoEliminar) => {

    let producto = await productogetmarca(productoEliminar.marca);
  
    const { collection, client } = await getConnection();

    await collection.deleteOne({ "_id":producto._id });

    await getMongo.closeclient(client);

    return "Borrado exitoso en microservicio cliente";
}

async function restarStoke(producto) {

    const { collection, client } = await getConnection();

    await collection.updateOne({ "_id": new ObjectId(producto) }, {$inc:{"stoke":-1}});

    await getMongo.closeclient(client);

    return await productogetid(producto);
}


async function getConnection() {

    const client = await getMongo.Client(nameDb);

    const collection = await getMongo.Collection(client, nameDb);

    return { collection, client };
}

async function modificarProducto(productoEnviado) {

    let producto = productoEnviado;

    delete producto._id;

    return producto;
}

module.exports.productosGet = productosget;
module.exports.productosSet = productosset;
module.exports.productoGetId = productogetid;
module.exports.productosComprado = productocomprado;
module.exports.productosPatch = productospatch;
module.exports.productosDelete = productosdelete;
