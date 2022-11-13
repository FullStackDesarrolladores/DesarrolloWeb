const getMongo = require("./mongodb.js")
const ObjectId = require("mongodb").ObjectId
const nameDb = "Tienda-certificacion";
let request = require("axios")

const carritoget = async () => {

    const { collection, client } = await getConnection();

    const carritoBd = await collection.find({}).toArray();

    await getMongo.closeclient(client);

    return carritoBd;
}

const carritogetid = async (id) => {

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

const carritoset = async (producto) => {

    const cliente = request.post(
        "http:/localhost:8081/carrito", producto
    )
    await request.all([cliente])
        .then(
            async (res) => {

                let prod = res[0].data;

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

const carritopatch = async (productoEnviado) => {

    let id = productoEnviado._id;

    let marca = await carritogetid(id)

    let tagsModificados = null;

    await modificarProducto(productoEnviado)
        .then((res) => {
            tagsModificados = res;
        });
    
    const cliente = request.patch(
        "http:/localhost:8081/carrito", {nuevo:tagsModificados,viejo:marca}
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


    return await carritogetid(id);
}

const carritodelete = async (productoEliminar) => {

    var prodDel = await carritogetid(productoEliminar._id);

    const cliente = request.delete(
        "http:/localhost:8081/carrito", { data: prodDel }
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

    return await carritoget();
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

module.exports.carritoGet = carritoget;
module.exports.carritoGetId = carritogetid;
module.exports.carritoSet = carritoset;
module.exports.carritoDelete = carritodelete;
module.exports.carritoPatch = carritopatch;

