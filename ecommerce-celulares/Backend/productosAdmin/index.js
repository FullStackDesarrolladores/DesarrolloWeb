const express = require("express");
const cors = require("cors");
const body_parser = require("body-parser");
const path = require("path");
const productosService = require("./productosService.js")

const app = express()
const port = 8082;//puerto unico de api
const pathname = "/productos-admin"

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
		res.send(await productosService.productosGetId(req.query.id))
	}
)

app.post(pathname,
	async (req, res) => {
		res.send(await productosService.productosSet(req.body))
	}
)

app.patch(pathname,
	async (req, res) => {
		res.send(await productosService.productosPatch(req.body))
	}
)
app.delete(pathname+"/id",
	async (req, res) => {
		res.send(await productosService.productosDelete(req.query.id))
	}
)



