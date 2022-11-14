const getMongo = require("./mongodb.js")
const ObjectId = require("mongodb").ObjectId
const nameDb = "Tienda-certificacion";
let request = require("axios")

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

const productosgetref = async (ref) => {

    let productoEncontrado = null

    const { collection, client } = await getConnection();

    await collection.findOne({ "ref": ref })

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

    const cliente = request.post(
        "http:/localhost:8081/productos", producto
    )
    await request.all([cliente])
        .then(
            async (res) => {

                let prod = res[0].data;

                prod.ref = res[0].data._id;

                delete prod._id;

                const { collection, client } = await getConnection();

                await collection.insertMany([prod])

                await getMongo.closeclient(client);

            }
        )
        .catch(
            () => {
                console.log("fallo la peticion post en microservicio admin")
            }
        )


    return "Guardado: Exitoso";
}

const productospatch = async (productoEnviado) => {

    let id = productoEnviado._id;

    let productoAModificar = await productosgetid(id)

    let tagsModificados = null;

    await modificarProducto(productoEnviado)
        .then((res) => {
            tagsModificados = res;
            delete tagsModificados.ref
        });
  
    const cliente = request.patch(
        "http:/localhost:8081/productos", { tags: tagsModificados, id: productoAModificar.ref }
    )
    await request.all([cliente])
        .then(
            async () => {

                const { collection, client } = await getConnection();

                await collection.updateOne({ "_id": ObjectId(id) }, { $set: tagsModificados });

                await getMongo.closeclient(client);

            }
        )
        .catch(
            () => {
                console.log("fallo la peticion post en producto cliente")
            }
        )


    return await productosgetid(id);
}

const productosdelete = async (productoEliminar) => {

    var prodDel = await productosgetid(productoEliminar._id);

    const cliente = request.delete(
        "http:/localhost:8081/productos", { data: prodDel }
    )
    await request.all([cliente])
        .then(
            async () => {

                const { collection, client } = await getConnection();

                await collection.deleteOne({ "_id": ObjectId(productoEliminar._id) });

                await getMongo.closeclient(client);

            }
        )
        .catch(
            () => {
                console.log("fallo la peticion post en producto cliente")
            }
        )

    return await productosget();
}


async function modificarProducto(productoEnviado) {

    let producto = productoEnviado;

    delete producto._id;

    return producto;
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
module.exports.productosGetId = productosgetid;
module.exports.productosSet = productosset;
module.exports.productosDelete = productosdelete;
module.exports.productosPatch = productospatch;

