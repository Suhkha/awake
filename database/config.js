const mongoose = require("mongoose");

const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION);

    console.log("Database running...");
  } catch (error) {
    console.log(error);
    throw new Error("Error in database connection");
  }
};

module.exports = {
  databaseConnection,
};
