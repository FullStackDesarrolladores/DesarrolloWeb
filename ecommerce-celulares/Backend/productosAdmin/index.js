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
	(req, res) => {
		res.send(productosService.productosGet())
	}
)

app.get(pathname + "/id",
	(req, res) => {
		res.send(productosService.productosGetId(req.query.id))
	}
)

app.post(pathname,
	(req, res) => {
		productosService.productosSet(req.body);
		res.send({ "mensaje": "Guardado Exitoso" })
	}
)

app.patch(pathname,
	(req, res) => {
		productosService.productosPatch(req.body);
		res.send({ "mensaje": "Editado Exitoso" })
	}
)
app.delete(pathname,
	(req, res) => {
		console.log(req.body.id)
		productosService.productosDelete(req.body.id);
		res.send({ "mensaje": "Borrado Exitoso" })
	}
)



