const { model, Schema } = require("mongoose");

const ProductSchema = new Schema({
    img : { type: String, required: true, unique: true},
    marca : { type: String, required: true},
    modelo : { type: String, required: true},
    caracteristicas : { type: String, required: true},
    inCart : { type: Boolean, default: false },
    precio : { type: Number, required: true},
});

module.exports = model("Product", ProductSchema);