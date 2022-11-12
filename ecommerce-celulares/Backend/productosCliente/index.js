const express = require("express");
const cors = require("cors");
const body_parser = require("body-parser");
const path = require("path");
const productosService = require("./productosService.js")

const app = express()
const port = 8081;//puerto unico de api
const pathname = "/productos"

app.use(cors(), body_parser.json())

app.listen(port,
	() => {
		console.log("Se levanta app productos en el puerto " + port)
	})


app.get(pathname,
	async (req, res) => {
		res.send(await productosService.productosGet())
	}
)

app.get(pathname + "/id",
	async (req, res) => {
		res.send(await productosService.productoGetId(req.query.id))
	}
)

app.post( pathname,
	async (req, res) => {
		productosService.productosSet(req.body);
		res.send("Se agregó al carrito")

	}
)





