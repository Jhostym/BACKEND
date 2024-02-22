import Boleta from "../models/boletas.model.js";

import { uploadImage, deleteImage } from '../utils/cloudinary.js'
import fs from 'fs-extra'

export const getBoletas = async (req, res) => {
  try {
    const boletas = await Boleta.find();
    return res.json(boletas);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createBoletas = async (req, res) => {
  const { dni, mes, año } = req.body;

  if (!dni) return res.status(404).json({ message: 'dni is required' })

  try {
    const newBoleta = new Boleta({
      dni,
      mes,
      año,
    });

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath)
      newBoleta.image = {
        public_id: result.public_id,
        secure_url: result.secure_url
      }
      await fs.unlink(req.files.image.tempFilePath)
    }

    const savedBoleta = await newBoleta.save();
    return res.json(savedBoleta);
  } catch (error) {
    if (req.files?.image) {
      await fs.unlink(req.files.image.tempFilePath)
    }
    return res.status(500).json({ message: error.message });
  }
};




export const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedProduct)
      return res.status(404).json({ message: "Product Not Found" });
    return res.json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) return res.status(404).json({ message: 'Product does not exists' })

    await deleteImage(deletedProduct.image.public_id)

    return res.json(deletedProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const productFound = await Product.findById(id);
    if (!productFound)
      return res.status(404).json({ message: "Product not found" });
    return res.json(productFound);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

