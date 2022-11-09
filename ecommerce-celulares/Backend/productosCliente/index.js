const express = require("express");
const cors = require("cors");
const body_parser = require("body-parser");
const path = require("path");
const productosService = require("./productosService.js")

const app = express()
const port = 8081;//puerto unico de api
const pathname ="/productos"


app.use(cors(), body_parser.json())

app.listen(port,
	() => {
		console.log("Se levanta app productos en el puerto " + port)
	})


app.get(pathname,
	(req, res) => {
		console.log("Recibimos peticion ");
		res.send(vueloService.vuelosGet())
	}
)

app.get(pathname+"/id",
	(req, res) => {
		console.log("Recibimos peticion ");
		res.send(vueloService.vuelosGetId(req.query.id))
	}
)

app.post(pathname,
	(req, res) => {
		console.log("Recibimos peticion ");
		vueloService.vuelosSet(req.body);
		res.send({"mensaje":"Guardado Exitoso"})
	}
	)

	app.delete(pathname,
	(req, res) => {
		console.log("Recibimos peticion ");
		console.log(req.body.id)
		vueloService.vuelosDelete(req.body.id);
		res.send({"mensaje":"Borrado Exitoso"})
	}
	)

