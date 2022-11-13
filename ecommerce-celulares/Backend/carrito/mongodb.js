const { MongoClient } = require("mongodb");

const getClient = async (nombreBd) => {

  const user = "edisschc";
  const password = "1214735796Da$";
  const url = "mongodb+srv://" + user + ":" + password + "@cluster0.ugz3i2n.mongodb.net/" + nombreBd;
  const client = new MongoClient(url);

  await client.connect().then(
    (db) => {
      console.log(" ")

    }
  ).catch(
    (err) => {
      console.log("error con cliente conectando a mongo db")
      console.log(err)
    }
  );

  return client;
}

const getCollection = async (client, nombreBd) => {

  const db = await client.db(nombreBd);

  const collection = await db.collection("carrito");

  return collection
}

const closeClient = async (client) => {

  await client.close();

}

module.exports.Collection = getCollection;
module.exports.Client = getClient;
module.exports.closeclient = closeClient;
