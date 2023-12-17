//Importaciones
import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRouter from './routes/cancionesRoutes.js';
import { fileURLToPath } from "url";
import { dirname } from "path";

//Creacion de instacia&puerto
const app = express();
const PORT = 3001;

//Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(userRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// FrontEnd
app.get("/", (req, res) =>{
  try {
    res.sendFile(__dirname + "/index.html");
  } catch (error) {
    res.status(500).json({ error: "Error solicitud no procesada " });
    console.error("Error del servidor  al procesar la solicitud", error);
  }

} );
  


//Levantando Servidor 
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
