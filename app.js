const express = require("express");
const path = require("node:path");
let ejs = require("ejs");
const app = express();
process.loadEnvFile();
const PORT = process.env.PORT;

// Para indicarle que vamos a trabajar con una plantilla (en este caso ejs):
app.set("view engine", "ejs");
// Indicar la carpeta de los recursos estáticos como css, javascript, imagenes, videos...
app.use(express.static(path.join(__dirname, "public")));
// Indicar la carpeta donde estarán las vistas o plantilas ejs
app.set("views", path.join(__dirname, "views"));

// Usar los datos del json
const jsonDatos = require("./data/datos.json");
// Mostrar los datos por el navegador:
jsonDatos.forEach((item) => {
  app.get(`/${item.ruta}`, (req, res) => { 
    res.render(`${item.ruta}`, 
    { title: `${item.title}`,
      h1: `${item.h1}`,
      descripcion: `${item.descripcion}`,
      img: `${item.img}`,
      datos: jsonDatos });
  });
});

app.get("/", (req, res) => {
  // res.send('<h1>Estás en la ruta raiz</h1>')
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/nada", (req, res) => {
  res
    .status(404)
    .render("404", { title: "Ves? No hay nada", h1: "No hay nada :(", datos: jsonDatos});
});

app.use((req, res) => {
  res
    .status(404)
    .render("404", { title: "404", h1: "404 página no encontrada", datos: jsonDatos});
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
