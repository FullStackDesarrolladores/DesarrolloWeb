const Cart = require("../models/Cart");
const putProduct = async (req, res) => {
    const { productId } = req.params;
    const { query } = req.query;
    const { body } = req.body;

    const productBuscado = await Cart.findByid(productId);

    if (!query) {
        res.status(404).json({ mensaje: "Se debe enviar una consulta "});
    }else if (productBuscado && query === "add") {
        body.amount = body.amount + 1;

        await Cart.finByidAndUpdate(productId, body, {
            new: true,
        }) .then((product) => {
            res.json({
                mensaje: 'El producto: ${product.name} fue actualizado',
                product,
            });
        });
    }else if (productBuscado && query === "del") {
        body.amount = body.amount - 1;

    await Cart.finByidAndUpdate(productId, body, {
        new: true,
    }).then((product) =>
      res.json({
        mensaje: 'El producto: ${product.name} fue actualizado',
        roduct,
      })
    );
    }else {
        res.status(400).json({ mensaje: "Ocurrio un error"});
    }
};

module.exports = putProduct