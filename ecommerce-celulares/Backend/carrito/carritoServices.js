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

const carritogetref = async (ref) => {

    let productoEncontrado = null;

    const { collection, client } = await getConnection();

    await collection.findOne({ "ref": ref })

        .then((res) => {

            productoEncontrado = res;

        }
        ).catch(
            () => {
                console.log("no se encontró elemento en carrito")
            }
        )

    await getMongo.closeclient(client);


    return productoEncontrado
}

const carritoset = async (producto) => {
    console.log(producto)
    console.log(await carritogetref(producto._id))
    if(await carritogetref(producto._id)!= null){
        await carritopatch(producto._id)
    }else{

        let prodInCar = producto;

        prodInCar.cantidad=1;

        prodInCar.ref=producto._id;

        delete prodInCar._id;

        console.log(prodInCar)

        const { collection, client } = await getConnection();

        await collection.insertMany([prodInCar])
    
        await getMongo.closeclient(client);
    }

    return await carritoget();
}

const carritopatch = async (referencia) => {

    const { collection, client } = await getConnection();

    await collection.updateOne({ "ref": referencia }, { $inc: { "cantidad": 1 } });

    await getMongo.closeclient(client);

    return await carritoget();
}

const carritodelete = async (productoEliminar) => {

    const { collection, client } = await getConnection();

    await collection.deleteOne({ "ref":  ObjectId(productoEliminar.ref) });

    await getMongo.closeclient(client);

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
module.exports.carritoSet = carritoset;
module.exports.carritoDelete = carritodelete;
module.exports.carritoPatch = carritopatch;

