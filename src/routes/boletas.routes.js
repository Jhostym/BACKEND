import { Router } from "express";
import { getBoletas, createBoletas, getBoletasPorDni } from "../controllers/boletas.controller.js";
import fileUpload from "express-fileupload";
import { validatedni } from "../middlewares/validateDni.js";

const router = Router();

router.get("/boletas", getBoletas);

router.post("/boletas",fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
}),createBoletas);

router.get("/boletasdni",validatedni ,getBoletasPorDni)

export default router;
