import mongoose from "mongoose";

const boletasSchema = new mongoose.Schema(
  {
    dni: {
      type: String,
      required: true,
    },
    mes: {
      type: String,
    },
    año: {
      type: String,
    },
    image: {
      secure_url: String,
      public_id: String
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Boleta", boletasSchema);
