import fs  from "fs";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import {fileURLToPath} from "url";
import {dirname} from "path"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

/* const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
 */
/* import express from "express";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
 */

const app = express();
const PORT = 3000;
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.sendFile(__dirname + "/index.html");
  } catch (error) {
    res.status(400).json({ error: "Error solicitud no procesada " });
    console.error("Error al procesar la solicitud", error);
  }
});

app.get("/canciones", (req, res) => {
  try {
    const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf-8"));
    res.status(200).json(canciones);
  } catch (error) {
    res.status(400).json({ error: "Error al procesar la solicitud" });
    console.error("Error al procesar la solicitud", error);
  }
});

app.post("/canciones", (req, res) => {
  try {
    const cancion = req.body;
    console.log(cancion);
    if (Object.values(cancion).some((value) => value === "")) {
      return res.status(400).json({ message: "Falta datos por completar" });
    }
    const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));
    canciones.push(cancion);
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
    res.send("Cancion agregada exitosamente");
  } catch (error) {
    res.json({ message: "El recurso no esta disponible" });
  }
});

app.put("/canciones/:id", (req, res) => {
  try {
    const { id } = req.params;
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
    const index = canciones.findIndex((c) => c.id === id);
    canciones[index] = cancion;
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
    res.send("Cancion Agregada");
  } catch (error) {
    res.json({ message: "La cancion no fue agregada" });
  }
});

app.delete("/canciones/:id", (req, res) => {
  try {
    const { id } = req.params;
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
    const index = canciones.findIndex((c) => c.id == id);
    canciones.splice(index, 1);
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
    res.send("Cancion Eliminado con exito");
  } catch (error) {
    res.json({ message: "No se pudo eliminar" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
