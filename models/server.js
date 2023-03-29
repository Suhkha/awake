const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //middleware
    this.middlewares();

    //routes
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.get("/api", (req, res) => {
      res.json({
        message: "/GET api",
      });
    });

    this.app.put("/api", (req, res) => {
      res.json({
        message: "/PUT api",
      });
    });

    this.app.post("/api", (req, res) => {
      res.json({
        message: "/POST api",
      });
    });

    this.app.delete("/api", (req, res) => {
      res.json({
        message: "/DELETE api",
      });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
