import { Router } from "express";
import { getBoletas, createBoletas } from "../controllers/boletas.controller.js";



//import {
  //getProducts,
  //createProduct,
  //updateProduct,
  //getProduct,
  //deleteProduct,
//} from "../controllers/product.controller.js";


import fileUpload from "express-fileupload";

const router = Router();

router.get("/boletas", getBoletas);
router.post("/boletas",fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
}), createBoletas);



//router.put("/:id", updateProduct);
//router.get("/:id", getProduct);
//router.delete("/:id", deleteProduct);

export default router;
