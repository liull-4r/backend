const express = require("express");
require("dotenv").config();
const http = require("http");
const cors = require("cors");
const Routes = require("./routes/index.js");
const corsOptions = require("./config/cors.config.js");

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/v1", Routes);
const server = http.createServer(app);
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});
server.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log("Server started on port http://localhost:3000");
});
