import express  from "express";
import { getAllCanciones,createSong, editSong, removeSong } from "../src/controllers/cancionesController.js";
const router = express.Router();


/* router.get('/', getPahtHtml ); 
Este metodo no funciono 
*/

router.get('/canciones', getAllCanciones );

router.post('/canciones', createSong);

router.put('/canciones/:id', editSong);

router.delete('/canciones/:id', removeSong);


export default router;
