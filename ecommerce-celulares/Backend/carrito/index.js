const express = require("express");
const cors = require("cors");
const body_parser = require("body-parser");
const path = require("path");
const carritoService = require("./carritoServices.js")


const app = express();
const port = 3000;//puerto unico de api
const pathname = "/carrito"

app.use(cors(), body_parser.json())

app.listen(port, () => {
    console.log("Servidor corriendo en el puerto "+port);
});

app.get(pathname,
	async (req, res) => {
		res.send(await carritoService.carritoGet())
	}
)

app.post(pathname,
	async (req, res) => {
		res.send(await carritoService.carritoSet(req.body))
	}
)

app.delete(pathname,
	async (req, res) => {
		res.send(await carritoService.carritoDelete(req.body))
	}
)


