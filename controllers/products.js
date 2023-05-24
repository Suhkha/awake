const { response } = require("express");
const { Product } = require("../models");

const productsGet = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const args = { status: true };

  const [total, products] = await Promise.all([
    Product.countDocuments(args),
    Product.find(args)
      .populate("user", "name")
      .populate("category", "name")
      .skip(from)
      .limit(limit),
  ]);

  res.status(201).json({
    total,
    products,
  });
};

const productByIdGet = async (req, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate("user", "name")
    .populate("category", "name");

  res.status(201).json(product);
};

const productPost = async (req, res = response) => {
  const name = req.body.name.toUpperCase();
  const category = req.body.category;

  const productDB = await Product.findOne({ name });

  if (productDB) {
    return res.status(400).json({
      message: `Product: ${productDB.name} already exists`,
    });
  }

  const data = {
    name,
    user: req.user._id,
    category,
  };

  const product = new Product(data);
  await product.save();

  res.status(201).json(product);
};

const productPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, status, user, ...productData } = req.body;

  productData.name = productData.name.toUpperCase();
  productData.user = req.user._id;

  const product = await Product.findByIdAndUpdate(id, productData, {
    new: true,
  })
    .populate("user", "name")
    .populate("category", "name");

  res.status(201).json(product);
};

const productDelete = async (req, res = response) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(
    id,
    {
      status: false,
    },
    { new: true }
  )
    .populate("user", "name")
    .populate("category", "name");

  res.status(201).json(product);
};

module.exports = {
  productsGet,
  productByIdGet,
  productPost,
  productPut,
  productDelete,
};
