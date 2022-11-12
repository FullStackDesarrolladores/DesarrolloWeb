const mongoose  = require("mongoose");

const MONGO_URL = "mongodb://127.0.0.1/shoppingCartYT";

const db = async () => {
    await mongoose
      .connect(MONGO_URL)
      .then(() => console.log("Base funcionando"))
      .catch((error) => console.error(error));
};

module.exports = db

