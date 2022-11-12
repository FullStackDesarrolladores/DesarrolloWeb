const getMongo = require("./mongodb.js")
const ObjectId = require("mongodb").ObjectId
const nameDb = "Tienda-certificacion";

const productosget = async () => {

    const { collection, client } = await getConnection();

    const productosBd = await collection.find({}).toArray();

    await getMongo.closeclient(client);

    return productosBd;
}

const productosgetid = async (id) => {

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

    return await productosget();
}

const productospatch = async (productoEnviado) => {

    let productoAModificar = await productosgetid(productoEnviado._id)

    productoAModificar = await modificarProducto(productoEnviado, productoAModificar);

    const { collection, client } = await getConnection();

    await collection.replaceOne({ "_id": productoAModificar._id }, productoAModificar);

    await getMongo.closeclient(client);

    return await productosget();
}

const productosdelete = async (productoEliminar) => {

    const { collection, client } = await getConnection();

    await collection.remove({ "_id": ObjectId(productoEliminar._id) });

    await getMongo.closeclient(client);

    return await productosget();
}

async function getConnection() {

    const client = await getMongo.Client(nameDb);

    const collection = await getMongo.Collection(client, nameDb);

    return { collection, client };
}

async function modificarProducto(productoEnviado, productoAModificar) {

    Object.keys(productoEnviado).forEach(function (key) {

        if (key !== "_id") {

            productoAModificar[key] = productoEnviado[key]

        }

    })
    return await productoAModificar;
}

module.exports.productosGet = productosget;
module.exports.productosGetId = productosgetid;
module.exports.productosSet = productosset;
module.exports.productosDelete = productosdelete;
module.exports.productosPatch = productospatch;