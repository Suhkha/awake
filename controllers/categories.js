const { response } = require("express");
const { Category } = require("../models");

const categoriesGet = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const args = { status: true };

  const [total, categories] = await Promise.all([
    Category.countDocuments(args),
    Category.find(args).skip(from).limit(limit),
  ]);

  res.status(201).json({
    total,
    categories,
  });
};

const categoryByIdGet = async (req, res = response) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  res.status(201).json(category);
};

const categoryPost = async (req, res = response) => {
  const name = req.body.name;

  const categoryDB = await Category.findOne({ name });

  if (categoryDB) {
    return res.status(400).json({
      message: `Category: ${categoryDB.name} already exists`,
    });
  }

  const data = {
    name,
    user: req.user._id,
  };

  const category = new Category(data);
  await category.save();

  res.status(201).json(category);
};

const categoryPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, ...categoryData } = req.body;

  const category = await Category.findByIdAndUpdate(id, categoryData);
  res.status(201).json(category);
};

const categoryDelete = async (req, res = response) => {
  const { id } = req.params;

  const category = await Category.findByIdAndUpdate(id, { status: false });
  res.status(201).json(category);
};

module.exports = {
  categoriesGet,
  categoryByIdGet,
  categoryPost,
  categoryPut,
  categoryDelete,
};
