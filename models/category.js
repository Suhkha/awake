const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
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
});

module.exports = model("Category", CategorySchema);
