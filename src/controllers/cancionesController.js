import { v4 as uuidv4 } from "uuid";
import fs from "fs";


/* import { fileURLToPath } from "url";
import { dirname } from "path";
 */

/* const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* const getPahtHtml = (req, res) => {
  try {
    res.sendFile(__dirname + "/index.html");
  } catch (error) {
    res.status(500).json({ error: "Error solicitud no procesada " });
    console.error("Error del servidor  al procesar la solicitud", error);
  }
}; 

Dudas
Este metodo no funciono.


*/ 

const getAllCanciones = (req, res) => {
  try {
    const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf-8"));
    res.status(200).json(canciones);
  } catch (error) {
    res.status(500).json({ error: "Error al procesar la solicitud" });
    console.error("El cliente ingreso una ruta no valida", error);
  }
};

const createSong = (req, res) => {
  try {
    const cancion = req.body;
    console.log(cancion);

    if (!cancion.titulo || !cancion.artista || !cancion.tono) {
      res.status(400).json({ mensaje: "Tiene que ingresar todo los campos" });
      return;
    }
    const id = uuidv4();
    const idBody = {
      id,
      ...cancion,
    };

    const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));

    canciones.push(idBody);
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
    res.status(201).send("Cancion agregada exitosamente");
  } catch (error) {
    res.status(500).json({ message: "El recurso no esta disponible" });
  }
};

const editSong = (req, res) => {
  try {
    const { id } = req.params;
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
    const index = canciones.findIndex((c) => c.id === id);
    canciones[index] = cancion;

    fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
    res.status(201).send("Cancion Editada");
    if (!cancion.titulo || !cancion.artista || !cancion.tono) {
      res.status(400).json({ mensaje: "Tiene que ingresar al menos un campo" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "La cancion no fue agregada" });
  }
};

const removeSong = (req, res) => {
  try {
    const { id } = req.params;
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
    const index = canciones.findIndex((c) => c.id == id);
    canciones.splice(index, 1);
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
    res.send("Cancion Eliminado con exito");
  } catch (error) {
    res.status(500).json({ message: "No se pudo eliminar" });
  }
};

export {getAllCanciones, createSong, editSong, removeSong };
// intentamos exportar getPahtHtml  pero este metodo no funciono 