const Cart = require("../models/Cart");
const Product = require("../models/Products");

const deleteProduct = async ( req, res ) => {
    const { productId } = req.params;

    const productInCart = await Cart.findById(productId);

    const { img, marca, modelo, caracteristicas, precio, _id}= await Product.findOne({
        name: productInCart.name,
    });

    await Cart.findByIdAndDelete(productId);

    await Product.findByIdAndUpdate(
        _id,
        { inCart: false, img, marca, modelo, caracteristicas, precio },
        { new: true}
    )
        .then((Product) => {
            res.json({
                mensaje: 'El producto ${product.name} feu eliminado del carrito',
            });
        })
        .catch((error) => res.json({ mensaje: "Hubo un error" }));
};


module.exports = deleteProduct;