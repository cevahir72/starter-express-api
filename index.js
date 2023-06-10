const express = require("express");
const app = express();
const dotenv = require("dotenv");
var morgan = require('morgan');
const cors = require("cors");
const mongoose = require('mongoose');

//* Routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const productRoute = require("./routes/products");
const answerRoute = require("./routes/answer");
const analysisRoute = require("./routes/analysis");
const adminRoute = require("./routes/admin");

dotenv.config();

app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  )
);
app.use(express.json());

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"],
    exposedHeaders: ["x-total-count"],
    domain: [
      "http://localhost:3000",
    ],
  })
);

mongoose.connect(process.env.MONGO_URL).then(console.log("Connected to MONGO_DB"));


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/products", productRoute);
app.use("/api/answers", answerRoute);
app.use("/api/analysis", analysisRoute);
app.use("/api/admin", adminRoute);

app.listen("5000", () => {
  console.log("Backend is running.");
});