import mongoose from "mongoose";
import { object } from "zod";

const boletasSchema = new mongoose.Schema(
  {
    dni: {
      type: String,
      required: true,
    },
    mes: {
      type: String,
    },
    year: {
      type: String,
    },
    image: {
      secure_url: String,
      public_id: String
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Boleta", boletasSchema);
