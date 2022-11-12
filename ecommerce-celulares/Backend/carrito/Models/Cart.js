const { model, Schema } = require("mongoose");

const CartSchema =  new Schema({
    
    img : { type: String, required: true, unique: true},
    marca : { type: String, required: true},
    modelo : { type: String, required: true},
    caracteristicas : { type: String, required: true},
    stoke : { type: Number, required: true},
    precio : { type: Number, required: true},
});

module.exports = model("Cart", CartSchema);