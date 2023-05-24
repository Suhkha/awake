const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  name: {
    type: String,
    unique: true,
    require: [true, "name is require"],
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  description: {
    type: String,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
  },
});

ProductSchema.methods.toJSON = function () {
  const { __v, status, ...product } = this.toObject();
  return product;
};

module.exports = model("Product", ProductSchema);

// COMENZAR SECCION DE PRODUCTOS
