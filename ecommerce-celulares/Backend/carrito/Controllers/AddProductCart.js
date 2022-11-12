const Cart = require("../models/Cart");
const Product = require("../models/Products");


const addProductCart = async (req, res) => {
    const { img, marca, modelo, precio, caracteristicas } = req.body;

    const estaEnProducts = await Product.findOne({ name });

    const noEstaVacio = img !== "" && marca  !== "" && modelo !== "" && precio!== "" && caracteristicas!== "";

    const estaEnElCarrito = await Cart.findOne({ name });

    if (!estaEnProducts){
      res.status(400).json({
       mensaje: "Este producto no se encuentra en nuestra base de datos",
      });

    } else if (noEstaVacio && !estaEnElCarrito) {
        const newProductInCart = new Cart({ img, marca, modelo, precio, caracteristicas, stoke: 1 });

        await Product.findByIdAndUpdate(
          estaEnProducts?._id,
          { inCart: true, img, marca, modelo, precio, caracteristicas },
          { new: true }
        )
          .then(( product ) => {
            newProductInCart.save();
            res.json({
              mensaje: 'El producto fue agregado al carrito',
              product,
            });
          })
        .catch((error) => console.error(error));
    } else if (estaEnElCarrito) {
        res.status(400).json({
            mensaje: "El producto ya esta en el carrito", 
        });
    }
};

module.exports = addProductCart;